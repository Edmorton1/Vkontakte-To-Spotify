import { action, makeAutoObservable, runInAction } from "mobx"

class ErrorStore {
  constructor() {
    makeAutoObservable(this, {
      setError: action,
      removeError: action
    })
  }

  error: Error | null = null

  setError = (error: Error) => {
    runInAction(() => this.error = error)
  }

  removeError = () => {
    this.error = null
  }
}

export default new ErrorStore()