import { Router } from "express";
import v1 from './v1';
const router = Router();

//This route will be responsible for versioning
router.use('/v1', v1);

export default router;