import React, {ComponentType} from 'react';
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
import store, {AppStateType} from './redux/redux-store';
import {BrowserRouter, Switch, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<MapPropsType & DispatchPropsType> {

  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    //alert('Some error occurred');
    //console.error(promiseRejectionEvent);
  };

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
                <Route path='/dialogs' render={() => <SuspendedDialogs/>}/>
                <Route path='/profile/:userId?' render={() => <SuspendedProfile/>}/>
                <Route path='/users' render={() => <UsersContainer pageTitle={'Users'}/>}/>
                <Route path='/login' render={() => <Login/>}/>
                <Route path='*' render={() => <div>404 NOT FOUND</div>}/>
              </Switch>
              </div>
            </div>
          );
    }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
});

const AppContainer = compose<ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp}))(App);

const MainApp: React.FC = () => {
  return  <BrowserRouter>
            <Provider store={store}>
              <AppContainer/>
            </Provider>
          </BrowserRouter>
};

export default MainApp;
