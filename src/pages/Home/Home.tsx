import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Benefits from "../../components/Benefits/Benefits";
import Gallery from "../../components/Gallery/Gallery";
import Testimonials from "../../components/Testimonials/Testimonials";
import SocialLinks from "../../components/SocialLinks/SocialLinks";
import StickyCTA from "../../components/StickyCTA/StickyCTA";
import Footer from "../../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <Gallery />
        <Testimonials />
        <SocialLinks />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
