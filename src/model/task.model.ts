import mongoose from "mongoose";

export interface LumelDocument extends mongoose.Document {
    _id?: any;
    directory: string;
    magicString: string;
    interval: number;
    status: Number;
    isDeleted: Boolean;
    createdOn: Date;
    createdBy: String;
    modifiedOn: Date;
    modifiedBy: String;
    createdAt: Date;
    stopedOn: Date;
}

const lumelSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    directory: { type: String, required: true },
    magicString: { type: String, required: true },
    interval: { type: Number, required: true },
    status: { type: Number, default: 1 },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    stopedOn: { type: Date },
});

export const  Lumel= mongoose.model("Lumel", lumelSchema);