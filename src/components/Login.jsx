import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import FormValidator from '../utils/FormValidator';
import { userLogin, updateCurrentPath, resetLoginFailed } from '../actions';
import './Login.css';

class Login extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'you must provide valid email.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'password is required.',
      },
    ]);

    this.state = {
      email: '',
      password: '',
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.history.push('/threads')
    }
    this.props.updateCurrentPath(this.props.match.path)
  }

  handleInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handlerLogin = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submited = true;
    if (validation.isValid) {
      // handle actual form submission here
      const { email, password } = this.state;
      this.props.userLogin({ email, password });
    }
  }

  render() {
    const { logedIn, loginFailed } = this.props;
    if (logedIn === true) {
      toast.success('You are successfully loggedin! 👍');
      setTimeout(() => {
        this.props.history.push('/threads');
      }, 1500);
    }

    if (loginFailed === true) {
      toast.error("Account doesn't exists with this email id! 😬");
      this.props.resetLoginFailed();
    }

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div className="row mb-5">
        <form onSubmit={this.handlerLogin} className="col-sm-10 col-md-7 col-lg-5 text-center border border-light mt-2 p-5 mb-2  rounded cloudy-knoxville-gradient z-depth-1-half animated fadeInRightBig fast max-width" style={{ 'maxWidth': '80%' }}>
          <div className={validation.email.isInvalid.toString() && 'has-error'}>
            <input type="text" id="email" name="email" className="form-control " onChange={this.handleInputValueChange} placeholder="email" />
            <span className="help-block deep-orange-text">{validation.email.message}</span>
          </div>

          <div className={validation.password.isInvalid.toString() && 'has-error'}>
            <input type="password" id="password" name="password" onChange={this.handleInputValueChange} className="form-control mt-4" placeholder="password" />
            <span className="help-block deep-orange-text">{validation.password.message}</span>
          </div>

          <div className="row mt-4">
            <div className="col-sm-6 mt-1">
              <button className="btn btn-info btn-block " type="submit" >
                {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'LOGIN'}
              </button>
            </div>

            <div className="col-sm-6 mt-2">
              <NavLink to="/register" className="text-white">
                <button className="btn btn-info btn-block text-white" type="button">REGISTER</button>
              </NavLink>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    logedIn: state.logedIn,
    loginFailed: state.loginFailed,
  }
}

const mapDispatchToProps = {
  userLogin: userLogin,
  updateCurrentPath: updateCurrentPath,
  resetLoginFailed: resetLoginFailed,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);