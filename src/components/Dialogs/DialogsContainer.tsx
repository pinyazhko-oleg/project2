import Dialogs from './Dialogs';
import {actions} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from "../../redux/redux-store";
import {ComponentType} from "react";


let mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage
  }
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (newMessageBody) => {
//       dispatch(actions.sendMessage(newMessageBody));
//     },
//     removeMessage: (id) => {
//       dispatch(actions.removeMessage(id));
//     }
//   }
// }

export default compose<ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect) (Dialogs);
