
export interface IAdmin {
    "_id": string,
    "isDeleted": false,
    "fullname": string,
    "email": string,
    "role": string,
    "access": string[],
    "suspended": boolean,
    "createdAt": string,
    "updatedAt": string, 
}