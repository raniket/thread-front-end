import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import FormValidator from '../utils/FormValidator';
import { userSignup, resetSignedUp, updateCurrentPath } from '../actions';
import './Register.css';

class Register extends Component {
  constructor() {
    super();
    this.validator = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'first name is required.',
      },
      {
        field: 'firstName',
        method: 'isLength',
        args: [{ min: 1, max: 100 }],
        validWhen: true,
        message: 'fist name must be between 1 - 100 charachers',
      },
      {
        field: 'lastName',
        method: 'isLength',
        args: [{ min: 0, max: 100 }],
        validWhen: true,
        message: 'middle name must be between 1 - 100 charachers',
      },
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      validation: this.validator.valid(),
    }

    this.submited = false;
  }

  componentDidMount() {
    this.props.updateCurrentPath(this.props.match.path)
  }

  handleInputValueChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSighup = (event) => {
    event.preventDefault();
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submited = true;
    if (validation.isValid) {
      // handle actual form submission here
      const { firstName, lastName, email, password } = this.state;
      this.props.userSignup({ firstName, lastName, email, password });
    }
  }

  render() {
    const { signedUp } = this.props;
    if (signedUp === true) {
      toast.success('Your account is created successfully! 👍');
      setTimeout(() => {
        this.props.history.push('/login');
        this.props.resetSignedUp();
      }, 1500);
    }

    let validation = this.submited ? this.validator.validate(this.state) : this.state.validation;

    return (
      <div className="row">
        <form onSubmit={this.handleSighup} className="col-sm-10 col-md-8 col-lg-6 text-center border border-light mt-2 mb-2 p-5  rounded cloudy-knoxville-gradient z-depth-1-half animated fadeInRightBig fast max-width" style={{maxWidth: '90%'}}>

          <div className={validation.firstName.isInvalid.toString() && 'has-error'}>
            <input type="text" id="firstName" name="firstName" className="form-control " onChange={this.handleInputValueChange} placeholder="First name" />
            <span className="help-block deep-orange-text">{validation.firstName.message}</span>
          </div>

          <div className={validation.lastName.isInvalid.toString() && 'has-error'}>
            <input type="text" id="lastName" name="lastName" className="form-control mt-4" onChange={this.handleInputValueChange} placeholder="Last name" />
            <span className="help-block deep-orange-text">{validation.lastName.message}</span>
          </div>

          <div className={validation.email.isInvalid.toString() && 'has-error'}>
            <input type="text" id="email" name="email" className="form-control mt-4" onChange={this.handleInputValueChange} placeholder="email" />
            <span className="help-block deep-orange-text">{validation.email.message}</span>
          </div>

          <div className={validation.password.isInvalid.toString() && 'has-error'}>
            <input type="password" id="password" name="password" onChange={this.handleInputValueChange} className="form-control mt-4" placeholder="password" />
            <span className="help-block deep-orange-text">{validation.password.message}</span>
          </div>

          <button className="btn btn-info btn-block mt-4" type="submit" >
            {(this.props.loading === true) ? <i className="fas fa-circle-notch fa-spin"></i> : 'REGISTER'}
          </button>
          <br />
          <p>Already have an account? <NavLink to="/login">Login here</NavLink></p>
        </form>
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loading: state.loading,
    signedUp: state.signedUp
  }
}

const mapDispatchToProps = {
  userSignup: userSignup,
  resetSignedUp: resetSignedUp,
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);