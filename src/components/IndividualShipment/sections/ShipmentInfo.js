import React from 'react';

import {
  FormattedMessage,
  FormattedDate
} from 'react-intl';

import {
  Row,
  Card,
  Col,
  KeyValue,
  Accordion,
  Headline
} from '@folio/stripes/components';
import { get } from 'lodash';

import FormattedUTCDate from '../../FormattedUTCDate';

class ShipmentInfo extends React.Component {

  render() {
    const {id, shipment} = this.props;
    return(
      <React.Fragment>
        <b>Shipment Id</b>
        <p>{shipment.id ? shipment.id : 'Shipment Id Missing'}</p>
        <Row>
          <Col xs={6}>
          <b>Shipment Method</b>
          <p>{shipment.shippingMethod ? shipment.shippingMethod : 'Shipment Method Missing'}</p>
          </Col>
          <Col xs={6}>
          <b>Tracking Number</b>
          <p>{shipment.trackingNumber ? shipment.trackingNumber : 'Shipment Tracking Number Missing'}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <b>Tracking Status</b>
            <p>{shipment.status ? shipment.status : 'Shipment Status Missing'}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <b>Ship Date</b>
          <p>{shipment.shipDate ? <FormattedUTCDate value={shipment.shipDate} /> : 'Shipment Ship Date Missing'}</p>
          </Col>
          <Col xs={6}>
          <b>Received Date</b>
          <p>{shipment.receivedDate ? <FormattedUTCDate value={shipment.receivedDate} /> : 'Shipment Received Date Missing'}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            <b>Shipping library</b>
            <Card
              id="shipping-library-card"
              headerClass="shipping-library-card-header"
              headerStart={<span className="shipping-library-card-header"><b>{shipment.shippingLibrary ? shipment.shippingLibrary.name : 'Shipping Library Missing'}</b></span>}
            >
              
              <div>Shipping Library Address</div>
            </Card>
          </Col>
          <Col xs={2} />
          <Col xs={4}>
          <b>Receiving library</b>
          <Card
              id="receiving-library-card"
              headerClass="receiving-library-card-header"
              headerStart={<span className="receiving-library-card-header"><b>{shipment.receivingLibrary ? shipment.receivingLibrary.name : 'Receiving Library Missing'}</b></span>}
            >
              <div>Receiving Library Address</div>
            </Card>
          </Col>
        </Row>
        
      </React.Fragment>
    );
  }
}
export default ShipmentInfo;