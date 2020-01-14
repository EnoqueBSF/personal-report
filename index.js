const CronJob = require("cron").CronJob;
require("dotenv/config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

const job = new CronJob(
  "30 * * * * *",
  () => {
    var d = new Date();
    var hora = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();
    var txt = d.getHours() + "h" + d.getMinutes() + "m" + d.getSeconds() + "s";
    var fs = require("fs");

    var email = {
      from: process.env.MAIL_FROM,
      to: "enoquebelmiro@hotmail.com",
      subject: "Relatório" + d,
      text: "Relatório gerado" + d + ".",
      attachments: [
        {
          filename: txt + ".txt",
          path: "Backup/" + txt + ".txt"
        }
      ]
    };

    fs.writeFile(
      "C:\\Users\\enoqu\\Desktop\\Cron\\Backup\\" + txt + ".txt",
      "Hello!",

      function(erro) {
        if (erro) {
          throw erro;
        }
        console.log("Saved File | " + d + "");
      }
    );

    // Relatório enviado por email

    transporter
      .sendMail(email)
      .then(message => {
        console.log(message);
      })
      .catch(err => {
        console.log(err);
      });
  },
  null,
  true,
  "America/Sao_Paulo"
);
