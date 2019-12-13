  const ADD_POST = 'ADD-POST';
  const UPDATE_NEW_POST_TEXT= 'UPDATE-NEW-POST-TEXT';

  let store = {
    _state: {
      profilePage: {
        posts: [
            {id: 1, message:'Hi, how are you?', likesCount:'12'},
            {id: 2, message: "It's my first post", likesCount:'11'},
            {id: 3, message: "Yohoho", likesCount:'11'},
            {id: 4, message: "Yoyo", likesCount:'11'}
          ],
        newPostText: 'ggggggg'
        },
      dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Hi is your project?'},
            {id: 3, message: 'Yo'},
            {id: 4, message: 'Yo'},
            {id: 5, message: 'Yo'},
            {id: 6, message: 'Yo'}
          ],
        newMessageText: 'oooooo',

        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andriy'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Valera'}
          ]
        }
      },
    _callSubscriber() {
        console.log('State changed');
      },

    getState(){
      return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
      },

    dispatch(action) {
      if (action.type === 'ADD-POST') {
        let newPost = {
          id: 5,
          message: this._state.profilePage.newPostText,
          likesCount: 0
        };
        this._state.profilePage.posts.push(newPost);
        this._state.profilePage.newPostText = '';
        this._callSubscriber(this._state);
      } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
        this._state.profilePage.newPostText = action.newText;
        this._callSubscriber(this._state);
      } else if (action.type === 'ADD-MESSAGE') {
        let newMessage = {
          id: 7,
          message: this._state.dialogsPage.newMessageText
        };
        this._state.dialogsPage.messages.push(newMessage);
        this._state.dialogsPage.newMessageText = '';
        this._callSubscriber(this._state);
      } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
        this._state.dialogsPage.newMessageText = action.newText;
        this._callSubscriber(this._state);
      }
    }
  }

  export const addPostActionCreator = () => ({type: 'ADD-POST'})

  export const updateNewPostTextActionCreator = (text) => ({
        type: 'UPDATE-NEW-POST-TEXT', newText: text})

    export default store;

    window.store = store;
