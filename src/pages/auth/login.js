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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-300">
      <h1 className="text-4xl font-bold mb-8 text-green-800">Bienvenue chez Afritex</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-yellow-400 shadow-lg p-8 rounded-lg w-full max-w-md">
        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded hover:bg-green-800 transition-colors duration-300 shadow-lg"
        >
          Se connecter
        </button>
      </form>

      {/* Alternative Login Options */}
      <div className="flex flex-col items-center mt-6 space-y-3 w-full max-w-md">
        <button
          onClick={() => handleProviderLogin('google')}
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors duration-300 shadow-lg flex items-center justify-center"
        >
          <span className="text-lg">Connexion avec Google</span>
        </button>
        <button
          onClick={() => handleProviderLogin('facebook')}
          className="w-full bg-blue-700 text-white py-3 rounded hover:bg-blue-800 transition-colors duration-300 shadow-lg flex items-center justify-center"
        >
          <span className="text-lg">Connexion avec Facebook</span>
        </button>
        <button
          onClick={() => handleProviderLogin('apple')}
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition-colors duration-300 shadow-lg flex items-center justify-center"
        >
          <span className="text-lg">Connexion avec Apple</span>
        </button>
      </div>

      {/* Registration Link */}
      <p className="mt-8 text-lg">
        Pas encore de compte ?{" "}
        <a href="/auth/register" className="text-green-800 font-semibold hover:text-yellow-600">
          Inscrivez-vous ici
        </a>
      </p>
    </div>
  );
}
