import React from 'react'
import 
{BsGrid1X2Fill, BsFillGrid3X3GapFill}
 from 'react-icons/bs';
 import { FaPowerOff } from "react-icons/fa";
 import logo from '../../assets/logo.jpg';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <img src={logo} alt='' className='sidebar-logo'/> 
                <p>YoungVé Salon</p>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <a href="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='/booking'>
                    <BsFillGrid3X3GapFill className='icon'/> Appointments
                </a>
            </li>
            <li className='sidebar-list-item'>
                <a href='/'>
                    <FaPowerOff className='icon'/> Log Off
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar