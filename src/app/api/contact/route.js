// src/app/api/contact/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

require('dotenv').config();

console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
console.log('GOOGLE_REFRESH_TOKEN:', process.env.GOOGLE_REFRESH_TOKEN);
console.log('EMAIL_ADDRESS:', process.env.EMAIL_ADDRESS);

const OAuth2 = google.auth.OAuth2;

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    let transporter;

    if (process.env.NODE_ENV === 'production') {
      // Configurer OAuth2 pour Gmail en production
      const oauth2Client = new OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        'https://developers.google.com/oauthplayground'
      );

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      });

      const accessToken = await oauth2Client.getAccessToken();
      console.log('Access Token:', accessToken);
      transporter = nodemailer.createTransport({
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
    } else {
      // Utiliser Mailtrap en développement
      transporter = nodemailer.createTransport({
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

    // Définir les options de l'e-mail
    const mailOptions = {
      from: `${name} <${email}>`,
      to: 'destinataire@example.com', // Adresse à laquelle l'e-mail sera envoyé
      subject: subject,
      text: message,
    };

    // Envoyer l'e-mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'E-mail envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de l\'e-mail' }, { status: 500 });
  }
}
