// app/cart.js
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function Cart() {
    console.log("Page À propos chargée");
  return (
    <div>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {/* Contenu du panier avec composants */}
      </main>
      <Footer />
    </div>
  );
}
