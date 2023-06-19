import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces";
import { AppError } from "../errors";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: IEmailRequest) {
    const transporter = createTransport({
      host: "smtp-mail.outlook.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
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
        link: "http://localhost:3001/",
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
            link: `https://localhost:3001/resetPassword/${resetToken}`,
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