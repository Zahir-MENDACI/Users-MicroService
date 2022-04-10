import express from "express"
import { UsersController } from "../users/controllers/users.controllers";


const router = express.Router();

const usersController = new UsersController();

router.post('/auth', usersController.authUser);
router.post('/users', usersController.addUser);
router.get('/users', usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);

export default {
    routes: router
}