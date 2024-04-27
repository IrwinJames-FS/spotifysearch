import { createContext, useContext } from "react";
import { SpotifyPlayerContextState, SpotifyPlayerController } from "./types";


export const SpotifyPlayerContext = createContext<SpotifyPlayerController | null>(null);

export const useSpotifyPlayer = ():SpotifyPlayerController => useContext(SpotifyPlayerContext)!