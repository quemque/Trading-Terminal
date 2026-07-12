import { useLocation, NavLink } from 'react-router-dom'
import { useThemeStore } from '../../store/ThemeStore'
import NAV_ITEMS from '../../config/nav-items'
import NavItem from '../common/NavItem'
import ThemeToggle from '../common/ThemeToggle'
import { TrendingUp } from 'lucide-react'

function Header() {
   const { pathname } = useLocation()
   const { theme, toggleTheme } = useThemeStore()

   const isActivePath = (path: string) => pathname.startsWith(path)

   return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
         <div className="flex h-16 items-center justify-between px-4">
            <NavLink
               to="/"
               className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity"
            >
               <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
               </div>
               <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  TradeTerminal
               </span>
            </NavLink>

            <nav className="flex items-center gap-1">
               {NAV_ITEMS.map(({ to, label }) => (
                  <NavItem
                     key={to}
                     to={to}
                     label={label}
                     isActive={isActivePath(to)}
                  />
               ))}
            </nav>

            <div className="flex items-center gap-3">
               <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
         </div>
      </header>
   )
}

export default Header
