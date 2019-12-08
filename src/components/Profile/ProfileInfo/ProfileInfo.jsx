import React from 'react';
import s from './ProfileInfo.module.css';


const ProfileInfo = () => {
  return (
    <div>
      <div>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrRRV2S-HAzHVIfS0EtgfIeWnej05TRN1PqWQCLW44h3NqM9UOtQ&s' alt=""/>
      </div>
      <div className={s.descriptionBlock}>
        ava + description
      </div>

    </div>
  );
}

export default ProfileInfo;
