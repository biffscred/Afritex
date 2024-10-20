const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Paramètres de l'application OAuth2
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL (ou l'URL de redirection que tu utilises)
);

// Ajoute le Refresh Token généré via le Playground OAuth2
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Crée le transporteur Nodemailer avec OAuth2
async function sendEmail(emailType, recipientEmail, token) {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
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

  // Choisir le sujet et le texte en fonction du type d'e-mail
  let subject, text;
  if (emailType === 'registration') {
    subject = 'Confirmation de votre inscription chez Afritex';
    text = `Merci de vous être inscrit chez Afritex ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : https://afritex.com/confirm?token=${token}`;
  } else if (emailType === 'passwordReset') {
    subject = 'Réinitialisation de votre mot de passe';
    text = `Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour définir un nouveau mot de passe : https://afritex.com/reset-password?token=${token}`;
  }

  // Options de l'e-mail
  const mailOptions = {
    from: process.env.EMAIL_ADDRESS, // Adresse de l'expéditeur
    to: recipientEmail, // Adresse du destinataire
    subject: subject, // Sujet personnalisé
    text: text, // Contenu personnalisé
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail envoyé: ' + info.response);
    }
  });
}

// Appelle cette fonction avec les paramètres adéquats selon le cas
// Par exemple, pour l'inscription :
sendEmail('registration', 'destinataire@gmail.com', 'token-d-inscription');

// Et pour une réinitialisation de mot de passe :
sendEmail('passwordReset', 'destinataire@gmail.com', 'token-de-reinitialisation');
