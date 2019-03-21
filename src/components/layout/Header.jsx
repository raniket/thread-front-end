import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../../actions/';
import './Header.css';

class Header extends Component {
  state = {}

  render() {

    const { user } = this.props;
    
    return (
      <nav className="blue-gradient animated fadeIn fast header-background mb-1 navbar navbar-expand-lg navbar-dark info-color">
        {(user.firstName) ? <span className="navbar-toggler-icon mr-4 mr-sm-5"></span> : <span></span>}
        <span className="navbar-brand ml-4">Dcoder</span>
        <span className="ml-auto text-white mr-4 mr-sm-5">{(user.firstName) ? `Hello ${user.firstName}!` : `Login/Register`}</span>
      </nav>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentPath: state.currentPath,
    user: state.user || {}
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
