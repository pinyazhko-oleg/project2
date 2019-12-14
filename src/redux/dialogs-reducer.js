const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

const dialogsReducer = (state, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let newMessage = {
        id: 7,
        message: state.newMessageBody
      };
      state.messages.push(newMessage);
      state.newMessageBody = '';
      return state;
    case UPDATE_NEW_MESSAGE_BODY:
      state.newMessageBody = action.body;
      return state;
    default:
      return state;
  }
}

export const sendMessageCreator = () => ({type: 'SEND-MESSAGE'})
export const updateNewMessageBodyCreator = (body) => ({
      type: 'UPDATE-NEW-MESSAGE-BODY', body: body})


export default dialogsReducer;
