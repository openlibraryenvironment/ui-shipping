import React from 'react';
import IndividualShipment from '../components/IndividualShipment/IndividualShipment';
import { stripesConnect } from '@folio/stripes/core';
class ViewShipment extends React.Component {
  static manifest = Object.freeze({
    shipment: {
      type: 'okapi',
      path: 'rs/shipments/:{id}',
    },
    query: {},
  });

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <IndividualShipment/>

    );
  }


}
export default stripesConnect(ViewShipment);