import nodemailer from "nodemailer"
import "dotenv/config"
import hbs from "nodemailer-express-handlebars"
import path from "path"

const transport = nodemailer.createTransport({
    host: process.env.EM_HOST,
    port: 2525,
    auth: {
      user: process.env.EM_USER,
      pass: process.env.EM_PASS
    }
});

transport.use('compile', hbs({
    viewEngine: {
        // extname: '.html',
        // layoutsDir: 'src/resources/mail/',
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/resources/mail')
    },
    viewPath: path.resolve('./scr/resources/mail'),
    extName:'.html',
}))

export default transport;
