import jwt from 'jsonwebtoken';
import Admin from '../models/adminSchema.js';

export const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const userEmail = req.headers.useremail;
     if (!token) return res.status(401).json({ message: 'Authentication token missing.' });
     if (!userEmail) return res.status(401).json({ message: 'Email is required in headers.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id);

        if (!admin) return res.status(401).json({ message: 'Admin not found.' });
        if (admin.email !== userEmail) return res.status(401).json({ message: 'Unauthorized: Token does not match the provided email.' });

        req.user = admin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};