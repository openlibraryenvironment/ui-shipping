import React from 'react';
import PropTypes from 'prop-types';
import ResourceSharing from '@folio/rs';
import { SearchAndSort } from '@folio/stripes/smart-components';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppNameContext from './AppNameContext';

import {
  Button,
  IconButton,
  Pane,
  PaneMenu,
} from '@folio/stripes/components';


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

  render() {
    const {
      actAs,
      match: {
        path
      }
    } = this.props;

    const appName = path.substring(1).replace(/\/.*/, '');


    return (
      <React.Fragment>
        <PaneMenu>
          <Button
            type="submit"
            disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.handleSubmit}
            buttonStyle="primary paneHeaderNewButton"
            marginBottom0
          >
          </Button>
        </PaneMenu>

      <AppNameContext.Provider value={appName}>
          <Switch>
            <Redirect
              exact
              from={path}
              to={`${path}/shipments`}
            />
            <Route
              path={`${path}/shipments`}
              render={() => <React.Fragment><div>This is the {appName} app. </div></React.Fragment>}
            />
          </Switch>
        </AppNameContext.Provider>
      </React.Fragment>
    );

  }
}

export default Shipping;

//export default (props) => <ResourceSharing {...props} />;