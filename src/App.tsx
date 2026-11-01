function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">
        Expediente: detectives de agentes
      </p>

      <h1 className="text-5xl font-bold">
        Evaluación y observabilidad de sistemas de agentes
      </h1>

      <p className="text-xl">
        Tu agente dice que todo ha ido bien. ¿Cómo lo sabes?
      </p>

      <div className="flex gap-3">
        <span className="rounded-full bg-success px-4 py-1 text-white">OK</span>
        <span className="rounded-full bg-warning px-4 py-1 text-ink">Aviso</span>
        <span className="rounded-full bg-danger px-4 py-1 text-white">Error</span>
      </div>
    </main>
  )
}

export default App