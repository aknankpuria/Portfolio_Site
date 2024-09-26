import React from 'react'
import { navLinks } from '../constants';

const NavItems = () => {
  return (
    <div>
      <ul className='nav-ul'>
       {navLinks.map(({ id, name, href }) => (
         <li key={id} className='nav-li'>
           <a href={href} className='nav-li_a'>
             {name}
           </a>
         </li>
       ))}
      </ul>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);
  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-black-90'>
        <div className='max-w-7xl mx-auto'>
           <div className='flex justify-between items-center py-5 mx-auto c-space'>
             <a href='/' className='text-neutral-400 font bold text-xl hover:text-white transition-colors'>
               ASLAM KHAN
             </a>
             <button onClick={toggleMenu} className='text-neutral-400 hover:text-white focus:outline-none
              sm:hidden flex' aria-label='toggle menu'>
                <img src={isOpen ? '/assets/close.svg' : '/assets/menu.svg'} alt="toggle" className='w-6 h-6' />
             </button>
             <nav className="sm:flex hidden" aria-label='main navigation'>
               <NavItems />
             </nav>
           </div>
        </div>
       </header>
  )
}

export default Navbar