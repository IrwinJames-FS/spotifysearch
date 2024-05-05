import session from "express-session";
import { UserDocument } from "./models/User";
import { Document } from "mongoose";
export type UserObject = Document<unknown, {}, UserDocument> & UserDocument & Required<{
	_id: string;
}>
export type Session = session.Session & Partial<session.SessionData> & {
	referrerUrl?: string
	passport?: {
		user?: UserObject
	}
	oldSessionData?: Session
}