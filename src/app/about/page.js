
// src/app/about.js
import Header from '@/components/header';
import Footer from '@/components/footer';
import About from '@/components/about';

export default function AboutPage() {
  return (
    <div>
      <Header />
      <main className="py-12">
        <About />
      </main>
      <Footer />
    </div>
  );
}
