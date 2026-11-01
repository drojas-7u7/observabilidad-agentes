import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { useEffect } from 'react'
import { NavBar } from './components/NavBar/NavBar'
import { SectionPager } from './components/SectionPager/SectionPager'
import { SiteFooter } from './components/SiteFooter/SiteFooter'
import { sectionIds, sections } from './config/sections'
import { useHashSection } from './hooks/useHashSection'

function App() {
  const activeId = useHashSection(sectionIds)
  const activeIndex = sections.findIndex((section) => section.id === activeId)
  const ActiveSection = sections[activeIndex].component
  // La primera sección es la portada: tiene su propio botón "Empezar"
  // y el pie de página completo.
  const isCover = activeIndex === 0

  // Al cambiar de sección, volvemos arriba de la página.
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [activeId])

  return (
    // reducedMotion="user": si la persona tiene las animaciones desactivadas
    // en su sistema, Motion las desactiva automáticamente en toda la web.
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">
        <NavBar activeId={activeId} />
        <main className="flex flex-1 flex-col">
          {/* Solo se muestra la sección activa, con una transición al cambiar */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              className="flex flex-1 flex-col"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <ActiveSection id={activeId} />
              {!isCover && <SectionPager activeIndex={activeIndex} />}
            </motion.div>
          </AnimatePresence>
        </main>
        <SiteFooter variant={isCover ? 'full' : 'compact'} />
      </div>
    </MotionConfig>
  )
}

export default App
