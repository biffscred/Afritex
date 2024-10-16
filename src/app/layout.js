
import localFont from "next/font/local";
import '../styles/globals.css';
import ClientProvider from '../components/clientProvider';

// Charger les polices locales avec gestion des poids
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",  // Ajustez le chemin
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",  // Ajustez le chemin
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
});

// Métadonnées globales pour le SEO
export const metadata = {
  title: "Afritex - Tissus africains authentiques",
  description: "Découvrez une vaste gamme de tissus africains de qualité supérieure pour toutes vos créations.",
  charset: "utf-8",
  url: "https://afritex.com",
  image: "/images/afritex-promo.jpg",
};

// Nouvelle API pour gérer le viewport
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Meta tags pour le SEO et la performance */}
        <meta charSet={metadata.charset} />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <title>{metadata.title}</title>

        {/* Open Graph pour un meilleur partage sur les réseaux sociaux */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:type" content="website" />

        {/* Twitter Card pour un bon affichage des partages sur Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />

        {/* Préchargement des polices pour une meilleure performance */}
        <link rel="preload" href="../fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="../fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
      <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
