import React from 'react';
import Dialogs from './Dialogs';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import StoreContext from '../../StoreContext';

const DialogsContainer = () => {


  return <StoreContext.Consumer>
      { store => {

        let state = store.getState().dialogsPage;

        let sendMessage = () => {
            store.dispatch(sendMessageCreator());
        }

        let onSendMessageChange = (body) => {
            store.dispatch(updateNewMessageBodyCreator(body));
        }

      return <Dialogs updateNewMessageBody={onSendMessageChange}
               sendMessage={sendMessage}
               dialogsPage={state}/>
             }
          }
    </StoreContext.Consumer>
}

export default DialogsContainer;
