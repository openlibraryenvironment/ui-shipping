import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';

import ShipmentForm from '../components/ShipmentForm/ShipmentForm';


class ViewEditShipment extends React.Component {
  static manifest = Object.freeze({
    shipment: {
      type: 'okapi',
      path: 'rs/shipments/:{id}',
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
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    mutator: PropTypes.shape({
      shipment: PropTypes.shape({
        PUT: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired,
    resources: PropTypes.shape({
      shipment: PropTypes.object,
      typeValues: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
  }

  handleClose = () => {
    const { location, match } = this.props;
    this.props.history.push(`/shipping/${match.params.id}${location.search}`);
  }

  handleSubmit = (shipment) => {
    this.props.mutator.shipment
      .PUT(shipment)
      .then(this.handleClose);
  }

  fetchIsPending = () => {
    return Object.values(this.props.resources)
      .filter(resource => resource)
      .some(resource => resource.isPending);
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
        isLoading={this.fetchIsPending()}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default stripesConnect(ViewEditShipment);
