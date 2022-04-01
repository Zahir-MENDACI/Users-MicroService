import * as admin from "firebase-admin"

class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  
    constructor(id: string, firstName: string, lastName: string, email: string, location: string, status: string = "suspended", createdAt: Date, updatedAt: Date) {
      this.id = id
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.location = location
      this.status = status
      this.createdAt = createdAt
      this.updatedAt = updatedAt
    }

    static userConverter = {
        toFirestore(user: User) {
          const returnValue: any = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            location: user.location,
            status: user.status,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          };
    
          Object.keys(returnValue).forEach((key) => {
            
            if (returnValue[key] === undefined) {
              delete returnValue[key];
            }
            if (returnValue[key] === null) {
              returnValue[key] = null
            }
          })
    
          return returnValue;
        },

        fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot) {
          const data = snapshot.data();

          let formatedCreatedAt;
          if (data.createdAt) {
            formatedCreatedAt = data.createdAt.toDate();
          }
          let formatedUpdatedAt;
          if (data.updatedAt) {
            formatedUpdatedAt = data.updatedAt.toDate();
          }
    
          const returnValue = new User(
            snapshot.id,
            data.firstName,
            data.lastName,
            data.email,
            data.location,
            data.status,
            formatedCreatedAt,
            formatedUpdatedAt
          );
          return returnValue;
        },
      };
}

export default User;