import { ObjectId } from "mongodb";

export default interface aliasUrl {
    _id: ObjectId;
    longUrl: string;
    alias: string;
};