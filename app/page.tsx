import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Features from "@/components/Sections/Features/Features";
import Section1 from "@/components/Sections/Section1/Section1";
import UsersCloud from "@/components/Users/UsersCloud";
import MouseGasEffect from "@/components/Effects/MouseGasEffect";

export default function Home() {
  return (
    <main>
      <MouseGasEffect />
      <Hero />
      <UsersCloud />
      <Section1 />
      <Features />
      <Footer />
    </main>
  );
}
