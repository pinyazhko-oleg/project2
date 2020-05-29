import MyPosts, {DispatchPropsType, MapPropsType} from './MyPosts';
import {actions} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';
import {AppStateType} from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts
  }
};

/*let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(actions.addPostActionCreator(newPostText));
    },
    deletePost: (id) => {
      dispatch(actions.deletePostActionCreator(id));
    }
  }
}*/

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
  deletePost: actions.deletePostActionCreator})(MyPosts);

export default MyPostsContainer;
