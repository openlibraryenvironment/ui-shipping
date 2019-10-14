import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { getSASParams } from '@folio/stripes-erm-components';
import Shipments from '../components/Shipments';

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;

class ViewShipments extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }).isRequired,
    mutator: PropTypes.object,
    resources: PropTypes.object,
    stripes: PropTypes.shape({
      logger: PropTypes.object,
    }),
  }


  static manifest = Object.freeze({
    shipments: {
      type: 'okapi',
      records: 'results',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      path: 'rs/shipments',
      params: getSASParams({
        searchKey: 'id',
        columnMap: {
          'Shipping Library': 'shippingLibrary',
          'Receiving Library': 'receivingLibrary',
          'Shipment ID': 'id',
          'Method': 'shipmentMethod',
          'Tracking Number': 'trackingNumber',
          'Status': 'status',
          'Ship Date': 'shipDate',
          'Received Date': 'receivedDate'
        },
        filterKeys: {
          orgs: 'orgs.org',
        },
      })
    },
    libraryValues: {
      type: 'okapi',
      path: 'rs/directoryEntry',
      shouldRefresh: () => false,
    },
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });


  constructor(props) {
    super(props);

    this.logger = props.stripes.logger;
    this.searchField = React.createRef();
  }


  componentDidMount() {
    this.source = new StripesConnectedSource(this.props, this.logger, 'shipments');

    if (this.searchField.current) {
      this.searchField.current.focus();
    }
  }


  querySetter = ({ nsValues }) => {
    this.props.mutator.query.update(nsValues);
  }

  queryGetter = () => {
    return get(this.props.resources, 'query', {});
  }

  handleNeedMoreData = () => {
    if (this.source) {
      this.source.fetchMore(RESULT_COUNT_INCREMENT);
    }
  }


  render() {
    const { children, resources } = this.props;

    if (this.source) {
      this.source.update(this.props, 'shipments');
    }
    return (
      <Shipments
        shippingData={{
          shipments: get(resources, 'shipments.records', []),
          libraryValues: get(resources, 'libraryValues.records', []),
        }}
        onNeedMoreData={this.handleNeedMoreData}
        queryGetter={this.queryGetter}
        querySetter={this.querySetter}
        source={this.source}
        history={this.props.history}
      >
        { children }
      </Shipments>
    );
  }
}

export default stripesConnect(ViewShipments);
