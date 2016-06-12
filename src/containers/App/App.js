import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: () => {
    // add things here later
    return Promise.resolve(null);
  }
}])
@connect(
  state => ({results: state.search.searchResult}),
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    results: PropTypes.array // array containing classes from search results
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.results && nextProps.results) {
      // results have been populated, go to table
      this.props.pushState('/table');
    } else if (this.props.results && !nextProps.results) {
      // user wants to search again, go back to search page
      this.props.pushState('/');
    }
  }

  render() {
    const styles = require('./App.scss');

    return (
      <div className={'container ' + styles.app}>
        <div className={'jumbotron ' + styles.jumbotron}>
          <h2>CUNY Course Search</h2>
        </div>
        <Helmet {...config.app.head}/>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
