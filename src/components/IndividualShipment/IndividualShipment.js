import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { NotesSmartAccordion } from '@folio/stripes/smart-components';

import {
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  Headline,
  Icon,
  Layout,
  Pane,
  PaneMenu,
  Row,
} from '@folio/stripes/components';
import { AppIcon, IfPermission, TitleManager } from '@folio/stripes/core';
import { Spinner } from '@folio/stripes-erm-components';

import ShipmentInfo from './sections/ShipmentInfo';

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
    const { shipmentData, handlers, urls } = this.props;

    return {
      id,
      handlers,
      urls,
      shipment: shipmentData.shipment,
    };
  }

  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="45%"
        dismissible
        id="pane-view-shipment"
        onClose={this.props.handlers.onClose}
        paneTitle={<FormattedMessage id="ui-shipping.loading" />}
      >
        <Layout className="marginTop1">
          <Spinner />
        </Layout>
      </Pane>
    );
  }





  render() {
    const {shipmentData, isLoading, handlers} = this.props;

    const shippingLibName = (shipmentData.shipment.shippingLibrary ? shipmentData.shipment.shippingLibrary.name : 'Shipping Library [Missing]');
    const recievingLibName = (shipmentData.shipment.receivingLibrary ? shipmentData.shipment.receivingLibrary.name : 'Receiving Library [Missing]');
    const shipId = (shipmentData.shipment.id ? shipmentData.shipment.id : 'Shipment ID [Missing]');

    if (isLoading) return this.renderLoadingPane();

    return (
      console.log(handlers.text),
      <Pane
      appIcon={<AppIcon app="shipping" />}
      defaultWidth = "fill"
      dismissable
      onClose={()=>window.alert('no :P')}
      id="pane-view-shipment"
      paneTitle={"Shipment · " + shipId}
      paneSub={shippingLibName + " 🠚 " + recievingLibName}
      >
        <TitleManager>
          <ShipmentInfo {...this.getSectionProps('shipmentInfo')}/>
        </TitleManager>
      </Pane>
    );
  }
}

export default IndividualShipment;
