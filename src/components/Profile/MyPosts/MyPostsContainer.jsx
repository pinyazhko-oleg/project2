import MyPosts from './MyPosts';
import {addPostActionCreator, deletePostActionCreator} from '../../../redux/profile-reducer';
import {connect} from 'react-redux';


let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (newPostText) => {
      dispatch(addPostActionCreator(newPostText));
    },
    deletePost: (id) => {
      dispatch(deletePostActionCreator(id));
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
