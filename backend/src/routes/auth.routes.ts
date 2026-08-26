import express from 'express';
import { authController } from '../controllers/auth.controller';
import { protect } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/validate.middleware';
import { sendOtpSchema, registerSchema, loginSchema } from '../validations/auth.validation';

const router = express.Router();

router.post('/send-otp', validate(sendOtpSchema), authController.sendOtp);
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/profile', protect, authController.profile);
router.get('/whatsapp-status', authController.whatsappStatus);

export default router;
