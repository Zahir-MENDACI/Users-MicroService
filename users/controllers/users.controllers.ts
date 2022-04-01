import express from "express";
import { Utils } from "../../utils/utils";
import { UsersService } from "../services/users.services";



export class UsersController {
    constructor() {
    }

 

    addUser = async (req: express.Request, res: express.Response) => {
        const usersService = UsersService.getInstance();
        try {
            const addUser = await usersService.addUser(req.body)
            res.status(200).send(addUser);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getAllUsers = async (req: express.Request, res: express.Response) => {
        const usersService = UsersService.getInstance();
        try {
            const listActions = Utils.getInstance().listActions(req.query.sort as string, req.query.range as string, req.query.filter as string);
            const users = await usersService.getUsers(listActions)
            res.status(200).send(users);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    getUserById = async (req: express.Request, res: express.Response) => {
        const usersService = UsersService.getInstance();
        try {
            const user = await usersService.getUserById(req.params)
            res.status(200).send(user);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    updateUser = async (req: express.Request, res: express.Response) => {
        const usersService = UsersService.getInstance();
        try {
            const userUpdated = await usersService.updateUser(req.body, req.params)
            res.status(200).send(userUpdated);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }

    deleteUser = async (req: express.Request, res: express.Response) => {
        const usersService = UsersService.getInstance();
        try {
            const userDeleted = await usersService.deleteUser(req.params)
            res.status(200).send(userDeleted);
        } catch (error) {
            console.log(error)
            res.status(400).send(error);
        }
    }
}