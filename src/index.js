import React from 'react';
import PropTypes from 'prop-types';
import ViewShipments from './routes/ViewShipments';
import ViewShipment from './routes/ViewShipment';
import ViewCreateShipment from './routes/ViewCreateShipment';
import Switch from 'react-router-dom/Switch';
import { Route } from '@folio/stripes/core';


class Shipping extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    stripes: PropTypes.shape({
      connect: PropTypes.func,
      logger: PropTypes.shape({
        log: PropTypes.func,
      }),
    }),
  };


   constructor(props) {
    super(props);
  }

  render() {
    const {
      match: {
        path
      }
    } = this.props;

      return (
          <Switch>
            <Route path={`${path}/create`} component={ViewCreateShipment} />
            <Route path={`${path}`} component={ViewShipments}>
              <Switch>
              <Route path={`${path}/:id`} exact component={ViewShipment} />
              </Switch>
            </Route>
          </Switch>
    );

  }
}

export default Shipping;
export {default as Shipments } from './components/Shipments';
export {default as Shipment } from './components/IndividualShipment/IndividualShipment';