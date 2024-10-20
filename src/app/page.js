import Banner from '../components/banner';
import AboutSection from '../components/aboutsection';
import Header from '@/components/header';
import FabricsSection from '@/components/fabrics';
import ModelsSection from '@/components/modelssection';
import AccessoriesSection from '@/components/accessories';
import Footer from '@/components/footer';
// import ExploreSection from '@/components/exploresection';
// import TestimonialsSection from '@/components/testimonialssection';
// import NewsletterSection from '@/components/newslettersection';
// import ContactSection from '@/components/contactsection';

export default function Home() {
  return (
    <div>
      {/* Section de Bienvenue */}
      <section className="w-full">
      <Header />
      </section>

      {/* Bannière qui prend toute la largeur de l'écran */}
      <section className="w-full">
        <Banner />
      </section>

      {/* Section "À propos" */}
      <section className="w-full m-0 p-0">
        <AboutSection />
      </section>

     {/* Section "Nos Tissus " */}
      <section className="w-full m-0 p-0">
        <FabricsSection />
      </section>

      {/* Section "Nos Modèles" */}
      <section className="w-full m-0 p-0">
        <ModelsSection />
      </section>

      {/* Section Accessoires */}
      <section className="w-full m-0 p-0">
        
         
          {/* Exemples de produits accessoires */}
          <AccessoriesSection />
          </section>
          
     
    

      {/* Section Témoignages */}
      {/* <section className="w-full bg-gray-100 py-12">
        <TestimonialsSection />
      </section> */}

      {/* Section Newsletter */}
      {/* <section className="w-full py-12">
        <NewsletterSection />
      </section> */}

      {/* Section Contact */}
      {/* <section className="w-full bg-gray-100 py-12">
        <ContactSection />
      </section> */}
       {/* Footer */}
       <Footer />
    </div>
  );
}

