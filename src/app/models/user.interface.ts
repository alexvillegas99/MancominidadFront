
export interface User{
    user:string;
    pass:string;
}
export interface UserResponse{
    message:string;
    token: string;
    userId:number;
    role:string;
    usuario:string;
}