import React, {FC} from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    users: Array<UserType>
    followingInProgress: Array<number>

    onPageChanged: (pageNumber: number) => void
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

  return <div>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       totalItemsCount={totalUsersCount}
                       pageSize={pageSize}/>
          <div>
            {
              users.map(u => <User user={u}
                                   key={u.id}
                                   followingInProgress={props.followingInProgress}
                                   unfollow={props.unfollow}
                                   follow={props.follow}/>)

            }
          </div>
        </div>
      }

      export default Users;
