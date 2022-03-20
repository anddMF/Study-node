import { IMailProvier } from './../../providers/IMailProvider';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { User } from '../../entities/User';
export class CreateUserUseCase {

    constructor(private usersRepository: IUsersRepository, private mailProvider: IMailProvier){
    }

    /* o private usersRepository: IUsersRepository transforma em propridade da classe, equivale a \/
    private usersRepository: IUsersRepository;
    constructor(usersRepository: IUsersRepository){
        this.usersRepository = usersRepository;
    }*/

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error("User already exists.");
        }

        // mesmo não sendo um objeto de mesma tipagem, o props que está no construtor faz o match da propridades do data com o da classe User
        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe',
                email: 'equipe@meuapp.com'
            },
            subject: 'Cadastro executado',
            body: '<h1>Bem vindo a plataforma</h1> <p>usuário cadastrado com sucesso, id: '+user.id+'</p>'
        })
    }
}