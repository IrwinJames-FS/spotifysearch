import { Model, Schema, model } from "mongoose";

const schema = new Schema<UserDocument, UserModel>({
	_id: {
		type: String,
		required: [true, 'An ID must be provided']
	},
	displayName: {
		type: String,
		required: [true, 'A display name should always be provided']
	},
	accessToken: {
		type: String,
		required: [true, 'An access token was not provided'],
	},
	refreshToken: {
		type: String,
		required: [true, 'A refresh token was not provided'],
	},
	expires: {
		type: Number,
		required: [true, 'An expiration value must be provided']
	},
})

export interface UserDocument extends Document {
	_id: string,
	displayName: string,
	accessToken: string,
	refreshToken: string,
	expires: number,
}

export interface UserModel extends Model<UserDocument> {};

export const User  = model<UserDocument, UserModel>('User', schema);