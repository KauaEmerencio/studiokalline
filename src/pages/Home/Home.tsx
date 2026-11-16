import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Benefits from "../../components/Benefits/Benefits";
import LashStyles from "../../components/LashStyles/LashStyles";
import Gallery from "../../components/Gallery/Gallery";
import Testimonials from "../../components/Testimonials/Testimonials";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <LashStyles />
        <Gallery />
        <Testimonials />
        <SocialLinks />
      </main>
      <Footer />
    </>
  );
}
