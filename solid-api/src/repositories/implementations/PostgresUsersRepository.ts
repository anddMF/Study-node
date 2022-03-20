import { User } from '../../entities/User';
import { IUsersRepository } from './../IUsersRepository';

// conexao fake com o banco de dados
export class PostgresUsersRepository implements IUsersRepository{
    
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(x => x.email === email);

        return user;
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async updateUser(user: User): Promise<string> {
        const index = this.users.findIndex(x => x.email == user.email);
        console.log('usuario encontrado');
        this.users[index].name = user.name;
        this.users[index].email = user.email;
        this.users[index].password = user.password;

        console.log('usuario alterado com name: '+ this.users[index].name);

        return this.users[index].name;
    }
}