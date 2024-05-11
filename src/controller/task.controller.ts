import * as fs from 'fs';
import * as  path from 'path';
import { Lumel } from "../model/task.model";
import { response } from "../helper/commonResponseHandler";

const activity = 'Lumel';

export const startDirWatch = async (req, res, next) => {
    try {
        const { directory, magicString, interval } = req.body;
        if (!directory || !magicString || !interval) {
            return response(req, res, activity, 'Level-2', 'startDirWatch', true, 400, {}, "Directory path, magic string, and interval are required");
        }
        if (!fs.existsSync(directory)) {
            return response(req, res, activity, 'Level-2', 'startDirWatch', true, 400, {}, "Directory does not exist");
        }
        let dirWatch = await Lumel.findOne({ directory });
        if (!dirWatch) {
            dirWatch = new Lumel({ directory, magicString, interval });
        } else {
            dirWatch.magicString = magicString;
            dirWatch.interval = interval;
        }
        dirWatch.status = 1;
        dirWatch.startedOn = new Date();
        await dirWatch.save();

        const watcher = fs.watch(directory, async (eventType, filename) => {

            console.log(`Event type: ${eventType}, File: ${filename}`);

            

            if (eventType === 'change') {
                try {
                    const fileContent = fs.readFileSync(path.join(directory, filename), 'utf-8');
                    const occurrences = (fileContent.match(new RegExp(magicString, '')) || []).length;
                    console.log(`Magic string occurrences: ${occurrences}`);

                    if (dirWatch) { 
                        dirWatch.fileContent = fileContent;
                        dirWatch.occurrences = occurrences;
                        await dirWatch.save();
                    }
                } catch (err) {
                    console.error('Error reading file or updating database:', err);
                }
            }
        });

        response(req, res, activity, 'Level-2', 'startDirWatch', true, 200, 'Directory watch created  successfully', "Directory watch started successfully");
    } catch (err:any) {
        response(req, res, activity, 'Level-2', 'startDirWatch', true, 500, {}, err.message);
    }
};

export const stopDirWatch = async (req, res, next) => {
    try {
        const { directory } = req.body;
        const dirWatch = await Lumel.findOne({ directory, status: 1 });

        if (!dirWatch) {
            return response(req, res, activity, 'Level-2', 'stopDirWatch', true, 400, {}, "Directory watch not found or already stopped");
        }

        dirWatch.status = 0;
        dirWatch.stoppedOn = new Date();
       const data =  await dirWatch.save();
    response(req, res, activity, 'Level-2', 'stopDirWatch', true, 200, {data}, "Directory watch stopped successfully");
    } catch (err:any) {
        response(req, res, activity, 'Level-2', 'stopDirWatch', true, 500, {}, err.message);
    }
};

export const getDirWatchDetails = async (req, res, next) => {
    try {
        const dirWatches = await Lumel.find({ status: 1 });

        if (dirWatches.length === 0) {
            response(req, res, activity, 'Level-2', 'getDirWatchDetails', true, 200, {}, "No active directory watches found");
        } else {
            response(req, res, activity, 'Level-2', 'getDirWatchDetails', true, 200, dirWatches, "Active directory watches found");
        }
    } catch (err:any) {
        response(req, res, activity, 'Level-2', 'getDirWatchDetails', true, 500, {}, err.message);
    }
};
