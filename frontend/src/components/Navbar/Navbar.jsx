import React, { useEffect, useState } from 'react';
import './Navbar.css';
import '../../index.css';
import logo from '../../assets/logo.jpg'
import { Link } from 'react-scroll';
import menu_icon from '../../assets/menu_icon.png';


const Navbar = () => {

  // make navigation bar dark
  const [sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY < 50 ? setSticky (true) : setSticky (false);
    })
  },[]);

  const [mobileMenu, setMobileMenu] = useState (false);
  const tooggleMenu = () => {
      mobileMenu? setMobileMenu(false) : setMobileMenu(true);
  }

  return (
    <nav className={`${sticky? 'dark-nav' : ''}`}>
        <img src={logo} alt='' className='logo'/>
        <ul className={mobileMenu?'':'hide-mobile-menu'}>
            <li><Link to='home' smooth={true} offset={0} duration={500}>Home</Link></li>
            <li><Link to='about' smooth={true} offset={-100} duration={500}>About</Link></li>
            <li><Link to='services' smooth={true} offset={-100} duration={500}>Services</Link></li>
            <li><Link to='contact' smooth={true} offset={-100} duration={500} className='btn0'>Contact</Link></li>
            <li><a href="/login" target="_blank" rel="noopener noreferrer" className="btn1"><b>Appointment</b></a></li>
            <li><a href="/adminlogin" target="_blank" rel="noopener noreferrer" className="btn2"><b>ADMIN</b></a></li>
        </ul>
        
        <img src = {menu_icon} alt = ''  className='menu-icon' onClick={tooggleMenu} />
    </nav>
  )
}

export default Navbar