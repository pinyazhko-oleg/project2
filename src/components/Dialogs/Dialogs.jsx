import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';


const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />);
  let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
  let newMessageBody = state.newMessageBody;

  let sendMessage = () => {
      props.sendMessage();
    }

  let onSendMessageChange = (e) => {
    let body = e.target.value;
    props.updateNewMessageBody(body);
  }

  return (
      <div className={s.dialogs}>
          <div className={s.dialogsItems}>
            {dialogsElements}
          </div>
          <div className={s.messages}>
            <div>{messagesElements}</div>
          <div >
            <div>
              <textarea placeholder='Enter your message'
                        onChange={onSendMessageChange}
                        value={newMessageBody}/>
            </div>
            <div>
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dialogs;
