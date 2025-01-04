import jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';

export const authUserMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userEmail = req.headers.useremail;
     if (!token) return res.status(401).json({ message: 'Authentication token missing.' });
     if (!userEmail) return res.status(401).json({ message: 'Email is required in headers.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(401).json({ message: 'user not found' });
        if (user.email !== userEmail) return res.status(401).json({ message: 'Unauthorized: Token does not match the provided email.' });
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};