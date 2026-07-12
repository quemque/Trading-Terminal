import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { ActiveNavLabel } from './ActiveNavLabel'

function NavItem({
   to,
   label,
   isActive,
}: {
   to: string
   label: string
   isActive: boolean
}) {
   if (isActive) return <ActiveNavLabel label={label} />

   return (
      <NavLink
         to={to}
         className={({ isActive: linkActive }) =>
            cn(
               'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
               'hover:bg-accent hover:text-accent-foreground',
               linkActive
                  ? 'bg-accent text-accent-foreground shadow-sm'
                  : 'text-muted-foreground',
            )
         }
      >
         {label}
      </NavLink>
   )
}

export default NavItem
