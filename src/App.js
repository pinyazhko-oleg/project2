import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import {Route} from "react-router-dom";
import Login from './components/Login/Login';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {initializeApp} from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import {withSuspense} from './hoc/withSuspense';
import store from './redux/redux-store';
import {BrowserRouter, Switch, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

class App extends React.Component {

  catchAllUnhandledErrors = (reason, promise) => {
    //alert('Some error occured');
    //console.error(promiseRejectionEvent);
  }

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
        return <Preloader />
    }

    return (
            <div className='app-wrapper'>
              <HeaderContainer />
              <Navbar />
              <div className='app-wrapper-content'>
              <Switch>
                <Route exact path='/' render={() => <Redirect to={'/profile'}/>}/>
                <Route path='/dialogs' render={withSuspense(DialogsContainer)}/>
                <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)}/>
                <Route path='/users' render={() => <UsersContainer/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
              </Switch>
              </div>
            </div>
          );
    }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(withRouter, connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props) => {
  return  <BrowserRouter>
            <Provider store={store}>
              <AppContainer/>
            </Provider>
          </BrowserRouter>
}

export default MainApp;
