import Hero from '../components/sections/Hero'
import ScrollReveal from '../components/common/ScrollReveal'
import { fadeInUp } from '../utils/animations'
import { useLanguage } from '../context/LanguageContext'

function Home() {
  const { language, t } = useLanguage()

  return (
    <>
      <Hero />
      <section id="work" className="px-4 py-20 sm:px-6 lg:px-8">
        <ScrollReveal key={`work-${language}`} variants={fadeInUp} className="mx-auto max-w-5xl">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.sections.work.title}</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              {t.sections.work.description}
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="blog" className="px-4 pb-20 sm:px-6 lg:px-8">
        <ScrollReveal key={`blog-${language}`} variants={fadeInUp} className="mx-auto max-w-5xl">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.sections.blog.title}</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              {t.sections.blog.description}
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section id="contact" className="px-4 pb-28 sm:px-6 sm:pb-20 lg:px-8">
        <ScrollReveal key={`contact-${language}`} variants={fadeInUp} className="mx-auto max-w-5xl">
          <div className="glass-panel rounded-3xl p-6 sm:p-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.sections.contact.title}</h2>
            <p className="mt-3 max-w-2xl text-white/75">
              {t.sections.contact.description}
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}

export default Home
