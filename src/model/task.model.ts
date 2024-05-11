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
    stoppedOn: Date;
}

const lumelSchema = new mongoose.Schema({
    directory: {type: String, required: true},
    magicString: {type: String,required: true},
    interval: { type: Number,required: true},
    status: {type: Number,default: 0},
    fileContent: {type: String, default: ''},
    occurrences: {type: Number,default: 0},
    startedOn: {type: Date,default: null},
    stoppedOn: {type: Date,default: null}
});

export const Lumel= mongoose.model('Lumel', lumelSchema);


