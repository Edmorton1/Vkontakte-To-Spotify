import $api from "@/store/$api";
import ErrorStore from "@/store/ErrorStore";
import SocketStore from "@/store/SocketStore";
import { delay } from "@s/router/functions";
import { SpotifyDataInterface } from "@s/router/types";
import { action, makeAutoObservable, observable, runInAction, toJS } from "mobx";

type changeTypes = | `sim_event` | 'url' | 'delete'

class Store {
  constructor() {
    makeAutoObservable(this),
    SocketStore.connect()
  }
  // data: SpotifyDataInterface[] = []
  data: SpotifyDataInterface[] = []
  isLoadCreate: number[] = []
  loadFiles: number = 0
  loadProgress: number = 0
  // socket: WebSocket | null = null

  pushData = (data: SpotifyDataInterface) => {
    runInAction(() => this.data.push(data))
  }

  async checkRefreshToken() {
    const request = await $api.get('http://localhost:3000/api/checkRefreshToken')
    return runInAction(() => request.data)
  }

  loadPlaylists = action(async (formData: FormData, setShowBlock: Function) => {
    try {
      // console.log(formData)
      // this.loadFiles = true
      await $api.post(`http://localhost:3000/api/take`, formData)
    } catch(err) {
      console.log(err)
      ErrorStore.setError(new Error('Не удалось выполнить операцию. Плейлсит должен быть обязательно в формате HTML или TXT'))
    } finally {
      // this.loadFiles = 0
      setShowBlock(false)
    }
  })

  setPlaylist = (index: number) => {
    return this.data[index]
  }

  updateTracks = action(
    async(playlist: number, track: number, changeType: changeTypes, changeValue: string = '') => {
      try {
        const body = {[changeType]: changeValue}
        const request = await $api.put(`http://localhost:3000/api/updateTrack/${playlist}/${track}`, body)
        if (changeType == 'url') {
          // console.log(request.data)
          this.data[playlist].tracks[track] = request.data
        }
        if (changeType == 'sim_event') {
          this.data[playlist].tracks[track].sim_event = false
        }
        if (changeType == 'delete') {
          this.data[playlist].tracks.splice(0, 1)
          console.log(toJS(this.data[playlist].tracks))
        }
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось выполнить операцию, попробуйте ещё раз'))
      }
  })
  createPlaylist = action(
    async (playlist_arr: number[], clean?: boolean) => {
      try {
        // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        this.isLoadCreate.push(...playlist_arr)
        console.log(this.isLoadCreate)
        // await delay(3000)
        for (let i of playlist_arr) {
          await $api.post('http://localhost:3000/api/createAllPlaylists', {
            playlist: i,
            clean: clean
          })
          this.data[i].is_published = true
        }
        // this.data.forEach((e, i) => {playlist_arr.includes(i) ? e.is_published = true : null})
        this.isLoadCreate = this.isLoadCreate.filter(e => !this.isLoadCreate.includes(e))
        console.log(this.data)
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось создать плейлист, попробуйте ещё раз'))
      }
    }
  )
  removePlaylist = action(
    async (playlist_id: number) => {
      try {
        this.isLoadCreate.push(playlist_id)
        await $api.delete(`http://localhost:3000/api/removePlaylist/${playlist_id}`)
        this.data[playlist_id].is_published = false
        this.isLoadCreate = this.isLoadCreate.filter(e => e != playlist_id)
        console.log(this.data)
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось вернуть плейлист, попробуйте ещё раз'))
      }
    }
  )
}

export default new Store()