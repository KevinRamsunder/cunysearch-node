import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import Typeahead from 'react-bootstrap-typeahead';
import * as searchActions from 'redux/modules/search';

@connect(
  state => ({
    results: state.search.searchResult,
    instNames: state.search.instNamedResult,
    instData: state.search.instDataResult
  }),
  searchActions)
export default class SubmitSearchButton extends Component {
  static propTypes = {
    query: PropTypes.func,
    getInsts: PropTypes.func,
    instNames: PropTypes.array,
    instData: PropTypes.array
  }

  state = {
    appIsMounted: false,
    selectedInstitution: undefined,
    termList: undefined,
    deptList: undefined
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ appIsMounted: true });
      this.props.getInsts().then(function(response) {
        const institutions = [];
        const instKeys = [];

        response[0].map((el, index) => {
          institutions[index] = el.inst;
          instKeys[index] = el.index;
        });
      });
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(document.querySelector('#field-institution > div > div > input').selected);
    console.log(document.querySelector('#field-term > div > div > input').selected);
    console.log(document.querySelector('#field-department > div > div > input').selected);
    this.props.query();
  }

  handleInstChange = (option) => {
    this.setState({ termList: null });
    this.setState({ deptList: null });

    if (option.length !== 0) {
      this.setState({ selectedInstitution: option[0].index });
      this.updateTerms(option[0].index);
      this.updateDepts(option[0].index);
    }
  }

  updateTerms = (selectedInst) => {
    const terms = [];

    this.props.instData[selectedInst].term.map((el) => {
      terms.push({term: el.Name, htmlKey: el.HtmlKey});
    });

    this.setState({ termList: terms });
  }

  updateDepts = (selectedInst) => {
    const depts = [];

    this.props.instData[selectedInst].department.map((el) => {
      depts.push({dept: el.Name, htmlKey: el.HtmlKey});
    });

    this.setState({ deptList: depts });
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
              {this.props.instNames &&
                <div id="field-institution">
                  <Typeahead
                    class="inst"
                    labelKey="inst"
                    onChange={this.handleInstChange}
                    options={this.props.instNames}
                    placeholder="Select institution..."
                  />
                </div>
              }
              {this.state.termList &&
                <div id="field-term">
                  <Typeahead
                    class="term"
                    labelKey="term"
                    options={this.state.termList}
                    placeholder="Select term..."
                  />
                </div>
              }
              {this.state.deptList &&
                <div id="field-department">
                  <Typeahead
                    class="dept"
                    labelKey="dept"
                    options={this.state.deptList}
                    placeholder="Select department..."
                  />
                </div>
              }
              <button className="btn btn-success"><i className="fa fa-sign-in"/>{' '}Log In
              </button>
            </form>
          </div>
        </div>
      }
      {(!appIsMounted) &&
        <div></div>
      }
      </div>
    );
  }
}
