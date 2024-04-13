import { Request, Response } from "express";

export const renderSPA = (req: Request, res: Response) => {
	//This wont become necessary until a production version is being built 
	console.log("index", req.user);
	res.send("I am running from here now");
}