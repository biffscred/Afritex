import React, { useState } from 'react';
import axios from 'axios';

// import ReCAPTCHA from "react-google-recaptcha";
import '../styles/SignUpForm.css';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [rgpdConsent, setRgpdConsent] = useState(false);

    // const handleCaptcha = (value) => {
    //     console.log("Captcha value:", value);
    //     setIsVerified(true);
    // };

    

    
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (!isVerified) {
        //     alert('Veuillez valider le CAPTCHA');
        //     return;
        // }

        if (!rgpdConsent) {
            alert('Veuillez accepter les termes et conditions RGPD');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/SignUp', {
                email,
                password
            });
            console.log('Réponse:', response.data);
            // Traitez la réponse, par exemple redirigez vers la page de connexion ou affichez un message de succès
        } catch (error) {
            console.error("Erreur lors de l'inscription", error);
            // Gérez les erreurs d'inscription ici
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
               
                {/* <ReCAPTCHA
                    sitekey="YOUR_RECAPTCHA_SITE_KEY"
                    onChange={handleCaptcha}
                /> */}
                <div className="form-group">
                    <input 
                        type="checkbox" 
                        id="rgpdConsent" 
                        checked={rgpdConsent} 
                        onChange={(e) => setRgpdConsent(e.target.checked)} 
                    />
                    <label htmlFor="rgpdConsent">J'accepte les termes et conditions RGPD</label>
                </div>
                <button type="submit" className="signup-button">S'inscrire</button>
            </form>
        </div>
    );
};

export default SignUpForm;

