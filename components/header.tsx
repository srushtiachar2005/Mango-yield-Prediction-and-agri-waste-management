export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-2xl font-bold">
            🥭
          </div>
          <div>
            <h1 className="text-4xl font-bold">Farm2Value</h1>
            <p className="text-primary-foreground/80">AI-Powered Mango Yield Prediction</p>
          </div>
        </div>
      </div>
    </header>
  )
}
