const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// Paramètres de l'application OAuth2 pour Gmail
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID, // Client ID
  process.env.GOOGLE_CLIENT_SECRET, // Client Secret
  'https://developers.google.com/oauthplayground' // Redirect URL (ou l'URL de redirection que tu utilises)
);

// Ajoute le Refresh Token généré via le Playground OAuth2
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Fonction pour créer un transporteur Gmail avec OAuth2
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
        accessToken: accessToken.token, // Assurez-vous que l'access token est récupéré correctement
      },
    });
  } catch (error) {
    console.error('Erreur lors de la création du transporteur Gmail:', error);
    throw new Error('Problème avec le transporteur Gmail');
  }
}

// Fonction pour créer un transporteur Mailtrap
function createMailtrapTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
     user: 'viola31@ethereal.email',
        pass: 'GA1xyEBN9H4wxpSvXQ'
    },
    tls: {
      rejectUnauthorized: false, // Ignorer les erreurs de certificat auto-signé en développement
    },
  });
}

// Fonction principale pour envoyer des e-mails
async function sendEmail(emailType, recipientEmail, token) {
  let transporter;

  // Choisir le transporteur en fonction de l'environnement
  if (process.env.NODE_ENV === 'production') {
    transporter = await createGmailTransporter(); // Utiliser Gmail en production
  } else {
    transporter = createMailtrapTransporter(); // Utiliser Mailtrap en développement
  }

  // Choisir le sujet et le texte en fonction du type d'e-mail
  let subject, text;
  if (emailType === 'registration') {
    subject = 'Confirmation de votre inscription chez Afritex';
    text = `Merci de vous être inscrit chez Afritex ! Veuillez confirmer votre adresse e-mail en cliquant sur le lien suivant : ${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}&email=${recipientEmail}`;
  } else if (emailType === 'passwordReset') {
    subject = 'Réinitialisation de votre mot de passe';
    text = `Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien suivant pour définir un nouveau mot de passe : ${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}&email=${recipientEmail}`;
  }

  // Options de l'e-mail
  const mailOptions = {
    from: `Afritex <${process.env.EMAIL_ADDRESS}>`, // Adresse de l'expéditeur
    to: recipientEmail, // Adresse du destinataire
    subject: subject, // Sujet personnalisé
    text: text, // Contenu personnalisé
  };

  // Envoi de l'e-mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé: ' + info.response);
    console.log('Prévisualisation de l\'URL : ' + nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de l\'e-mail de vérification', error: error.message },
      { status: 500 }
    );
  }
  
  console.log('E-mail envoyé avec succès, retour du traitement...');
  
}

// Appelle cette fonction avec les paramètres adéquats selon le cas
// Par exemple, pour l'inscription :
sendEmail('registration', 'destinataire@gmail.com', 'token-d-inscription');

// Et pour une réinitialisation de mot de passe :
// sendEmail('passwordReset', 'destinataire@gmail.com', 'token-de-reinitialisation');
module.exports = sendEmail;