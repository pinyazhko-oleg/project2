import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';

const MyPosts = (props) => {

  let postsElements =
      props.posts.map(p => <Post post={p.post} likesCount={p.likesCount} key={p.id}/>);

  let addNewPost = (values) => {
    props.addPost(values.newPostText);
  }

  return (
      <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddPostFormRedux onSubmit={addNewPost}/>
            <div className={s.posts}>
              {postsElements}
            </div>
      </div>
  );
}

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field component='textarea' name='newPostText' placeholder='Enter your post' />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const AddPostFormRedux = reduxForm({form: 'addPostForm'}) (AddPostForm)

export default MyPosts;
