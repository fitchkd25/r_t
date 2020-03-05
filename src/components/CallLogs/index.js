import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import ReactDataGrid from 'react-data-grid';

import { withFirebase } from '../Firebase';

class CallLogs extends Component {

    constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        { key: 'objective', name: 'Objective', sortable: true, editable: true, resizable: true },
        { key: 'customer', name: 'Customer', sortable: true, editable: true, resizable: true },
        { key: 'takeaways', name: 'Key take-aways', editable: true }
      ],
      rows: []
    }
    }

  componentDidMount() {

    this.props.firebase
      .callLogs()
      .then((querySnapshot) => {
        let rows = [];
        querySnapshot.forEach(function (doc) {
          rows.push({
            id: doc.id,
            objective: doc.data().objective,
            customer: doc.data().customer,
            takeaways: doc.data().takeaways,
          });
        });
        this.setState({
          isLoading: false, 
          rows: rows
        }) 
      })
      .catch(error => {
        console.log(error);
      });

  }


  
  render() {
    return !this.state.isLoading ? (
      <div className="callLogs-page">
        <ReactDataGrid
          columns={this.state.columns}
          rowGetter={i => this.state.rows[i]}
          rowsCount={this.state.rows.length}
          enableCellAutoFocus={false}
          headerRowHeight={35}
          minHeight={500}
          enableCellSelect={true}
          onGridRowsUpdated={this.onGridRowsUpdated}
          onGridSort={(sortColumn, sortDirection) =>
            this.sortRows(this.state.rows, sortColumn, sortDirection)
          }
        />
      </div>
    ) : '';
  }

  idCompare(a, b) {
    // Use toUpperCase() to ignore character casing
    const idA = a.id;
    const idB = b.id;
  
    let comparison = 0;
    if (idA > idB) {
      comparison = -1;
    } else if (idA < idB) {
      comparison = 1;
    }
    return comparison;
  }

  
  nameCompare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = -1;
    } else if (nameA < nameB) {
      comparison = 1;
    }
    return comparison;
  }

  reverseNameCompare(a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
  
    let comparison = 0;
    if (nameA > nameB) {
      comparison = 1;
    } else if (nameA < nameB) {
      comparison = -1;
    }
    return comparison;
  }

  sortRows(initialRows, sortColumn, sortDirection) {
    switch(sortDirection) {
      case 'ASC':
        initialRows.sort(this.nameCompare);
        break;
      case 'DESC':
        initialRows.sort(this.reverseNameCompare);
        break;
      default:
        initialRows.sort(this.idCompare);
    }
  }

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
        this.updateRow(rows[i])
      }
      return { rows };
    });
  };

  updateRow(data)
  {
    this.props.firebase
      .doUpdateCallLog(data)
      .catch(error => {
        this.setState({ error: error.message })
      });
  }


}

export default compose(
  withRouter,
  withFirebase,
)(CallLogs);