import React, { Component, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Canvas } from '@mason-api/react-sdk';
import ReactDataGrid from 'react-data-grid';

import { withFirebase } from '../Firebase';

class Vendors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        { key: 'id', name: 'Id', sortable: false, resizable: true },
        { key: 'name', name: 'Vendor Name', sortable: true, editable: true, resizable: true },
        { key: 'notes', name: 'Vendor Notes', editable: true, resizable: true }
      ],
      rows: []
    }
  }

  componentDidMount() {

    this.props.firebase
      .vendors()
      .then((querySnapshot) => {
        let rows = [];
        querySnapshot.forEach(function (doc) {
          rows.push({
            id: doc.id,
            name: doc.data().name,
            notes: doc.data().notes,
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
      <div className="vendors-page">
        <Canvas
          id="5cde7bfd22117d000396d8bd"
        />
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
          onColumnResize={null}
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
    if(data.notes == null) {
      data.notes = '';
    }
    this.props.firebase
      .doUpdateVendor(data)
      .catch(error => {
        this.setState({ error: error.message })
      });
  }


}

export default compose(
  withRouter,
  withFirebase,
)(Vendors);