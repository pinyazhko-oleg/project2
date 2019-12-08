import React from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className = {s.nav}>
      <div className={s.item}>
        <NavLink to="/profile" isActive={(match, location) => {
          //console.log(match, location, location.pathname === '/profile');
          return location.pathname === '/profile'}} activeClassName={s.activeLink}
          >Profile</NavLink>
      </div>
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/dialogs" isActive={(match, location) => {
          return location.pathname === '/dialogs'}} activeClassName={s.activeLink}
          >Messages</NavLink>
      </div>
      <div className={s.item}>
        <a>News</a>
      </div>
      <div className={s.item}>
        <a>Music</a>
      </div>
      <div className={s.item}>
        <a>Settings</a>
      </div>
    </nav>
  );
}

export default Navbar;
