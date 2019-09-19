import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';

import {
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  Icon,
  Layout,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { AppIcon, IfPermission, TitleManager } from '@folio/stripes/core';

/* import ShipmentInfo from './sections/ShipmentInfo'; */

class IndividualShipment extends React.Component {
  

  static propTypes = {
    
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
  }




  getSectionProps = (id) => {
    const { handlers, urls } = this.props;

    return {
      id,
      handlers,
      urls,
    };
  }

  render() {
    const {shipmentData, handlers} = this.props;

    console.log("This is actually doing things")
    return (

      <Pane
      appIcon={<AppIcon app="shipping" />}
      defaultWidth = "45%"
      dismissable = "last"
      onClose={handlers.onClose}
      id="pane-view-shipment"
      paneTitle={"Shipment · " + shipmentData.shipment.id}
      paneSub={shipmentData.shipment.shippingLibrary + " 🠚 " + shipmentData.shipment.receivingLibrary}
      >
        <p>Shipment information goes here.</p>
      </Pane>
    );
  }
}

export default IndividualShipment;
