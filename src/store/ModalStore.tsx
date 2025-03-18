import { makeAutoObservable } from "mobx"

class ModalStore {
  constructor() {
    makeAutoObservable(this)
  }

  content = <div>asdasd</div>

  open = (data: React.ReactElement) => {
    this.content = data
    console.log(this.content)
  }
  
  close = () => {
    this.content = null
    console.log(this.content)
  }
}

export default new ModalStore()