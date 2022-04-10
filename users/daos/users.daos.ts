import * as admin from "firebase-admin"
import { CollectionReference, DocumentReference, DocumentSnapshot, Query, QuerySnapshot, WriteResult } from "firebase-admin/firestore";
import { FirebaseService } from "../../config/firebase";
import User from "../../models/User";
import { Utils } from "../../utils/utils";
import firebase from "firebase/compat"

export class UsersDAO {
    private static instance: UsersDAO;
    db: admin.firestore.Firestore;
    auth: firebase.auth.Auth

    constructor() {
        this.db = FirebaseService.getInstance().db;
        this.auth = FirebaseService.getInstance().auth;
        console.log("Created new instance of UsersDAO");
    }

    static getInstance(): UsersDAO {
        if (!UsersDAO.instance) {
            UsersDAO.instance = new UsersDAO();
        }
        return UsersDAO.instance;
    }



    async add(user: User, password: string) {
        try {
            const snapshot: QuerySnapshot = await this.db.collection("users").withConverter(User.userConverter).where("email", "==", user.email).limit(1).get()
            let docRef: DocumentReference
            if (snapshot.empty){
                docRef = this.db.collection("users").withConverter(User.userConverter).doc()
                user.id = docRef.id
            } else {
                docRef = this.db.collection("users").withConverter(User.userConverter).doc(snapshot.docs[0].id)
                user.id = docRef.id
            }
            return await admin.auth().createUser({
                email: user.email,
                password: password
            })
            .then(async (res) => {
                user.uid = res.uid
                await docRef.set(user)
                return "User added successfully"
            })
            .catch((e) => {
                console.log("--", e)
                return e
            })
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async authUser(email: string, password: string) {
        try{
            const snapshot = await this.db.collection("users").where("email", "==", email).withConverter(User.userConverter).limit(1).get()
            await this.auth.signInWithEmailAndPassword(email, password)
            const user = await this.auth.currentUser.getIdTokenResult();
            const userData = snapshot.docs[0].data()
            let returnValue
            if (userData.status !== "deleted"){
                returnValue = {
                    id: userData.id,
                    token: user.token,
                    expiration: user.expirationTime
                }
            } else {
                throw "deleted"
            }
            return returnValue;
        } catch (e) {
            throw e
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
            const user: User = snapshot.data() as User
            if (user.status !== "deleted"){
                returnValue = user
            }
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
            const snapshot: DocumentSnapshot = await this.db.collection("users").doc(userId).get()
            if (!snapshot.exists) {
                return "Inexistant user"
            }
            return await admin.auth().deleteUser(snapshot.data().uid)
            .then(async () => {
                const writeResult: WriteResult = await this.db.collection("users").doc(userId).set({status: "deleted"}, {merge: true})
                return "User deleted successfully"
            }).catch((e) => {
                return e
            })
        } catch (error) {
            throw error
        }
    }
}