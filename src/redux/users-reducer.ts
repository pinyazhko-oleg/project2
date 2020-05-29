import {updateObjectInArray} from '../utils/object-helpers';
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../api/users-api";

const FOLLOW = 'USERS/FOLLOW';
const UNFOLLOW = 'USERS/UNFOLLOW';
const SET_USERS = 'USERS/SET_USERS';
const SET_CURRENT_PAGE = 'USERS/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'USERS/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'USERS/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS';


let initialState = {
  users: [ ] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number> //array of users ids
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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
        };
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
    };
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
};

export const actions = {
    followSuccess: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'USERS/TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId} as const)
};

export const requestUsers = (currentPage: number,
                             pageSize: number): ThunkType => {
  return async (dispatch) => {
      dispatch(actions.setCurrentPage(currentPage));

      let data = await usersAPI.getUsers(currentPage, pageSize);
      dispatch(actions.toggleIsFetching(false));
      dispatch(actions.setUsers(data.items));
      dispatch(actions.setTotalUsersCount(data.totalCount));
  }
};

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userId: number,
                                   actionCreator: (userId: number) => ActionsTypes,
                                   apiMethod: any) => {
  dispatch(actions.toggleFollowingProgress(true, userId));
  let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = actions.followSuccess;
    _followUnfollowFlow(dispatch, userId, actionCreator, apiMethod);
  }
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = actions.unfollowSuccess;
    _followUnfollowFlow(dispatch, userId, actionCreator, apiMethod);
  }
};

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer;
