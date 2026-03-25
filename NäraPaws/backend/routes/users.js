import express from 'express';
import cors from 'cors';
import userController from '../controllers/userController.js';

const router = express.Router();

router.use(cors());

router.get('/', async (req, res) => {
    try {
        const users = await userController.getAllUsers(req.body);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post('/', async (req, res) => {
    try {
        const userId = await userController.createUser(req.body);
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});


export default router;