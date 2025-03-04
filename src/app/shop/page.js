"use client";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ProductsList from "@/components/ProductsList";

export default function Shop() {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center text-yellow-800 my-8">Boutique</h1>
        <ProductsList />
      </main>
      <Footer />
    </div>
  );
}
