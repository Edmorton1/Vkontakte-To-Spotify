import $api from "@/store/$api";
import ErrorStore from "@/store/ErrorStore";
import SocketStore from "@/store/SocketStore";
import { URL_SERVER_API } from "@/URLS";
import { SpotifyDataInterface } from "@s/router/types";
import { action, makeAutoObservable, runInAction, toJS } from "mobx";

type changeTypes = | `sim_event` | 'url' | 'delete'

class Store {
  constructor() {
    makeAutoObservable(this),
    SocketStore.connect()
  }
  
  data: SpotifyDataInterface[] = []
  isLoadCreate: number[] = []
  loadFiles: number = 0
  loadProgress: number = 0

  pushData = (data: SpotifyDataInterface) => {
    runInAction(() => this.data.push(data))
  }

  async checkRefreshToken() {
    try {
      const request = await $api.get(`${URL_SERVER_API}checkRefreshToken`)
      console.log(request)
      if (request.data == false) throw new Error('Не удалось пройти аутентификацию, вероятно проблема в том, что Spotify не работает в России')
      return runInAction(() => request.data)
    } catch(err) {
      ErrorStore.setError(new Error('Ошибка сети'))
    }
  }

  loadPlaylists = action(async (formData: FormData, setShowBlock?: Function) => {
    try {
      setTimeout(() => runInAction(() => this.loadFiles++), 100);
      await $api.post(`${URL_SERVER_API}take`, formData)
    } catch(err) {
      console.log(err)
      ErrorStore.setError(new Error('Не удалось выполнить операцию. Плейлсит должен быть обязательно в формате HTML или TXT'))
    } finally {
      setShowBlock ? setShowBlock(false) : null
    }
  })

  updateTracks = async(playlist: number, track: number, changeType: changeTypes, changeValue: string = '') => {
      try {
        const body = {[changeType]: changeValue}
        const request = await $api.put(`${URL_SERVER_API}updateTrack/${playlist}/${track}`, body)
        if (changeType == 'url') {
          runInAction(() => this.data[playlist].tracks[track] = request.data)
        }
        if (changeType == 'sim_event') {
          runInAction(() => this.data[playlist].tracks[track].sim_event = false)
        }
        if (changeType == 'delete') {
          runInAction(() => this.data[playlist].tracks.splice(0, 1))
          console.log(toJS(this.data[playlist].tracks))
        }
      } catch(err) {
        console.log(err)
        ErrorStore.setError(new Error('Не удалось выполнить операцию, попробуйте ещё раз'))
      }
  }
  createPlaylist = action(
    async (playlist_arr: number[], clean?: boolean) => {
      try {
        // const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
        // this.isLoadCreate.push(...playlist_arr)
        console.log(this.isLoadCreate)
        // await delay(3000)
        for (let i of playlist_arr) {
          if (this.data[i].tracks.length !== 0) this.isLoadCreate.push(i)
          await $api.post(`${URL_SERVER_API}createAllPlaylists`, {
            playlist: i,
            clean: clean
          })
          if (this.data[i].tracks.length !== 0) this.data[i].is_published = true
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
        await $api.delete(`${URL_SERVER_API}removePlaylist/${playlist_id}`)
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