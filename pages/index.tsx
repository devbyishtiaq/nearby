import type { NextPage } from "next";
import Header from "../components/General/Header/Header";
import Intro from "../components/IndexComponents/Intro";
import About from "../components/IndexComponents/About";
import Reason from "../components/IndexComponents/Reason";
import Services from "../components/IndexComponents/Services";
import Roadmap from "../components/IndexComponents/Roadmap";
import Partners from "../components/IndexComponents/Partners";
import Advantages from "../components/IndexComponents/Advantages";
import Tariff from "../components/IndexComponents/Tariff";
import AboutAika from "../components/IndexComponents/AboutAika";
import Constructor from "../components/IndexComponents/Constructor";
import Testimonials from "../components/IndexComponents/Testimonials";
import Faq from "../components/IndexComponents/Faq";
import Footer from "../components/General/Footer/Footer";

const HomePage: NextPage = () => {
  return (
    <>
      <Header />
      <Intro />
      <About />
      <Reason />
      <Services />
      <Roadmap />
      <Partners />
      <Advantages />
      <Tariff />
      <AboutAika />
      <Constructor />
      <Testimonials />
      <Faq />
      <Footer />
    </>
  );
};

export default HomePage;
