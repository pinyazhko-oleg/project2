import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
  return (
      <div className={s.item}>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCuPNTOg7KwZrY6aH2ztY9CkaoSoVv6CYboPjM807877kp7wUCig&s' alt=''/>
        {props.message}
        <div>
          <span>like{props.likesCount}</span>
        </div>
      </div>
  );
}

export default Post;
