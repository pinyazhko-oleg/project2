import React from 'react';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../common/Preloader/Preloader';

const Profile = (props) => {

  if (!props.profile) {
    return <Preloader />
  }

  return (
    <div>
      <ProfileInfo  profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                    savePhoto={props.savePhoto}/>
      <MyPostsContainer />
    </div>
  );
}

export default Profile;
