import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Typeahead from 'react-bootstrap-typeahead';
import * as searchActions from 'redux/modules/search';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

@connect(
  state => ({
    results: state.search.searchResult, // query results, class data
    instNames: state.search.instNamedResult, // high-level institution names
    instData: state.search.instDataResult // mongo doc objects containing terms & depts
  }),
  searchActions)
export default class SubmitSearchButton extends Component {
  static propTypes = {
    results: PropTypes.array, // array containing classes from search results
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
        <div className={styles.allStyles + ' container'}>
          <div className={'jumbotron ' + styles.jumbotron}>
            <h2>CUNY Course Search</h2>
          </div>
          <div className="row">
            {this.props.instNames &&
              <span className="col-md-3" id="field-institution">
                <Typeahead class="inst" labelKey="inst" onChange={this.handleInstChange}
                  options={this.props.instNames} placeholder="Select institution..." />
              </span>
            }
            {this.state.termList &&
              <span className="col-md-3" id="field-term">
                <Typeahead class="term" labelKey="Name" options={this.state.termList}
                  placeholder="Select term..." />
              </span>
            }
            {this.state.deptList &&
              <span className="col-md-3" id="field-department">
                <Typeahead class="dept" labelKey="Name" options={this.state.deptList}
                  placeholder="Select department..." />
              </span>
            }
            <span className="col-md-3">
              <button className={styles.button + ' btn btn-primary'} onClick={this.handleSubmit}>Search!</button>
            </span>
            {this.props.results &&
            <BootstrapTable data={this.props.results} striped={true}
             className={styles.bootstrapTable} hover={true} condensed={true}>
              <TableHeaderColumn dataField="title">Title</TableHeaderColumn>
              <TableHeaderColumn isKey={true} dataField="nbr">Class ID</TableHeaderColumn>
              <TableHeaderColumn dataField="time">Time</TableHeaderColumn>
              <TableHeaderColumn dataField="room">Room</TableHeaderColumn>
              <TableHeaderColumn dataField="instr">Instructor</TableHeaderColumn>
              <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
            </BootstrapTable>
            }
          </div>
        </div>
      }
      </div>
    );
  }
}
