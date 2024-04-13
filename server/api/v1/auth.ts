import { Router } from "express";
import { login, loginCallback } from "../../controllers/v1/auth";
const router = Router();

router.get('/', login);
router.get('/callback', loginCallback)
export default router;