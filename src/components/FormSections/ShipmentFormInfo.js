import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import {
  Checkbox,
  Col,
  Datepicker,
  Row,
  Select,
  TextArea,
  TextField,
} from '@folio/stripes/components';

import { required } from '../../util/validators';

export default class ShipmentFormInfo extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    data: PropTypes.shape({
      libraryValues: PropTypes.array,
    }),
  };


  render() {
    const { data, id } = this.props;

    return (
      <div data-test-shipment-info id={id}>
        <Row>
          <Col xs={12}>
            <FormattedMessage id="ui-shipping.placeholder.trackingNumber">
              {placeholder => (
                <Field
                  id="edit-shipment-trackingNumber"
                  name="trackingNumber"
                  label={<FormattedMessage id="ui-shipping.prop.trackingNumber" />}
                  component={TextField}
                  placeholder={placeholder}
                  required
                  validate={required}
                />
              )}
            </FormattedMessage>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
          <Field
              id="edit-shipment-shippingLibrary"
              component={Select}
              dataOptions={data.libraryValues}
              name="shippingLibrary"
              label={<FormattedMessage id="ui-shipping.prop.shippingLibrary" />}
              required
            />
          </Col>
          <Col xs={6}>
          <Field
              id="edit-shipment-receivingLibrary"
              component={Select}
              dataOptions={data.libraryValues}
              name="receivingLibrary"
              label={<FormattedMessage id="ui-shipping.prop.receivingLibrary" />}
              required
            />
          </Col>
        </Row>
      </div>
    );
  }
}
