import { Request, Response } from 'express';
import { Lumel } from '../model/task.model';
import * as fs from 'fs';
import * as path from 'path';
import { response } from '../helper/commonResponseHandler';
import {clientError  } from "../helper/ErrorMessage";

var activity= 'Lumel'

export let updateDirWatch = async (req,res,next) => {
    try {
        const { directory, magicString, interval } = req.body;
        const dirWatch = new Lumel({ directory, magicString, interval });
        await dirWatch.save();
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},clientError.success.updateSuccess);

    } catch (err: any) {
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 500, {},err.message);

    }
};

export let startDirWatch = async (req,res,next) => {
    try {
        
        const dirWatch = await Lumel.findOne({ status: 1 });

        if (!dirWatch) {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},"dirWatch Not Found");
        } else {
            
            dirWatch.status = 1;
            await dirWatch.save();
            const watcher = fs.watch(dirWatch.directory, (eventType, filename) => {
                console.log(`Event type: ${eventType}, File: ${filename}`);
                if (eventType === 'change') {
                    const fileContent = fs.readFileSync(path.join(dirWatch.directory, "C:\Desktop\test.text.txt"), 'utf-8');
                    const occurrences = (fileContent.match(new RegExp(dirWatch.magicString, 'g')) || []).length;
                    console.log(`Magic string occurrences: ${occurrences}`);
                }
            });
          response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, watcher,"Watch start SuccessFully");
        }
    } catch (err: any) {
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 500, {},err.message);
    }
};

export let stopDirWatch = async (req, res,next) => {
    try {
        
        const dirWatch = await Lumel.findOne({ status: 1 });

        if (!dirWatch) {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},"dirWath Not Found");
        } else {
            
            dirWatch.status = 0;
            dirWatch.stopedOn = new Date(); 
            await dirWatch.save();
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},clientError.success.savedSuccessfully);
        }
    } catch (err: any) {
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 500, {},err.message);
    }
};



export let getDirWatchDetails = async (req,res,next) => {
    try {
   
        const dirWatches = await Lumel.find({ status: 1 });

        if (dirWatches.length === 0) {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},"dirWath Not Found");
        } else {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, dirWatches,clientError.success.savedSuccessfully);
        }
    } catch (err: any) {
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 500, {},err.message);
    }
};

export let getDirWatchDetailsFinishedTask = async (req,res,next) => {
    try {
        const dirWatches = await Lumel.find({ 
            createdAt: { $exists: true, $ne: null },
            stoppedOn: { $exists: true, $ne: null }
        });
        if (dirWatches.length === 0) {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, {},"dirWath Not Found");
        } else {
            response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 200, dirWatches,clientError.success.savedSuccessfully);
        }
    } catch (err: any) {
        response(req, res, activity, 'Level-2', 'Update-shareAdsPost', true, 500, {},err.message);
    }
};



