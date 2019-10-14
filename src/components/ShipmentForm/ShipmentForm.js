import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'react-final-form';

import {
  Button,
  Pane,
  PaneFooter,
  Paneset,
} from '@folio/stripes/components';
import { AppIcon } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';


import ShipmentFormInfo from '../FormSections/ShipmentFormInfo';

import css from './ShipmentForm.css';

class ShipmentForm extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    initialValues: PropTypes.object,
    handlers: PropTypes.object,
    invalid: PropTypes.bool,
    onSubmit: PropTypes.func,
  };

  getSectionProps(id) {
    const { data, handlers } = this.props;
    return {
      data,
      handlers: {
        ...handlers,
        onError: this.handleError,
      },
      id,
    };
  }

  renderPaneFooter(handleSubmit, pristine, submitting) {
    const {
      initialValues,
      invalid
    } = this.props;

    let id;
    if (initialValues && initialValues.id) {
      id = 'clickable-update-shipment';
    } else {
      id = 'clickable-create-shipment';
    }

    const startButton = (
      <Button
        buttonStyle="default mega"
        id="clickable-cancel"
        marginBottom0
        onClick={this.props.handlers.onClose}
      >
        <FormattedMessage id="stripes-components.cancel" />
      </Button>
    );

    const endButton = (
      <Button
        buttonStyle="primary mega"
        disabled={pristine || submitting || invalid}
        id={id}
        marginBottom0
        onClick={handleSubmit}
        type="submit"
      >
        <FormattedMessage id="stripes-components.saveAndClose" />
      </Button>
    );

    return (
      <PaneFooter
        renderStart={startButton}
        renderEnd={endButton}
      />
    );
  }


  render() {
    const { onSubmit } = this.props;

    return (
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, pristine }) => (
          <Paneset>
            <Pane
              appIcon={<AppIcon app="shipping" />}
              dismissible
              defaultWidth="100%"
              footer={this.renderPaneFooter(handleSubmit, submitting, pristine)}
              id="pane-shipment-form"
              onClose={this.props.handlers.onClose}
              paneTitle={<FormattedMessage id="ui-shipping.createShipment" />}
            >
              <form id="form-shipment" onSubmit={handleSubmit}>
                <div className={css.shipmentForm}>
                  <ShipmentFormInfo {...this.getSectionProps('shipmentFormInfo')} />
                </div>
              </form>
            </Pane>
          </Paneset>
        )}
      />
    );
  }
}

export default stripesForm({
  form: 'EditShipment',
  navigationCheck: true,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(ShipmentForm);
