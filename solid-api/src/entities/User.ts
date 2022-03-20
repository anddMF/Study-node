import { uuid } from "uuidv4";

export class User {
    public readonly id: string;

    public name: string;
    public email: string;
    public password: string;

    // props é um hack do ts, ele vai ter as propriedades do user tirando somente o id
    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props);
        // equivalente \/
        //this.name = props.name;
        //this.email = props.email;
        //this.password = props.password;

        // está fazendo isso só para não deixar a responsabilida para o BD criar o ID
        if (!id) {
            this.id = uuid();
        }
    }
}