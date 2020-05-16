import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {
    //debugger

  return (
      <div className={s.dialog}>
        <img src=
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSdUHF2hGGO8Th-nwNxuNNIxAxKchtBoaGkvtCwfC_vIOCaxHoH'
        alt=''/>
        {props.message}
        <div>
            <button onClick={() => {props.removeMessage(props.id)}}>Remove</button>
        </div>
      </div>
  )
}

export default Message;
