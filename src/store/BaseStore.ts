import { makeObservable } from "mobx"

class BaseStore {
  constructor() {
    makeObservable(this, {
      isOpen: true,
      open: true,
      close: true
    })
  }

  isOpen = false

  open = () => {
    this.isOpen = true
  }
  
  close = () => {
    this.isOpen = false
  }
}

export default BaseStore