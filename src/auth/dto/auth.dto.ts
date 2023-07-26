import { IsEmail, IsNotEmpty } from "class-validator"

export class AuthDTO {
    @IsNotEmpty()
    @IsEmail()
    email: string
    @IsNotEmpty()
    password: string
}