import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { PlayArgs, SpotyConfig, SpotyContext } from "./spoty.types";
import { usePlayerState } from "./hooks/usePlayerState";

import {spax} from './utils/spax';
import { usePlayer } from "./hooks/usePlayer";
import { PlayerAccountError } from "./errors";

export const SCTX = createContext<SpotyContext | null>(null);

export const useSpoty = ():SpotyContext=>useContext(SCTX)!;


export const SpotyProvider: FC<{config: SpotyConfig, children: ReactNode}> = ({config, children}) => {
	const interval = useRef<NodeJS.Timer | undefined>();
	const ax = useMemo(()=>spax(config), [config]);
	const [stateLoading, stateError, state, queue, refreshState] = usePlayerState(config.product, ax);
	const device_id = useMemo(()=>state?.device?.id, [state]);
	const debounceMs = useMemo(()=>config.debounceMs ?? 5e2, [config]);
	const [, playerError, player,, getPlayer, setPlayerError] = usePlayer(ax, config, refreshState);


	//because all controls are handled via the web api the only thing I need from the player is its existence and the ability to run functions once it exists
	const play = useCallback(async (args?:PlayArgs):Promise<void> => {
		if(config.product !== 'premium') return setPlayerError(new PlayerAccountError("You need a premium account to control playback"));
		if(!device_id) return getPlayer(()=>play(args));
		await ax.put`/me/player/play?${{device_id}}`<void, PlayArgs | undefined>(args);
		//if (config.product !== 'premium') setTimeout(refreshState, debounceMs);
	}, [device_id, ax.put, config, getPlayer, setPlayerError]);

	const pause = useCallback(async ():Promise<void> => {
		if(config.product !== 'premium') return setPlayerError(new PlayerAccountError("You need a premium account to control playback"));
		if (!device_id) return getPlayer(()=>pause());
		await ax.put`/me/player/pause?${{device_id}}`();
		//if (config.product !== 'premium') setTimeout(refreshState, debounceMs);
	}, [device_id, ax.put, config, setPlayerError, getPlayer]);

	const seek = useCallback(async (position_ms: number, keepAlive: boolean = false): Promise<void> => {
		if(config.product !== 'premium') return setPlayerError(new PlayerAccountError("You need a premium account to control playback"));
		if (!device_id) return getPlayer(()=>seek(position_ms));
		await ax.put`/me/player/seek?${{device_id, position_ms}}`();
		//setTimeout(refreshState, debounceMs);
	}, [device_id, ax.put, setPlayerError, getPlayer, config]);

	const togglePlay = useCallback(async ()=> {
		if(!state?.is_playing) await play()
		else await pause();
	}, [state, pause, play])

	const skipNext = useCallback(async () => {
		if(config.product !== 'premium') return setPlayerError(new PlayerAccountError("You need a premium account to control playback"));
		if(!device_id) return;
		await ax.post`/me/player/next?${{device_id}}`();
		//if (config.product !== 'premium') setTimeout(refreshState, debounceMs);
	}, [device_id, ax.post, config, setPlayerError]);

	const skipPrev = useCallback(async () => {
		if(config.product !== 'premium') return setPlayerError(new PlayerAccountError("You need a premium account to control playback"));
		if(!device_id) return;
		await ax.post`/me/player/previous?${{device_id}}`();
		//if (config.product !== 'premium') setTimeout(refreshState, debounceMs);
	}, [device_id, ax.post, config, setPlayerError]);

	const updatePlayback = useCallback(async (e: BeforeUnloadEvent) => {
		if(config.product !== 'premium') return //setPlayerError(new PlayerAuthError("You need a premium account to control playback"));
		if(!state?.is_playing) return
		if (window.spoty?.player){
			const diff = Date.now() - state!.timestamp
			const pos = state!.progress_ms+diff
			sessionStorage.setItem('playback-position', ''+pos);
		}
		
	}, [state, config.product]);
	//for now poll every 30 seconds but will need to refactor once incorporated web api

	useEffect(()=>{
		if(player) return; //no need for polling
		interval.current = setInterval(refreshState, config?.pollInterval ?? 1e4);
		return ()=>clearInterval(interval.current);
	}, [refreshState, config, player])

	useEffect(()=>{
		if(!state?.is_playing) return

		if(config.product !== 'premium') {
			const diff = state?.item?.duration_ms && state?.progress_ms ? (state.item.duration_ms - state.progress_ms) + 1e2:undefined;
			if(diff === undefined) return;
			const timer =setTimeout(refreshState, diff);
			return ()=>clearTimeout(timer);
		}

		window.addEventListener('beforeunload', updatePlayback)
		return ()=>window.removeEventListener('beforeunload', updatePlayback);
	}, [updatePlayback, state, config, refreshState]);

	return (<SCTX.Provider value={{
		stateLoading, stateError, state, refreshState, togglePlay, seek, skipNext, skipPrev, play, pause, product: config.product, queue, playerError
	}}>
		{children}
	</SCTX.Provider>)
}

