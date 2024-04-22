export class ApiError extends Error {
	status: number = 500
	constructor(message: string, status?: number) {
		super(message);
		if(status) this.status = status;
	}
}

