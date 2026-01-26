import { IBusinessDetails } from "./business";

export interface IUserDetail {
    "_id": string,
    "isDeleted": boolean,
    "firstName": string,
    "lastName": string,
    "email": string,
    "emailVerified": boolean,
    "plan": string,
    "isSuspended": boolean,
    "createdAt": string,
    "updatedAt": string, 
    "dateOfBirth": string,
    "gender": string,
    "phoneNumber": string,
    "profilePicture": string,
    "id": string,
    "business": IBusinessDetails
}