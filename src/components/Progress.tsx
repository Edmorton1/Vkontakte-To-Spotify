import { useState } from "react"

function Progress() {
  const [status, setStatus] = useState(0)

  // setInterval(() => setStatus(status + 0.1), 1000)

  return (
    <>
    <progress value={status}>asd</progress>
    <button onClick={() => setStatus(status + 0.1)}>adssad</button>
    </>
  )
}

export default Progress