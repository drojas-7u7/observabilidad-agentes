import { sections } from './config/sections'

function App() {
  return (
    <main>
      {sections.map(({ id, component: Section }) => (
        <Section key={id} id={id} />
      ))}
    </main>
  )
}

export default App