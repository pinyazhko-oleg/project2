const SEND_MESSAGE = 'SEND_MESSAGE';


let initialState = {
  messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'Hi is your project?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yo'},
      {id: 6, message: 'Yo'}
    ],

  dialogs: [
      {id: 1, name: 'Fry'},
      {id: 2, name: 'Leela'},
      {id: 3, name: 'Bender'},
      {id: 4, name: 'Farnsworth'},
      {id: 5, name: 'Hermes'},
      {id: 6, name: 'Zoidberg'}
    ]
};

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 7, message: body}]
      }
    default:
      return state;
  }
}

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})
// export const updateNewMessageBodyCreator = (body) => ({
//       type: UPDATE_NEW_MESSAGE_BODY, body: body})


export default dialogsReducer;
