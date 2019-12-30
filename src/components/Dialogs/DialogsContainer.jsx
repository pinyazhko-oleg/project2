import Dialogs from './Dialogs';
import {sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    sendMessage: () => {
      dispatch(sendMessageCreator());
    }
  }
}

const dialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default dialogsContainer;
