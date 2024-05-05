import { Dispatch, SetStateAction, useCallback} from "react";
import { SpotyPlayerState } from "../spoty.types";
import { AsyncState, useAsync } from "./useAsync";
import { Spax } from "../utils/spax";
import { Queue } from "../spoty.record.types";


type PlayerStateResult = {
	state: SpotyPlayerState
	queue?: Queue
}
export const usePlayerState = (product: 'free'|'premium'|undefined, spax: Spax): [boolean, Error | undefined, SpotyPlayerState | undefined, Queue | undefined, ()=>void, Dispatch<SetStateAction<AsyncState<PlayerStateResult | undefined>>>] => {
	const getPlayerState = useCallback(async () => {
		if (!product) return;
		const state = await spax.get`/me/player`<SpotyPlayerState | undefined>();
		if(!state) return undefined;
		if(product !== 'premium') return {state};
		const queue = await spax.get`/me/player/queue`<Queue>();
		return {state, queue};
	}, [product, spax]);

	const [loading, error, state, refresh, setState] = useAsync<PlayerStateResult | undefined>(getPlayerState);
	return [loading, error, state?.state, state?.queue, refresh, setState]
}