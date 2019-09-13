import React from 'react';
import PropTypes from 'prop-types';
import ShipmentsRoute from './routes/ShipmentsRoute';

import { Redirect, Route, Switch } from 'react-router-dom';
import css from './index.css';



class Shipping extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    actAs: PropTypes.string.isRequired,
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

  onClose() {
    <p>Closing</p>
  }

  render() {
    const {
      actAs,
      match: {
        path
      }
    } = this.props;

      return (
          <div className={css.container}>
            <div className={css.body}>
              <Switch>
                <Redirect
                  exact
                  from={path}
                  to={`${path}/shipments`}
                />
                <Route path={`${path}/shipments`} component={ShipmentsRoute}>
                </Route>
              </Switch>
            </div>
          </div>
    );

  }
}

export default Shipping;
export {default as Shipments } from './components/Shipments';