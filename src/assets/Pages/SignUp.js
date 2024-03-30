import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 // Assurez-vous d'importer useHistory
import '../styles/SignUpForm.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rgpdConsent, setRgpdConsent] = useState(false);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Initialise useHistory pour la redirection

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        if (!rgpdConsent) {
            setMessage('Veuillez accepter les termes et conditions RGPD.');
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('https://127.0.0.1:8000/SignUp', {
                email,
                password
            });
            console.log('Réponse:', response.data);
            setMessage('Inscription réussie ! Veuillez vérifier votre e-mail pour activer votre compte.');
            setIsSubmitting(false);
            navigate('/'); // Modifier '/accueil' par le chemin de redirection souhaité
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            setMessage("Erreur lors de l'inscription. Veuillez essayer de nouveau.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-form-container">
            <form onSubmit={handleSubmit} className="signup-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="checkbox" 
                        id="rgpdConsent" 
                        checked={rgpdConsent} 
                        onChange={(e) => setRgpdConsent(e.target.checked)} 
                    />
                    <label htmlFor="rgpdConsent">J'accepte les termes et conditions RGPD</label>
                </div>
                <div className="form-message">
                    {message && <p>{message}</p>}
                </div>
                <button type="submit" className="signup-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Inscription en cours...' : "S'inscrire"}
                </button>
            </form>
        </div>
    );
};

export default SignUpForm;
