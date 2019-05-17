import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Canvas } from 'mason-library';
import ReactDataGrid from 'react-data-grid';

import { withFirebase } from '../Firebase';

class Vendors extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      columns: [
        { key: 'name', name: 'Vendor Name' },
        { key: 'notes', name: 'Vendor Notes' }
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
        />
      </div>
    ) : '';
  }
}

export default compose(
  withRouter,
  withFirebase,
)(Vendors);
