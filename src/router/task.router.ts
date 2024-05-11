import { Router } from 'express';
import {basicAuthUser} from "../middleware/checkAuth"
import {startDirWatch,getDirWatchDetails,getDirWatchDetailsFinishedTask,stopDirWatch,updateDirWatch} from '../controller/task.controller';

const router = Router();

router.post('/update',
basicAuthUser,
updateDirWatch,
);
router.post('/start',
basicAuthUser,
startDirWatch, 
);

router.post('/stop',
basicAuthUser,
stopDirWatch, 
);

router.get('/getCurrent',
basicAuthUser,
getDirWatchDetails
);

router.get('/getFinished', 
basicAuthUser,
getDirWatchDetailsFinishedTask
);

export default router;