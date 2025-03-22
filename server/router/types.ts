export interface userTokens {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: number;
}

export interface spotifyTrackDataInterface {
  id: string
  name: string;
  artists: [{ name: string }];
  external_urls: { spotify: string };
  preview_url?: string
}


export interface trackInterface {
  vk_name: string;
  name_sim: number,
  arist_sim: number,
  vk_artist: string;
  spotify_name: string;
  spotify_artist: string;
  id: string
  url: string;
  sim_event: boolean,
}

export interface SpotifyDataInterface {
  playlist: string;
  is_published: boolean;
  tracks: trackInterface[];
}