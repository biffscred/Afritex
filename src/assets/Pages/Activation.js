import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AccountActivation = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/activate-account/${token}`)
            .then(response => {
                setMessage('Votre compte a été activé avec succès.');
                // Redirigez ou ajoutez des actions supplémentaires ici
                navigate('/login');
            })
            .catch(error => {
                setMessage('Échec de l’activation du compte. Lien invalide ou expiré.');
            });
    }, [token, navigate]);

    return (
        <div>
            <h2>Activation du Compte</h2>
            <p>{message}</p>
        </div>
    );
};

export default AccountActivation;
