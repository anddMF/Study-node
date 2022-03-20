import { UpdateUserUseCase } from './UpdateUserUseCase';
import { UpdateUserController } from './UpdateUserController';
import { MailtrapMailProvider } from './../../providers/implementations/MailtrapMailProvider';
import { PostgresUsersRepository } from './../../repositories/implementations/PostgresUsersRepository';

const postgreRepository = new PostgresUsersRepository;
const mailProvider = new MailtrapMailProvider;

const updateUserUseCase = new UpdateUserUseCase(postgreRepository, mailProvider);
const updateUserController = new UpdateUserController(updateUserUseCase);

export {updateUserUseCase, updateUserController};