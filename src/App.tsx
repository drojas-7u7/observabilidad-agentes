import { MotionConfig } from 'motion/react'
import { NavBar } from './components/NavBar/NavBar'
import { sections } from './config/sections'

function App() {
  return (
    // reducedMotion="user": si la persona tiene las animaciones desactivadas
    // en su sistema, Motion las desactiva automáticamente en toda la web.
    <MotionConfig reducedMotion="user">
      <NavBar />
      <main>
        {sections.map(({ id, component: Section }) => (
          <Section key={id} id={id} />
        ))}
      </main>
    </MotionConfig>
  )
}

export default App
