import { User } from "../entities/User";

export interface IUsersRepository {
    // precisa validar se já não existe o email

    findByEmail(email:string): Promise<User>;
    save(user: User): Promise<void>;
    updateUser(user: User): Promise<string>;
}