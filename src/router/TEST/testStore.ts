import { makeAutoObservable } from "mobx";

class testStore {
  constructor() {
    makeAutoObservable(this)
  }
  data: any[] = ['asdasdsad', 'hghghgh']
}

export default new testStore