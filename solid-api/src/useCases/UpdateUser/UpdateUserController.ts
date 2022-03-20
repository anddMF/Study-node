import { Request, Response } from 'express';
import { UpdateUserUseCase } from './UpdateUserUseCase';
export class UpdateUserController {
    constructor(
        private updateUserUseCase: UpdateUserUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const {name, email, password} = request.body;
        try {
            const res = await this.updateUserUseCase.execute({
                name, 
                email, 
                password
            })

            return response.status(201).json(res);
        } catch (err) {
            return response.status(500).json({
                message: err.message || 'Internal error'
            })
        }
    }
}