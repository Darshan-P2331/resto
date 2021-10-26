const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

// Send mail
const sendMail = (to, url, txt) => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2Client.getAccessToken();

  const smtpTransparent = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: `Resto. ${txt}`,
    html: `
        <html lang="en">
            <head>
                <link rel="stylesheet" href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap'>
            </head>

            <body>
                <div style="font-family: 'Nunito',sans-serif; max-width: 700px; margin:auto; border: 10px solid #192a56; padding: 50px 20px; font-size: 110%; border-radius: .2rem;">
                    <h2 style="text-align: center; text-transform: capitalize;"><svg xmlns="http://www.w3.org/2000/svg" style="height: 25px; color: #27ae60;"
                    aria-hidden="true" focusable="false" data-prefix="fas" data-icon="utensils"
                    class="svg-inline--fa fa-utensils fa-w-13" role="img" viewBox="0 0 416 512">
                    <path fill="currentColor"
                        d="M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z" />
                </svg> Resto.</h2>
                    <p>Congratulations! You're almost set to start using Resto.
                        Just click the button below to ${txt}.
                    </p>

                    <a href=${url}
                        style="margin: 10px 0;
                        display: inline-block;
                        text-decoration: none;
                        color: #fff;
                        background: #27ae60;
                        border-radius: .2rem;
                        cursor: pointer;
                        padding: 10px 20px;">${txt}</a>
                    <p style="color: #192a56; font-weight: bold;" >If the button doesn't work for any reason, you can also click on the link below:</p>
                    <div>${url}</div>
                </div>
            </body>

        </html>
        `,
  };

  smtpTransparent.sendMail(mailOptions, (err, info) => {
    if (err) throw err;
    return info;
  });
};

module.exports = sendMail;
