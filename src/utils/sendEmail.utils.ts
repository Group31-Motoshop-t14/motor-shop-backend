import Mailgen from "mailgen";
import { createTransport } from "nodemailer";
import { AppError } from "../errors";
import { IEmailRequest } from "../interfaces";

class EmailService {
  async sendEmail({ to, subject, text }: IEmailRequest) {
    const transporter = createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter
      .sendMail({
        from: process.env.SMTP_USER,
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("E-mail send with success");
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Error sending e-mail, try again later", 500);
      });
  }

  resetPasswordTemplate(
    userName: string,
    userEmail: string,
    resetToken: string
  ) {
    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Redefinição de senha MotorShop",
        link: `http://localhost:${process.env.FRONT_END_PORT}/`,
      },
    });

    const email = {
      body: {
        name: `${userName}`,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: `http://localhost:${process.env.FRONT_END_PORT}/resetPassword/${resetToken}`,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Redefinição de senha",
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailService = new EmailService();

export { emailService };
