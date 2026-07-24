import { About } from "@/components/about";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { ProductTradeoffEngine } from "@/components/product-tradeoff-engine";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProductTradeoffEngine />
        <Projects />
        <About />
      </main>
      <Footer />
    </>
  );
}
