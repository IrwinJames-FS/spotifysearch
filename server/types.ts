import session from "express-session";
import { UserDocument } from "./models/User";

export type Session = session.Session & Partial<session.SessionData> & {
	referrerUrl?: string
	passport?: {
		user?: UserDocument
	}
	oldSessionData?: Session
}