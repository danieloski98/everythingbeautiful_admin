
export interface IAdmin {
    "_id": string,
    "isDeleted": false,
    "fullname": string,
    "email": string,
    "role": string,
    "access": Array<string>,
    "suspended": boolean,
    "createdAt": string,
    "updatedAt": string, 
}

export interface IRole {
    "_id": string,
    "isDeleted": boolean,
    "name": string,
    "permissions": string[],
    "createdAt": string,
    "updatedAt": string, 
}