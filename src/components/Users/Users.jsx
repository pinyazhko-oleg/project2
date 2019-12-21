import React from 'react';
import styles from './users.module.css'

let Users = (props) => {
  if (props.users.length === 0) {
  props.setUsers (
    [
      { id: 1,
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzrbLOhZLKXFdU9YjpUzQ5F6yXEtBKGqSopAbV6Ef5bqc1oxnX',
        followed: false,
        fullName: 'Fry',
        status: 'boss',
        location: {city: 'Lviv', country: 'Ukraine'} },
      { id: 2,
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzrbLOhZLKXFdU9YjpUzQ5F6yXEtBKGqSopAbV6Ef5bqc1oxnX',
        followed: true,
        fullName: 'Andriy',
        status: 'boss',
        location: {city: 'Krakow', country: 'Poland'} },
      { id: 3,
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSzrbLOhZLKXFdU9YjpUzQ5F6yXEtBKGqSopAbV6Ef5bqc1oxnX',
        followed: false,
        fullName: 'Igor',
        status: 'boss',
        location: {city: 'Minsk', country: 'Belarus'} },
    ]
  );
}

  return <div>
      {
        props.users.map(u => <div key={u.id}>
          <span>
            <div>
              <img src={u.photoUrl} className={styles.userPhoto}/>
            </div>
            <div>
              {u.followed
                ? <button onClick={() => {props.unfollow(u.id)}}>Unfollow</button>
                : <button onClick={() => {props.follow(u.id)}}>Follow</button>}
            </div>
          </span>
          <span>
            <span>
              <div>{u.fullName}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{u.location.country}</div>
              <div>{u.location.city}</div>
            </span>
          </span>

    </div>)
  }
  </div>
}

export default Users;
