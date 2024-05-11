import { Router } from 'express';
const router = Router();
import {basicAuthUser} from "../middleware/checkAuth"
import {startDirWatch,stopDirWatch,getDirWatchDetails} from '../controller/task.controller';
import { checkRequestBodyParams } from '../middleware/Validators';



router.post('/start',
basicAuthUser,
checkRequestBodyParams("directory"),
startDirWatch,
);
router.post('/stop',
basicAuthUser,
checkRequestBodyParams("directory"),
stopDirWatch, 
);

router.get('/',
basicAuthUser,
getDirWatchDetails
);



export default router;