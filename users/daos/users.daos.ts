import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import User from "../../models/User";
import { Utils } from "../../utils/utils";

export class UsersDAO {
    private static instance: UsersDAO;
    db: admin.firestore.Firestore;

    constructor() {
        this.db = FirebaseService.getInstance().db;
        console.log("Created new instance of UsersDAO");
    }

    static getInstance(): UsersDAO {
        if (!UsersDAO.instance) {
            UsersDAO.instance = new UsersDAO();
        }
        return UsersDAO.instance;
    }



    async add(user: User) {
        try {
            const docRef: DocumentReference = this.db.collection("users").withConverter(User.userConverter).doc()
            user.id = docRef.id
            await docRef.set(user)
            return "User added successfully"
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async getUsers(sort?: string[], range?: number[], filter?: any) {
        let returnValue: User[] = []
        try {
            const dbRef: CollectionReference = this.db.collection("users").withConverter(User.userConverter)
            let query: Query
            query = Utils.getInstance().listActionsDAO(dbRef, sort, range, filter)
            const snapshot: QuerySnapshot = await query.get()
            for (const document of snapshot.docs){
                const user: User = document.data() as User
                if (user.status !== "deleted"){
                    returnValue.push(document.data() as User)
                }
            }
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async getUserById(userId: string) {
        let returnValue: User = null
        try {
            const snapshot: DocumentSnapshot = await this.db.collection("users").doc(userId).withConverter(User.userConverter).get()
            if (!snapshot.exists) throw "Inexistant user"
            returnValue = snapshot.data() as User
            return returnValue
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId: string, user: User) {
        try {
            const writeResult: WriteResult = await this.db.collection("users").doc(userId).withConverter(User.userConverter).set(user, {merge: true})
            return "User updated successfully"
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId: string) {
        try {
            const writeResult: WriteResult = await this.db.collection("users").doc(userId).set({status: "deleted"}, {merge: true})
            return "User deleted successfully"
        } catch (error) {
            throw error
        }
    }
}