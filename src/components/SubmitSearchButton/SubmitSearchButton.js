import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as searchActions from 'redux/modules/search';
import Typeahead from 'react-bootstrap-typeahead';

@connect(
  state => ({results: state.search.searchResult}),
  searchActions)
export default class Login extends Component {
  static propTypes = {
    query: PropTypes.func
  }

  state = {
    appIsMounted: false
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ appIsMounted: true });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const self = this;
    this.props.query().then(() => {
      console.log(self.props.results);
    });
  }

  render() {
    const {appIsMounted} = this.state;
    const styles = require('./SubmitSearchButton.scss');
    return (
      <div>
      {(appIsMounted) &&
        <div className={styles + ' container'}>
          <Helmet title="Submit Search"/>
          <h1>Submit Search</h1>
          <div>
            <form className="login-form form-inline" onSubmit={this.handleSubmit}>
              <Typeahead
                labelKey="name"
                onChange={this._handleChange}
                options={[ {id: 1, name: 'ny'}, {id: 2, name: 'nj'},
                {id: 3, name: 'al'}, {id: 4, name: 'wy'}, {id: 5, name: 'dc'}]}
              />
              <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </form>
          </div>
        </div>
      }
      </div>
    );
  }
}
