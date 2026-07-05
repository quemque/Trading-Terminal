import { NavLink } from 'react-router-dom'

function NavItem({
   to,
   label,
   isActive,
}: {
   to: string
   label: string
   isActive: boolean
}) {
   const baseClasses = 'px-3 py-2 rounded-lg text-sm transition-colors'

   if (isActive) {
      return (
         <span
            className={`${baseClasses} bg-bg-tertiary text-text-primary cursor-default`}
         >
            {label}
         </span>
      )
   }

   return (
      <NavLink
         to={to}
         className={({ isActive }) =>
            `${baseClasses} ${
               isActive
                  ? 'bg-bg-tertiary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`
         }
      >
         {label}
      </NavLink>
   )
}
export default NavItem
