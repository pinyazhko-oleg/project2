import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

  // let dialogs = [
  //   {id: 1, name: 'Dimych'},
  //   {id: 2, name: 'Andriy'},
  //   {id: 3, name: 'Sveta'},
  //   {id: 4, name: 'Sasha'},
  //   {id: 5, name: 'Viktor'},
  //   {id: 6, name: 'Valera'}
  // ]

  // let messages = [
  //   {id: 1, message: 'Hi'},
  //   {id: 2, message: 'Hi is your project?'},
  //   {id: 3, message: 'Yo'},
  //   {id: 4, message: 'Yo'},
  //   {id: 5, message: 'Yo'},
  //   {id: 6, message: 'Yo'}
  // ]

  let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

  let messagesElements = props.messages.map(m => <Message message={m.message} />);

  return (
      <div className={s.dialogs}>
          <div className={s.dialogsItems}>
            {dialogsElements}

          </div>
          <div className={s.messages}>
            {messagesElements}
          </div>
      </div>
  );
}

export default Dialogs;
