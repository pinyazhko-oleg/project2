const SEND_MESSAGE = 'SEND_MESSAGE';
const REMOVE_MESSAGE = 'REMOVE MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

const initialState = {
  messages: [
      {id: 1, message: 'Hi'},
      {id: 2, message: 'Hi is your project?'},
      {id: 3, message: 'Yo'},
      {id: 4, message: 'Yo'},
      {id: 5, message: 'Yo'},
      {id: 6, message: 'Yo'}
    ] as Array<MessageType>,

  dialogs: [
      {id: 1, name: 'Fry'},
      {id: 2, name: 'Leela'},
      {id: 3, name: 'Bender'},
      {id: 4, name: 'Farnsworth'},
      {id: 5, name: 'Hermes'},
      {id: 6, name: 'Zoidberg'}
    ] as Array<DialogType>
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 7, message: body}]
      }
      case REMOVE_MESSAGE:
          return {
              ...state,
              messages: state.messages.filter(m => m.id !== action.id)
          }
    default:
      return state;
  }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE,
                                                                                                newMessageBody});
type RemoveMessageCreatorActionType = {
    type: typeof REMOVE_MESSAGE
    id: number
}

export const removeMessageCreator = (id: number): RemoveMessageCreatorActionType => ({type: REMOVE_MESSAGE, id});
// export const updateNewMessageBodyCreator = (body) => ({
//       type: UPDATE_NEW_MESSAGE_BODY, body: body})


export default dialogsReducer;
