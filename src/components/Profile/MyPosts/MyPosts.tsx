import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm, {AddPostFormValuesType} from "./AddPostForm";
import {PostType} from "../../../types/types";


export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void
    deletePost: (id: number) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  let postsElements =
      [...props.posts]
      .reverse()
      .map(p => <Post post={p.post} likesCount={p.likesCount} id={p.id} key={p.id} deletePost={props.deletePost}/>);

  let addNewPost = (values: AddPostFormValuesType) => {
    props.addPost(values.newPostText);
  };

  return (
      <div className={s.postsBlock}>
        <h3>My posts</h3>
        <AddPostForm onSubmit={addNewPost}/>
            <div className={s.posts}>
              {postsElements}
            </div>
      </div>
  );
};

const MyPostsMemorized = React.memo(MyPosts);

export default MyPostsMemorized;
