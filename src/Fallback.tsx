import * as style from "@/css/fallback.module.scss"

function Fallback({ error, resetErrorBoundary }: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <div className={style.main}>
      <h2>Something went wrong</h2>
      <pre>Error message: {error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default Fallback