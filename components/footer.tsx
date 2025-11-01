export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-3">Farm2Value</h4>
            <p className="text-sm text-primary-foreground/80">
              Empowering farmers with AI-powered insights for sustainable agriculture.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Features</h4>
            <ul className="text-sm space-y-2 text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Yield Prediction
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Waste Analysis
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-foreground transition">
                  Farm Insights
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Contact</h4>
            <p className="text-sm text-primary-foreground/80">
              Email: info@farm2value.com
              <br />
              Support: support@farm2value.com
            </p>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-6">
          <p className="text-center text-sm text-primary-foreground/60">
            © {currentYear} Farm2Value. All rights reserved. | Sustainable Agriculture Innovation
          </p>
        </div>
      </div>
    </footer>
  )
}
