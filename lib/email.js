import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function createGmailTransporter() {
  try {
    const accessToken = await oauth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_ADDRESS,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error('Erreur transporteur Gmail:', error);
    throw new Error('Problème avec le transporteur Gmail');
  }
}

function createMailtrapTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: 'jacinthe.collier70@ethereal.email',
      pass: 'jeJRg5rNtP63JNBHAd'
    },
    tls: { rejectUnauthorized: false },
  });
}

// ON AJOUTE "export" DEVANT LA FONCTION
export async function sendEmail(emailType, recipientEmail, token) {
  let transporter;

  if (process.env.NODE_ENV === 'production') {
    transporter = await createGmailTransporter();
  } else {
    transporter = createMailtrapTransporter();
  }

  let subject, text;
  if (emailType === 'registration') {
    subject = 'Confirmation de votre inscription chez Afritex';
    text = `Merci de vous être inscrit ! Confirmez ici : ${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}&email=${recipientEmail}`;
  } else if (emailType === 'passwordReset') {
    subject = 'Réinitialisation de votre mot de passe';
    text = `Cliquez ici pour réinitialiser : ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${recipientEmail}`;
  }

  const mailOptions = {
    from: `Afritex <${process.env.EMAIL_ADDRESS}>`,
    to: recipientEmail,
    subject: subject,
    text: text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé: ' + info.response);
  } catch (error) {
    console.error('Erreur lors de l\'envoi :', error);
    throw error; // On laisse la route API gérer la réponse d'erreur
  }
}