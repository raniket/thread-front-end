import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import * as jwt from 'jsonwebtoken';
import ErrorBoundary from './utils/ErrorBoundary';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Login from './components/Login';
import Register from './components/Register';
import Threads from './components/Threads';
import { getUserDetails } from './actions';

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const userId = jwt.decode(token).id;
      this.props.getUserDetails({ userId, token });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <div className=" container container-custom-css">
            <ErrorBoundary>
              <Switch>
                <Route exact path="/" render={() => (<Redirect to="/login" />)} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/threads" component={Threads} />
              </Switch>
            </ErrorBoundary>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = {
  getUserDetails: getUserDetails
};

export default connect(null, mapDispatchToProps)(App);
