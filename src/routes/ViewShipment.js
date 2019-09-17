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
/*     this.state = {
      showPane: true,
    } */
  }



  handleClose = () => {
    /* this.setState({showPane: false}); */
    this.props.history.push(`/shipping${this.props.location.search}`);
  }

  render() {
    const {handlers} = this.props;
      return(
        <IndividualShipment
          handlers={{
            ...handlers,
            onClose: this.handleClose,
          }}
        />
      );
  }


}
export default stripesConnect(ViewShipment);