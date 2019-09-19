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
    const {id, shipment} = this.props;

    return(
      <React.Fragment>
        <p>{get(shipment, 'id.label', '-')}</p>
        <Row>
          <Col xs={6}>
          <p>Thing 1</p>
          </Col>
          <Col xs={6}>
          <p>Thing 2</p>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <p>Thing 3</p>
          </Col>
          <Col xs={6}>
          <p>Thing 4</p>
          </Col>
        </Row>
        
      </React.Fragment>
    );
  }
}
export default ShipmentInfo;