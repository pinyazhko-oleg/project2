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
      <div className={`${s.item} ${s.active}`}>
        <NavLink to="/users" isActive={(match, location) => {
          return location.pathname === '/users'}} activeClassName={s.activeLink}
          >Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/news" isActive={(match, location) => {
          return location.pathname === '/news'}} activeClassName={s.activeLink}
          >News</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/music" isActive={(match, location) => {
          return location.pathname === '/music'}} activeClassName={s.activeLink}
          >Music</NavLink>
      </div>
      <div className={s.item}>
        <NavLink to="/settings" isActive={(match, location) => {
          return location.pathname === '/settings'}} activeClassName={s.activeLink}
          >Settings</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
