import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login('');
  }

  render() {
    const styles = require('./SubmitSearchButton.scss');
    return (
      <div className={styles + ' container'}>
        <Helmet title="Submit Search"/>
        <h1>Submit Search</h1>
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
        </div>
      </div>
    );
  }
}
