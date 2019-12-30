import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
  return (
    <div>
      <div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrRRV2S-HAzHVIfS0EtgfIeWnej05TRN1PqWQCLW44h3NqM9UOtQ&s' alt=""/>
      </div>
      <div className={s.descriptionBlock}>
        <img src={props.profile.photos.large} alt=""/>
        <div>
          Name: {props.profile.fullName}
        </div>
        <div>
          ID: {props.profile.userId}
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
