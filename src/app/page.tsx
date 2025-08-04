'use client';

import About from "@/app/about/page";
import ProjectSlider from "@/app/projects/page";
import Contact from "@/app/contact/page";
import HeroBanner from "@/app/components/HeroBanner";
import { useLocale } from "@/contexts/LocaleContext";

export default function Home() {
  const { t } = useLocale();
  return (
    <main>
      {/* Home Section - Top of page */}
      <section id="home" className="h-screen flex items-center justify-center -mt-20">
        <HeroBanner />
      </section>
      
      {/* About Section */}
      <section id="about" className="h-screen flex items-center justify-center -mt-20">
        <About />
      </section>

      {/* Projects Section */}
      <section id="projects" className="h-screen flex flex-col items-center justify-center -mt-20">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-foreground mb-4 text-center">{t("pages.projects.title").toUpperCase()}</h2>
        </div>
        <ProjectSlider />
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex flex-col items-center justify-center -mt-20">
        <Contact />
      </section>
    </main>
  );
}
