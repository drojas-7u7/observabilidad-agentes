import { NavBar } from './components/NavBar/NavBar'
import { sections } from './config/sections'

function App() {
  return (
    <>
      <NavBar />
      <main>
        {sections.map(({ id, component: Section }) => (
          <Section key={id} id={id} />
        ))}
      </main>
    </>
  )
}

export default App