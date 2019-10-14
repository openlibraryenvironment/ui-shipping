import React from 'react';
import { stripesConnect } from '@folio/stripes/core';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import IndividualShipment from '../components/IndividualShipment/IndividualShipment';

class ViewShipment extends React.Component {
  static manifest = Object.freeze({
    interfaces: {
      type: 'okapi',
      path: 'organizations-storage/interfaces',
      records: 'interfaces',
      accumulate: true,
      fetch: false,
    },
    shipment: {
      type: 'okapi',
      path: 'rs/shipments/:{id}',
    },
    query: {},
  });

  static propTypes = {
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    handlers: PropTypes.object,
    resources: PropTypes.shape({
      shipment: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
  }

  urls = {
    edit: (() => `${this.props.location.pathname}/edit${this.props.location.search}`)
  }

  handleClose = () => {
    this.props.history.push('/shipping');
  }

  render() {
    const { handlers, resources } = this.props;
    return (
      <IndividualShipment
        shipmentData={{
          shipment: {
            ...get(resources, 'shipment.records[0]', {}),
          },
        }}
        handlers={{
          ...handlers,
          onClose: this.handleClose,
          text: 'Some text'
        }}
        isLoading={get(resources, 'shipment.isPending', true)}
        urls={this.urls}
      />
    );
  }
}
export default stripesConnect(ViewShipment);
