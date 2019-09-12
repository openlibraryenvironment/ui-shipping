import React from 'react';
import Shipments from '../components/Shipments';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stripesConnect } from '@folio/stripes/core';
import { StripesConnectedSource } from '@folio/stripes/smart-components';
import { getSASParams } from '@folio/stripes-erm-components'; 

const INITIAL_RESULT_COUNT = 100;
const RESULT_COUNT_INCREMENT = 100;

class ShipmentsRoute extends React.Component {
  static manifest = Object.freeze({
    shipments: {
      type: 'okapi',
      records: 'results',
      recordsRequired: '%{resultCount}',
      perRequest: RESULT_COUNT_INCREMENT,
      limitParam: 'perPage',
      path: '/rs/shipments',
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
    query: { initialValue: {} },
    resultCount: { initialValue: INITIAL_RESULT_COUNT },
  });



  render () {
    const { children, location, resources } = this.props;

    if (this.source) {
      this.source.update(this.props, 'shipments');
    }
    return (<Shipments
      shippingData={{
        shipments: get(resources, 'shipments.records', []),
      }}
    />);
  }
}

export default stripesConnect(ShipmentsRoute);