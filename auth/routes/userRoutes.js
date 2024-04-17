import express from "express";

const router = express.Router();

// import {
//     authUser,
//     registerUser,
//     logoutUser,
//     getUserProfile,
//     UpdateUserProfile,
//     getUserByID,
//     getUsers,
//     deleteUser,
//     updateUser
// } from '../controllers/userController.js'
// import {protect, owner} from '../middleware/authMiddleware.js'

// router.route('/').post(registerUser).get(protect, owner, getUsers)
// router.post('/auth', authUser)
// router.post('/logout', logoutUser)
// router.route('/profile').get(protect, getUserProfile).put(protect, UpdateUserProfile)
// router.route('/:id').get(protect, owner, getUserByID).delete(protect, owner, deleteUser).put(protect, owner, updateUser)


export default router;