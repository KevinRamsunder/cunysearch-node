import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Typeahead from 'react-bootstrap-typeahead';
import * as searchActions from 'redux/modules/search';

@connect(
  state => ({
    results: state.search.searchResult, // query results, class data
    instNames: state.search.instNamedResult, // high-level institution names
    instData: state.search.instDataResult // mongo doc objects containing terms & depts
  }),
  searchActions)
export default class SubmitSearchButton extends Component {
  static propTypes = {
    query: PropTypes.func, // submit search to cuny servers
    getInsts: PropTypes.func, // function to get list of insts
    instNames: PropTypes.array, // array of institution names
    instData: PropTypes.array // array of mongo doc objs
  }

  // container level state
  state = {
    appIsMounted: false,
    selectedInstitution: undefined,
    termList: undefined,
    deptList: undefined
  }

  // fire once container is mounted
  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ appIsMounted: true }); // app is mounted
      this.props.getInsts(); // start async task to get inst list
    });
  }

  // get user input and submit to action creator
  handleSubmit = (event) => {
    event.preventDefault();
    const inst = document.querySelector('#field-institution > div > div > input').selected;
    const term = document.querySelector('#field-term > div > div > input').selected;
    const dept = document.querySelector('#field-department > div > div > input').selected;
    this.props.query(inst, term, dept);
  }

  // update term and dept based on currently selected institution
  handleInstChange = (option) => {
    this.setState({ termList: null });
    this.setState({ deptList: null });

    if (option.length !== 0) {
      // index of current institution
      const selectedInst = option[0].index;

      // set options for term and dept select inputs
      this.setState({ termList: this.props.instData[selectedInst].term });
      this.setState({ deptList: this.props.instData[selectedInst].department });
    }
  }

  render() {
    const {appIsMounted} = this.state;
    const styles = require('./SubmitSearchButton.scss');
    return (
      <div>
      {/* Only display select inputs if app is mounted */}
      {(appIsMounted) &&
        <div className={styles + ' container'}>
          <Helmet title="Submit Search"/>
          <h1>Submit Search</h1>
          <div>
            {this.props.instNames &&
              <div id="field-institution">
                <Typeahead class="inst" labelKey="inst" onChange={this.handleInstChange}
                  options={this.props.instNames} placeholder="Select institution..." />
              </div>
            }
            {this.state.termList &&
              <div id="field-term">
                <Typeahead class="term" labelKey="Name" options={this.state.termList}
                  placeholder="Select term..." />
              </div>
            }
            {this.state.deptList &&
              <div id="field-department">
                <Typeahead class="dept" labelKey="Name" options={this.state.deptList}
                  placeholder="Select department..." />
              </div>
            }
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </div>
        </div>
      }
      </div>
    );
  }
}
