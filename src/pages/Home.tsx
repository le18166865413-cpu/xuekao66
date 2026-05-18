import Hero from '../components/Hero';
import Features from '../components/Features';
import Teachers from '../components/Teachers';
import Courses from '../components/Courses';
import Testimonials from '../components/Testimonials';
import Partners from '../components/Partners';
import CTA from '../components/CTA';
import QuickEntries from '../components/QuickEntries';

export default function Home() {
  return (
    <main>
      <Hero />
      
      <section>
        <Features />
      </section>
      
      <section>
        <Teachers />
      </section>
      
      <section>
        <Courses />
      </section>
      
      <section>
        <Testimonials />
      </section>
      
      <section>
        <Partners />
      </section>
      
      <section>
        <CTA />
      </section>
      
      <section>
        <QuickEntries />
      </section>
    </main>
  );
}
