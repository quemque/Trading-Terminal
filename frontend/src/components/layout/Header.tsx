import { useLocation } from 'react-router-dom'
import { useThemeStore } from '../../store/ThemeStore'
import NAV_ITEMS from '../../config/nav-items'
import NavItem from '../common/NavItem'
import { NavLink } from 'react-router-dom'
import ThemeToggle from '../common/ThemeToggle'

function Header() {
   const { pathname } = useLocation()
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

         <div className="flex items-center gap-4 mr-5">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
         </div>
      </header>
   )
}

export default Header
