import React from 'react';

import {
  FormattedMessage,
  FormattedDate
} from 'react-intl';

import {
  Row,
  Col,
  KeyValue,
  Accordion,
  Headline
} from '@folio/stripes/components';
import { get } from 'lodash';

class ShipmentInfo extends React.Component {

  render() {
    console.log("[ShipmentInfo] ShipmentId: " + this.props.shipment.id)
    const {id, shipment} = this.props;
    return(
      <React.Fragment>
        <b>Shipment Id</b>
        <p>{shipment.id ? shipment.id : '-'}</p>
        <Row>
          <Col xs={6}>
          <b>Shipment Method</b>
          </Col>
          <Col xs={6}>
          <b>Tracking Number</b>
          <p>{shipment.trackingNumber ? shipment.trackingNumber : '-'}</p>
          </Col>
        </Row>
        <Row>
          <b>Tracking Status</b>
          <p>{shipment.status ? shipment.status : '-'}</p>
        </Row>
        <Row>
          <Col xs={6}>
          <b>Ship Date</b>
          <p>{shipment.shipDate ? shipment.shipDate : '-'}</p>
          </Col>
          <Col xs={6}>
          <b>Received Date</b>
          <p>{shipment.receivedDate ? shipment.receivedDate : '-'}</p>
          </Col>
        </Row>
        
      </React.Fragment>
    );
  }
}
export default ShipmentInfo;