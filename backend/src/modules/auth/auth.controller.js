import { Router } from 'express';
import { validate } from '../../middlewares/validate.js';
import { AuthService }  from './auth.service.js';
import { signUpDto } from './dto/sign-up.dto.js';
import { signInDto } from './dto/sign-in.dto.js';
import { isAuthMiddleware } from '../../middlewares/is-auth.middleware.js';

const authRouter = Router();

authRouter.post('/register', validate(signUpDto), async (req, res, next) => {
    try {
        const { name,  email, password } = req.body;

        const resp = await AuthService.signUp({ name,  email, password });
        
        if (resp === 'ALREADY_EXISTS') {
            return res.status(400).json({ message: "User already registered" });
        }

        return res.status(201).json({ message: "User signed-up successfully" });
    } catch (error) {
        next(error); 
    }
});

authRouter.post('/login', validate(signInDto), async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const resp = await AuthService.signIn({ email, password });
        
        if (resp === 'INVALID_CREDENTIALS') {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        return res.status(200).json({ accessToken: resp });
    } catch (error) {
        next(error);
    }
});

authRouter.get('/current-user', isAuthMiddleware, async (req, res, next) => {
    try {
        const user = await AuthService.currentUser(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.json(user);
    } catch (error) {
        next(error);
    }
});

export { authRouter };