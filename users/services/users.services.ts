import User from "../../models/User";
import { UsersDAO } from "../daos/users.daos";


export class UsersService {
    private static instance: UsersService;
    dao: UsersDAO;

    constructor() {
        this.dao = UsersDAO.getInstance();
    }

    static getInstance(): UsersService {
        if (!UsersService.instance) {
            UsersService.instance = new UsersService();
        }
        return UsersService.instance;
    }


    async addUser(body: any) {
        try {
            const user = new User(undefined, undefined, body.firstName, body.lastName, body.email, body.location, body.status, new Date(), new Date())
            return await this.dao.add(user, body.password)
        } catch (error) {
            throw error
        }
    }

    async authUser(body: any) {
        try {
            return await this.dao.authUser(body.email, body.password)
        } catch (error) {
            throw error
        }
    }

    async getUsers(resources: { sort: string[], range: number[], filter: object }) {
        try {
            const users = this.dao.getUsers(resources.sort, resources.range, resources.filter)
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserById(params: any) {
        try {
            const userId: string = params.id
            const user = this.dao.getUserById(userId)
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(body: any, params: any) {
        try {
            const userId: string = params.id
            const user = new User(undefined, undefined, body.firstName, body.lastName, body.email, body.location, body.status, undefined, new Date())
            return await this.dao.updateUser(userId, user)
        } catch (error) {
            throw error
        }
    }

    async deleteUser(params: any) {
        try {
            const userId = params.id
            return await this.dao.deleteUser(userId)
        } catch (error) {
            throw error
        }
    }
}