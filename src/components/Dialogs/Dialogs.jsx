import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';

const Dialogs = (props) => {

  let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);

  let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} />);

  let newMessageElement = React.createRef();

  let addMessage = () => {
    props.addMessage();
  }

  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
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
              <textarea ref={newMessageElement}
                        onChange={onMessageChange}
                        value={props.dialogsPage.newMessageText}/>
            </div>
            <div>
              <button onClick={addMessage}>Add message</button>
            </div>
          </div>
      </div>
  );
}

export default Dialogs;
