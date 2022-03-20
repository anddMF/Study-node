import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';
export class CreateUserController {
    constructor(
        private createUserUseCase: CreateUserUseCase
    ) { }

    // se conecta com o useCase para executar a ação deste caso de uso
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        try {
            this.createUserUseCase.execute({
                name,
                email,
                password
            });

            // response com 201 e body vazio
            return response.status(201).send();
        } catch (err) {
            return response.status(400).json({
                message: err.message || 'Unexpected error.'
            })
        }
    }
}