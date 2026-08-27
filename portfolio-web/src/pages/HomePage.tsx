import { SiteNav, MobileDock, Preloader } from '../components/layout/SiteNav'
import { SiteFooter } from '../components/layout/SiteFooter'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Experience } from '../components/sections/Experience'
import { Statement } from '../components/sections/Statement'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { Education } from '../components/sections/Education'
import { Awards } from '../components/sections/Awards'
import { Contact } from '../components/sections/Contact'

export function HomePage() {
  return (
    <>
      <Preloader />
      <SiteNav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Statement />
        <Projects />
        <Skills />
        <Education />
        <Awards />
        <Contact />
      </main>
      <SiteFooter />
      <MobileDock />
    </>
  )
}
