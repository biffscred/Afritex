import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordComponent = () => {
    // États pour la demande de réinitialisation
    const [email, setEmail] = useState('');
    const [requestMessage, setRequestMessage] = useState('');

    // États pour la réinitialisation du mot de passe
    const [newPassword, setNewPassword] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [resetMessage, setResetMessage] = useState('');

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoi de la demande de réinitialisation
            await axios.post('https://127.0.0.1:8000/reset-password', { email });
            setRequestMessage('Vérifiez votre email pour le lien de réinitialisation.');
        } catch (error) {
            setRequestMessage('Erreur lors de la demande de réinitialisation.');
        }
    };

    const handleResetSubmit = async (e) => {
        e.preventDefault();
        try {
            // Envoi du nouveau mot de passe avec le token
            await axios.post('https://127.0.0.1:8000/reset-password/reset', { token: resetToken, newPassword });
            setResetMessage('Votre mot de passe a été réinitialisé avec succès.');
        } catch (error) {
            setResetMessage('Erreur lors de la réinitialisation du mot de passe.');
        }
    };

    return (
        <div>
            <h2>Réinitialisation du mot de passe</h2>
            <div>
                <h3>Demande de réinitialisation</h3>
                <form onSubmit={handleRequestSubmit}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre email"
                        required
                    />
                    <button type="submit">Demander la réinitialisation</button>
                </form>
                {requestMessage && <p>{requestMessage}</p>}
            </div>

            <div>
                <h3>Définir un nouveau mot de passe</h3>
                <form onSubmit={handleResetSubmit}>
                    <input
                        type="text"
                        value={resetToken}
                        onChange={(e) => setResetToken(e.target.value)}
                        placeholder="Entrez le token de réinitialisation"
                        required
                    />
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Entrez votre nouveau mot de passe"
                        required
                    />
                    <button type="submit">Réinitialiser le mot de passe</button>
                </form>
                {resetMessage && <p>{resetMessage}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordComponent;
