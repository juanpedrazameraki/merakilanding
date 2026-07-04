import { SiteProvider } from './context/SiteContext';
import { useReveal } from './hooks/useReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import StackSection from './components/StackSection';
import Pricing from './components/Pricing';
import About from './components/About';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFab from './components/WhatsAppFab';

function Shell() {
  useReveal();
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg)',
        color: 'var(--text)',
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative',
      }}
    >
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <StackSection />
        <Pricing />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export default function App() {
  return (
    <SiteProvider>
      <Shell />
    </SiteProvider>
  );
}
