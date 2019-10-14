import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  Button,
  Layout,
  Pane,
  PaneMenu,
} from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import { Spinner } from '@folio/stripes-erm-components';

import ShipmentInfo from './sections/ShipmentInfo';

class IndividualShipment extends React.Component {
  static propTypes = {
    shipmentData: PropTypes.object,
    urls: PropTypes.object,
    isLoading: PropTypes.bool,
    handlers: PropTypes.shape({
      onClose: PropTypes.func.isRequired,
    }).isRequired,
  };


  getSectionProps = (id) => {
    const { shipmentData, handlers, urls } = this.props;

    return {
      id,
      handlers,
      urls,
      shipment: shipmentData.shipment,
    };
  }

  renderLastMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-shipping.editShipment">
          {ariaLabel => (
            <Button
              aria-label={ariaLabel}
              buttonStyle="primary"
              id="clickable-edit-shipment"
              marginBottom0
              to={this.props.urls.edit()}
            >
              <FormattedMessage id="stripes-components.button.edit" />
            </Button>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }


  renderLoadingPane = () => {
    return (
      <Pane
        defaultWidth="fill%"
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
    const { shipmentData, isLoading, handlers } = this.props;
    const shippingLibName = (shipmentData.shipment.shippingLibrary ? shipmentData.shipment.shippingLibrary.name : 'Shipping Library [Missing]');
    const recievingLibName = (shipmentData.shipment.receivingLibrary ? shipmentData.shipment.receivingLibrary.name : 'Receiving Library [Missing]');
    const shipId = (shipmentData.shipment.id ? shipmentData.shipment.id : 'Shipment ID [Missing]');

    if (isLoading) return this.renderLoadingPane();

    return (
      <Pane
        appIcon={<AppIcon app="shipping" />}
        defaultWidth="fill"
        dismissible
        id="pane-view-shipment"
        lastMenu={this.renderLastMenu()}
        onClose={handlers.onClose}
        paneTitle={'Shipment · ' + shipId}
        paneSub={shippingLibName + ' 🠚 ' + recievingLibName}
      >
        <TitleManager>
          <ShipmentInfo {...this.getSectionProps('shipmentInfo')} />
        </TitleManager>
      </Pane>
    );
  }
}
export default IndividualShipment;
