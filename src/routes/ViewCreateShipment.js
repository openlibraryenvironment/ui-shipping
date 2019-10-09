import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import ShipmentForm from '../components/ShipmentForm/ShipmentForm';

class ViewCreateShipment extends React.Component {
  static manifest = Object.freeze({
    shipments: {
      type: 'okapi',
      path: 'rs/shipments',
      fetch: false,
      shouldRefresh: () => false,
    },
    libraryValues: {
      type: 'okapi',
      path: 'rs/directoryEntry',
      shouldRefresh: () => false,
    },
  });

  static propTypes = {
    handlers: PropTypes.object,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      shipments: PropTypes.shape({
        POST: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      shipment: PropTypes.object,
      libraryValues: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }


  handleClose = () => {
    const { location } = this.props;
    this.props.history.push(`/shipping${location.search}`);
  }


  getInitialValues = () => {
    const { resources } = this.props;

    const type = get(resources, 'libraryValues.records', []).find(v => v.value === 'local') || {};

    return {
      library: library.value,
    };
  }


  handleSubmit = (shipment) => {
    const { history, location, mutator } = this.props;

    // Change the JSON string data back to JSON for directory entries
    if (shipment.shippingLibrary != null) {
      shipment.shippingLibrary = { id:shipment.shippingLibrary };
    }
    if (shipment.receivingLibrary != null) {
      shipment.receivingLibrary = { id:shipment.receivingLibrary };
    }

    console.log('Shipment passed through submit: %o', shipment);

    mutator.shipments
      .POST(shipment)
      .then(({ id }) => {
        history.push(`/shipping/${id}${location.search}`);
      });
  }


  render() {
    const { handlers, resources } = this.props;
    return (
      <ShipmentForm
        data={{
          libraryValues: get(resources, 'libraryValues.records', []),
        }}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
        }}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(ViewCreateShipment);
