import { usePortfolio } from '../../context/PortfolioContext'

export function Footer() {
  const { data: portfolioData } = usePortfolio()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 bg-card-light/50 dark:bg-card-dark/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto section-padding pb-32 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-500">
            © {year} {portfolioData.name}. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <a href={portfolioData.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary">
              LinkedIn
            </a>
            <a href="https://github.com/indiranivas" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-primary">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
