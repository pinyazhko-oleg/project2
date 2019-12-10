import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

  let dialogsElements = props.state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

  let messagesElements = props.state.messages.map(m => <Message message={m.message} />);

  let newDialogElement = React.createRef();

  let addDialog = () => {
    let text = newDialogElement.current.value;
    alert(text);
  }

  return (
      <div className={s.dialogs}>
          <div className={s.dialogsItems}>
            {dialogsElements}
          </div>
          <div className={s.messages}>
            {messagesElements}
          </div>
          <div className={s.postsBlock}>
            <div>
              <textarea ref={newDialogElement}></textarea>
            </div>
            <div>
              <button onClick={addDialog}>Add dialog</button>
            </div>
          </div>
      </div>
  );
}

export default Dialogs;
