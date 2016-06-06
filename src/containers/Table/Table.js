import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as searchActions from 'redux/modules/search';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

@connect(
  state => ({
    results: state.search.searchResult // query results, class data
  }),
  searchActions)
export default class Table extends Component {
  static propTypes = {
    results: PropTypes.array // array containing classes from search results
  }

  render() {
    const styles = require('./Table.scss');
    return (
      <div className={styles.allStyles}>
      {this.props.results &&
        <div className={styles.spacedTable}>
          <BootstrapTable data={this.props.results} striped={true} hover={true} condensed={true}>
            <TableHeaderColumn dataField="title">Title</TableHeaderColumn>
            <TableHeaderColumn isKey={true} dataField="nbr">Class ID</TableHeaderColumn>
            <TableHeaderColumn dataField="time">Time</TableHeaderColumn>
            <TableHeaderColumn dataField="room">Room</TableHeaderColumn>
            <TableHeaderColumn dataField="instr">Instructor</TableHeaderColumn>
            <TableHeaderColumn dataField="status">Status</TableHeaderColumn>
          </BootstrapTable>
        </div>
      }
      </div>
    );
  }
}
