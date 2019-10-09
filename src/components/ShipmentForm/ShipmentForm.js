import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Field } from 'react-final-form';

import {
  AccordionSet,
  Button,
  Col,
  ExpandAllButton,
  IconButton,
  Layout,
  Pane,
  PaneFooter,
  PaneMenu,
  Paneset,
  Row,
} from '@folio/stripes/components';
import { AppIcon, TitleManager } from '@folio/stripes/core';
import stripesForm from '@folio/stripes/form';

import { Spinner } from '@folio/stripes-erm-components';

import { ShipmentFormInfo } from '../FormSections';

import css from './ShipmentForm.css';

class ShipmentForm extends React.Component {
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
      // handleSubmit,
      initialValues,
      // pristine,
      // submitting,
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
