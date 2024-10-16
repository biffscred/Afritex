// pages/auth/login.js
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError('Email ou mot de passe incorrect.');
    } else {
      router.push('/'); // Rediriger vers la page d'accueil ou une page protégée après connexion
    }
  };

  const handleProviderLogin = async (provider) => {
    await signIn(provider, { callbackUrl: '/' }); // Rediriger vers l'accueil après connexion avec un provider
  };

  return (
    <div>
  <h1>Bienvenue chez Afr</h1>
  <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl shadow-lg max-w-md w-full border-l-8 border-yellow-500">
  {error && <p className="text-red-600 font-semibold mb-4">{error}</p>}
  
  {/* Email Input */}
  <div className="mb-4">
    <label htmlFor="email" className="block text-lg font-medium text-green-800 mb-2">
      Email
    </label>
    <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      className="block w-full p-3 border border-yellow-300 rounded focus:outline-none focus:ring-4 focus:ring-yellow-500"
    />
  </div>

  {/* Password Input */}
  <div className="mb-6">
    <label htmlFor="password" className="block text-lg font-medium text-green-800 mb-2">
      Mot de passe
    </label>
    <input
      type="password"
      id="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      className="block w-full p-3 border border-yellow-300 rounded focus:outline-none focus:ring-4 focus:ring-yellow-500"
    />
  </div>

  {/* Login Button */}
  <button
    type="submit"
    className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-transform duration-300 transform hover:scale-105 shadow-md"
  >
    Se connecter
  </button>
</form>


  {/* Alternative Login Options */}
  <div>
    <button onClick={() => handleProviderLogin('google')}>
      Connexion avec Google
    </button>
    <button onClick={() => handleProviderLogin('facebook')}>
      Connexion avec Facebook
    </button>
    <button onClick={() => handleProviderLogin('apple')}>
      Connexion avec Apple
    </button>
  </div>

  {/* Registration Link */}
  <p>
    Pas encore de compte ? <a href="/auth/register">Inscrivez-vous ici</a>
  </p>
</div>

  );
}
