import {InferActionsTypes} from "./redux-store";

const SEND_MESSAGE = 'DIALOGS/SEND_MESSAGE';
const REMOVE_MESSAGE = 'DIALOGS/REMOVE_MESSAGE';

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


const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, {id: 7, message: body}]
      };
      case REMOVE_MESSAGE:
          return {
              ...state,
              messages: state.messages.filter(m => m.id !== action.id)
          };
    default:
      return state;
  }
};

export const actions = {
    sendMessage: (newMessageBody: string) => ({type: SEND_MESSAGE, newMessageBody} as const),
    removeMessage: (id: number) => ({type: REMOVE_MESSAGE, id} as const)
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

export default dialogsReducer;
