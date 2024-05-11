import { Router } from 'express';
const router: Router = Router();

import task from './task.router'

router.use('/task', task);


export default router;