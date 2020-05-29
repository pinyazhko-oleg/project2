import React from 'react';
import s from './Post.module.css';

type PropsType = {
    post: string
    id: number
    likesCount: number
    deletePost: (id: number) => void
}

const Post: React.FC<PropsType> = (props) => {
    let removePost = () => {
        props.deletePost(props.id)
    };
    return (
        <div className={s.item}>
            <img src=
                     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCuPNTOg7KwZrY6aH2ztY9CkaoSoVv6CYboPjM807877kp7wUCig&s'
                 alt=''/>
            {props.post}
            <div>
                <div>like{props.likesCount}</div>
                <div>id{props.id}</div>
                <button onClick={removePost}>Remove</button>
            </div>
        </div>
    )
};

export default Post;
