  import {rerenderEntireTree} from '../render';

  let state = {

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
    }

    window.state = state;

    export let addPost = () => {
      let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
      };
      state.profilePage.posts.push(newPost);
      state.profilePage.newPostText = '';
      rerenderEntireTree(state);
    };

    export let updateNewPostText = (newText) => {
      state.profilePage.newPostText = newText;
      rerenderEntireTree(state);
    }



    export let addMessage = () => {
      let newMessage = {
        id: 7,
        message: state.dialogsPage.newMessageText
      };
      state.dialogsPage.messages.push(newMessage);
      state.dialogsPage.newMessageText = '';
      rerenderEntireTree(state);
    };

    export let updateNewMessageText = (newText) => {
      state.dialogsPage.newMessageText = newText;
      rerenderEntireTree(state);
    }


    export default state;
