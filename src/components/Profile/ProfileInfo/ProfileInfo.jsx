import React from 'react';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {

  if (!profile){
    return <Preloader />
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} alt=""/>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
        <div>
          Name: {profile.fullName}
        </div>
        <div>
          ID: {profile.userId}
        </div>
        <ProfileStatusWithHooks status={status}
                                updateStatus={updateStatus}
                                isOwner={isOwner}/>
      </div>
    </div>
  );
}

export default ProfileInfo;
