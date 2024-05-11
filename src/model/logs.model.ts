import * as mongoose from "mongoose";
export interface LogsDocument extends mongoose.Document {
    _id?: any;
   // userId?: any;
    time?: any;
    date?: any;
    activity?: any;
    ipAddess?: any;
    description?: any;
    url?: any;
    processStatus?: any;
    statusCode?: any;
    method?: any;
    isDeleted?: any;
    status?: any;
    level?: any;
    mandapam?: any;
    createdOn?: any;
    createdBy?: any;
    modifiedOn?: any;
    modifiedBy?: any;
};

const logsSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
   // userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    time: { type: Number },
    date: { type: Date },
    ipAddess: { type: String },
    statusCode: { type: Number },
    activity: { type: String },
    url: { type: String },
    description: { type: String },
    processStatus: { type: Boolean },
    method: { type: String },
    level: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});



export const Logs = mongoose.model("Logs", logsSchema);
