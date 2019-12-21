const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';

let initialState = {
  messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'Hi is your project?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yo'},
      {id: 6, message: 'Yo'}
    ],
  newMessageBody: '',

  dialogs: [
      {id: 1, name: 'Dimych'},
      {id: 2, name: 'Andriy'},
      {id: 3, name: 'Sveta'},
      {id: 4, name: 'Sasha'},
      {id: 5, name: 'Viktor'},
      {id: 6, name: 'Valera'}
    ]
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, {id: 7, message: body}]
      }
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body
      }
    default:
      return state;
  }
}

export const sendMessageCreator = () => ({type: 'SEND-MESSAGE'})
export const updateNewMessageBodyCreator = (body) => ({
      type: 'UPDATE-NEW-MESSAGE-BODY', body: body})


export default dialogsReducer;
