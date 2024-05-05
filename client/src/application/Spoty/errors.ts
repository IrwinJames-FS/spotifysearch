export class PlayerInitError extends Error {
	constructor(message: string = "Player Init Error"){
		super(message)
		this.name = "PlayerInitError";
	}
}

export class PlayerAuthError extends Error {
	constructor(message: string = "Player Authentication Error"){
		super(message)
		this.name = "PlayerAuthError";
	}
}

export class PlayerAccountError extends Error {
	constructor(message: string = "Player Account Error") {
		super(message);
		this.name = "PlayerAccountError";
	}
}

export class PlayerPlaybackError extends Error {
	constructor(message: string = "Playback Error") {
		super(message);
		this.name = "PlayerPlaybackError"
	}
}

export class TransferPlaybackError extends Error {
	constructor(message: string = "TransferPlaybackError") {
		super(message);
		this.name = "TransferPlaybackError";
	}
}

export class PlayerAutoplayError extends Error {
	constructor(message: string = "PlayerAutoplayError") {
		super(message);
		this.name = "PlayerAutoplayError";
	}
}