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
  
  constructor(props) {
    super(props);
  }


  render() {
    const {handlers} = this.props;

    console.log("This is actually doing things")
    return (

      //<h1> STUFF </h1>
      <Pane
      defaultWidth = "45%"
      dismissable
      onClose={handlers.onClose}
      >
        <p>Shipment information goes here.</p>
      </Pane>
    );
  }
}

export default IndividualShipment;
