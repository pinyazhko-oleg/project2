import React from 'react';
import {InjectedFormProps, reduxForm} from 'redux-form';
import {Input, createField, GetStringKeysType} from '../common/FormsControls/FormsControls';
import {required} from '../../utils/validators/validators';
import {connect} from 'react-redux';
import {login} from '../../redux/auth-reducer';
import {Redirect} from 'react-router-dom';
import styles from '../common/FormsControls/FormsControls.module.css';
import {AppStateType} from "../../redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit,
                                                                                                                error,
                                                                                                                captchaUrl}) => {
  return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>('Email', 'email', Input, [required])}
            {createField<LoginFormValuesTypeKeys>('Password', 'password', Input, [required], {type: 'password'})}
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', Input, [], {type: 'checkbox'}, 'remember me')}

            {captchaUrl && <img src={captchaUrl} alt="" />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from image', 'captcha', Input, [required], {})}

              {error && <div className={styles.formSummaryError}>
                {error}
              </div>
            }
            <div>
              <button>Login</button>
            </div>
        </form>
  )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'}) (LoginForm);

type MapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
type LoginFormValuesTypeKeys = GetStringKeysType<LoginFormValuesType>

const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  )
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
});

export default connect(mapStateToProps, {login})(Login);
