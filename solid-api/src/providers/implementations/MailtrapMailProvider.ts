import Mail from 'nodemailer/lib/mailer';
import nodemailer from 'nodemailer';
import { IMailProvier, IMessage } from './../IMailProvider';
// service usada em desenvolvimento para capturar os emails para um servidor de teste
export class MailtrapMailProvider implements IMailProvier {
    private transporter: Mail;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: '4e331d9290e368',
                pass:'6f4e8aa931fa80'
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