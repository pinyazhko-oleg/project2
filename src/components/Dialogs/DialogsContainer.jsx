import Dialogs from './Dialogs';
import {removeMessageCreator, sendMessageCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (newMessageBody) => {
      dispatch(sendMessageCreator(newMessageBody));
    },
    removeMessage: (id) => {
      dispatch(removeMessageCreator(id));
    }
  }
}


export default compose (connect(mapStateToProps, mapDispatchToProps), withAuthRedirect) (Dialogs);
