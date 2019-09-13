import React from 'react';
import PropTypes from 'prop-types';
import ShipmentsRoute from './routes/ShipmentsRoute';

import { Redirect, Route, Switch } from 'react-router-dom';



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
          <Route path={`${path}`} component={ShipmentsRoute}>
          </Route>
        </Switch>
    );

  }
}

export default Shipping;
export {default as Shipments } from './components/Shipments';