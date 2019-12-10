import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from 'react-router-dom';

const DialogItem =(props) => {
  let path = '/dialogs/' + props.id;

  return (
    <div className={s.dialog + ' ' + s.active}>
      <img src=
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSIHvVBCjR88LrWWuAiQaui6tx5I0rK7oT8mpX_UuMIVYtKhiAh'
      alt=''/>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  )
}

export default DialogItem;
