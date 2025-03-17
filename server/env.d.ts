declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SPOTIFY_CLIENT_ID: string,
      SPOTIFY_CLIENT_SECRET: string,
      MY_REFRESH_TOKEN: string,
      URL_CLIENT: string,
      URL_SERVER: string
    }
  }