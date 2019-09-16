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
import { Spinner } from '@folio/stripes-erm-components';

import {
  ShipmentInfo,
} from './sections/ShipmentInfo';

class IndividualShipment extends React.Component {
  
  render() {
   console.log("This is actually doing things")
    return (
      <Pane
      defaultWidth = "45%">
        <p>Hello World</p>
      </Pane>
    );
  }
}

export default IndividualShipment;
