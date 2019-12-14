import React from 'react';
import s from './Dialogs.module.css';
import {NavLink} from 'react-router-dom';
import DialogItem from './../Dialogs/DialogItem/DialogItem';
import Message from './../Dialogs/Message/Message';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';

const Dialogs = (props) => {

  let state = props.store.getState().dialogsPage;

  let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
  let messagesElements = props.dialogsPage.messages.map(m => <Message message={m.message} />);
  let newMessageBody = state.newMessageBody;

  //let newMessageElement = React.createRef();

  // let addMessage = () => {
  //   //props.addMessage();
  //   props.dispatch({type: 'ADD-MESSAGE'});
  // }
    let addMessage = () => {
      props.store.dispatch(sendMessageCreator());
    }

  // let onMessageChange = () => {
  //   let text = newMessageElement.current.value;
  //   //props.updateNewMessageText(text);
  //   props.dispatch({type: 'UPDATE-NEW-MESSAGE-TEXT', newText: text});
  // }
  let onMessageChange = (e) => {
    let body = e.target.value;
    props.store.dispatch(updateNewMessageBodyCreator(body));
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
                        onChange={onMessageChange}
                        value={newMessageBody}/>
            </div>
            <div>
              <button onClick={addMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Dialogs;
