import $api from "@/store/$api";
import { SpotifyDataInterface } from "@s/router/types";
import { makeAutoObservable, runInAction } from "mobx";


class Store {
  constructor() {
    makeAutoObservable(this)
  }
  data: SpotifyDataInterface[] = []

  async checkRefreshToken() {
    const request = await $api.get('http://localhost:3000/api/checkRefreshToken')
    return request.data
  }
  loadPlaylists = (data: any) => {
    console.log(data)
    runInAction(() => this.data.push(...data))
  }
}

export default new Store()