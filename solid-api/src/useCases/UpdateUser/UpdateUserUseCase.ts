import { IUpdateUserDTO } from './UpdateUserDTO';
import { IMailProvier } from './../../providers/IMailProvider';
import { IUsersRepository } from './../../repositories/IUsersRepository';
import { User } from '../../entities/User';
export class UpdateUserUseCase {

    constructor(
        private userRespository: IUsersRepository,
        private mailProvider: IMailProvier
    ) { }

    async execute(data: IUpdateUserDTO): Promise<string> {
        // fazer o update do user, se for valido, no repositorio
        const validUser = await this.userRespository.findByEmail(data.email);
        if (!validUser) {
            throw new Error('Invalid user to update.');
        }

        const user = new User(data);
        
        // mandar email avisando da alteração
        const response = await this.userRespository.updateUser(user);
        if (!response) {
            throw new Error('Error while updating the user')
        }

        await this.mailProvider.sendMail({
            to: {
                name: 'Update teste',
                email: 'fake@fake.com'
            },
            from: {
                name: 'Equipe',
                email: 'equipe@meuapp.com'
            },
            subject: 'Usuário atualizado',
            body: '<h1> Usuário ' + response + ' atualizado com sucesso'
        })

        return response;
    }
}