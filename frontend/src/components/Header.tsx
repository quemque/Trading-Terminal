import { useLocation } from 'react-router-dom'
import { useTradingStore } from '../store/TradingStore'
import { useThemeStore } from '../store/ThemeStore'
import NAV_ITEMS from '../data/nav-items'
import NavItem from './NavItem'
import { NavLink } from 'react-router-dom'
import ConnectionStatus from './ConnectionStatus'
import ThemeToggle from './ThemeToggle'

function Header() {
   const { pathname } = useLocation()
   const isConnected = useTradingStore((s) => s.isConnected)
   const { theme, toggleTheme } = useThemeStore()

   const isActivePath = (path: string) => pathname.startsWith(path)

   return (
      <header className="w-full h-15 flex items-center justify-between bg-bg-primary duration-300">
         <NavLink
            to="/"
            className="text-accent font-bold text-xl hover:text-accent-hover transition-colors ml-2"
         >
            TradeTerminal
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

         <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <ConnectionStatus isConnected={isConnected} />
         </div>
      </header>
   )
}

export default Header
