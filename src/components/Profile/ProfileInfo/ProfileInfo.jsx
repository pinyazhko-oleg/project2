import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {

  // if (!profile){
  //   return <Preloader />
  // }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large} alt=""/>
        <div>
          Name: {profile.fullName}
        </div>
        <div>
          ID: {profile.userId}
        </div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
      </div>
    </div>
  );
}

export default ProfileInfo;
