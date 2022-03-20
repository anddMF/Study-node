import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import { IMailProvier, IMessage } from './../IMailProvider';
// service usada em desenvolvimento para capturar os emails para um servidor de teste
export class MailtrapMailProvider implements IMailProvier {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: '',
            port: 1,
            auth: {
                user: '',
                pass:''
            }
        })
    }
    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }

}
