import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as searchActions from 'redux/modules/search';

@connect(
  state => ({user: state.auth.user}),
  searchActions)
export default class Login extends Component {
  static propTypes = {
    search: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('working');
    this.props.search('');
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
