import React from 'react';
import IndividualShipment from '../components/IndividualShipment/IndividualShipment';
import { stripesConnect } from '@folio/stripes/core';
import PropTypes from 'prop-types';

import { get } from 'lodash';
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
    handlers: PropTypes.object,
    resources: PropTypes.shape({
      shipment: PropTypes.object,
    }).isRequired,
  };

  static defaultProps = {
    handlers: {},
  }


  constructor(props) {
    super(props);

  }

  handleClose = () => {
    this.props.history.push(`/shipping`);
  }

  render() {
    const {handlers, resources} = this.props;
    console.log("[View Shipment] Shipment is: " + get(resources, 'shipment.records[0]'))
      return(
        <IndividualShipment
          shipmentData={{
            shipment: {
              ...get(resources,'shipment.records[0]',{}),
            },
          }}
          handlers={{
            ...handlers,
            onClose: this.handleClose,
          }}
        />
      );
  }
}
export default stripesConnect(ViewShipment);