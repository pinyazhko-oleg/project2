import {usersAPI} from '../api/api';
import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from "../types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
  users: [ ] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> //array of users ids
};
type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {

  switch (action.type) {
    case FOLLOW:
        return {
          ...state,
          users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
          // users: state.users.map(u => {
          //   if (u.id === action.userId) {
          //   return {...u, followed: true}
          //   }
          //   return u;
          // })
        }
    case UNFOLLOW:
    return {
      ...state,
      users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      // users: state.users.map(u => {
      //   if (u.id === action.userId) {
      //   return {...u, followed: false}
      //   }
      //   return u;
      // })
    }
    case SET_USERS: {
        return {...state, users: action.users}
    }
    case SET_CURRENT_PAGE: {
        return {...state, currentPage: action.currentPage}
    }
    case SET_TOTAL_USERS_COUNT: {
        return {...state, totalUsersCount: action.count}
    }
    case TOGGLE_IS_FETCHING: {
        return {...state, isFetching: action.isFetching}
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
        return {...state,
                followingInProgress: action.isFetching
                ? [...state.followingInProgress, action.userId]
                : state.followingInProgress.filter(id => id !== action.userId)
              }
    }
    default:
        return state;

  }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => ({type: FOLLOW, userId})

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({type: UNFOLLOW, userId})

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({type: SET_USERS, users})

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage})

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({type: SET_TOTAL_USERS_COUNT,
                                                                                                count: totalUsersCount})

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({type: TOGGLE_IS_FETCHING,
                                                                                                isFetching})

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS,
                                                                                        isFetching,
                                                                                        userId})

export const requestUsers = (currentPage: number, pageSize: number) => {
  return async (dispatch: any) => {
      dispatch(toggleIsFetching(true));
      let data = await usersAPI.getUsers(currentPage, pageSize);
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));

  }
}

const followUnfollowFlow = async (dispatch: any, userId: number, actionCreator: any, apiMethod: any) => {
  dispatch(toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = followSuccess;
    followUnfollowFlow(dispatch, userId, actionCreator, apiMethod);
  }
}

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = unfollowSuccess;
    followUnfollowFlow(dispatch, userId, actionCreator, apiMethod);
  }
}

export default usersReducer;
