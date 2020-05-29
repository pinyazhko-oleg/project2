import {FormAction, stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

const ADD_POST = 'PROFILE/ADD_POST';
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE';
const SET_STATUS = 'PROFILE/SET_STATUS';
const DELETE_POST = 'PROFILE/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS';


const initialState = {
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 12},
        {id: 2, post: "It's my first post", likesCount: 11},
        {id: 3, post: "Yohoho", likesCount: 11},
        {id: 4, post: "Yoyo", likesCount: 11}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
};


const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {

        case ADD_POST:
            let newPost = {
                id: 5,
                post: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost]
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            };
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            };
        default:
            return state;
    }
};

export const actions = {
    addPostActionCreator: (newPostText: string) => ({type: 'PROFILE/ADD_POST', newPostText} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    deletePostActionCreator: (id: number) => ({type: 'PROFILE/DELETE_POST', id} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const)
};

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
};

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
        }
    } catch (error) {
        alert('Something went wrong');
    }
};

export const savePhoto = (file: File): ThunkType => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId !== null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null");
        }
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject(data.messages[0]);
    }
};

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export default profileReducer;
