import React from 'react';
import Link from 'react-router-dom/Link';
import PropTypes from 'prop-types';

import { get, noop } from 'lodash';
import { FormattedMessage } from 'react-intl';


import {
  SearchAndSortQuery,
  SearchAndSortNoResultsMessage as NoResultsMessage,
  SearchAndSortSearchButton as FilterPaneToggle,
} from '@folio/stripes/smart-components';


import {
  Button,
  IconButton,
  TextField,
  Paneset,
  Pane,
  PaneMenu,
  PaneCloseLink,
  PaneHeaderIconButton,
  SearchField,
  MultiColumnList,
  Icon
} from '@folio/stripes/components';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import Redirect from 'react-router-dom/Switch';
import ShipmentFilters from './ShipmentFilters/ShipmentFilters';
import FormattedUTCDate from './FormattedUTCDate';
import css from './Shipments.css';


class Shipments extends React.Component {
  static propTypes = {
    shippingData: PropTypes.object,
    searchString: PropTypes.string,
    source: PropTypes.shape({
      loaded: PropTypes.func,
      totalCount: PropTypes.func,
    }),
    onNeedMoreData: PropTypes.func,
    onSelectRow: PropTypes.func,
    queryGetter: PropTypes.func,
    querySetter: PropTypes.func,
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
    disableRecordCreation: PropTypes.bool,
  }

  static defaultProps = {
    shippingData: {},
    searchString: '',
    visibleColumns: ['shippingLibrary', 'receivingLibrary', 'id', 'shipmentMethod', 'trackingNumber', 'status', 'shipDate', 'receivedDate'],
    // visibleColumns: ['trackingNumber'],
  }


  constructor(props) {
    super(props);
    this.state = {
      filterPaneIsVisible: true,
    };
  }


  columnMapping = {
    shippingLibrary: <FormattedMessage id="ui-shipping.prop.shippingLibrary" />,
    receivingLibrary: <FormattedMessage id="ui-shipping.prop.receivingLibrary" />,
    id: <FormattedMessage id="ui-shipping.prop.id" />,
    shipmentMethod: <FormattedMessage id="ui-shipping.prop.shipmentMethod" />,
    trackingNumber: <FormattedMessage id="ui-shipping.prop.trackingNumber" />,
    status: <FormattedMessage id="ui-shipping.prop.status" />,
    shipDate: <FormattedMessage id="ui-shipping.prop.shipDate" />,
    receivedDate: <FormattedMessage id="ui-shipping.prop.receivedDate" />
  }

  formatter = {
    shippingLibrary: ({ shippingLibrary }) => (shippingLibrary ? shippingLibrary.name : ''),
    receivingLibrary: ({ receivingLibrary }) => (receivingLibrary ? receivingLibrary.name : ''),
    shipDate: ({ shipDate }) => (shipDate ? <FormattedUTCDate value={shipDate} /> : ''),
    receivedDate: ({ receivedDate }) => (receivedDate ? <FormattedUTCDate value={receivedDate} /> : ''),
  }

  rowFormatter = (row) => {
    const { rowClass, rowData, rowIndex, rowProps = {}, cells } = row;
    let RowComponent;

    if (this.props.onSelectRow) {
      RowComponent = 'div';
    } else {
      RowComponent = Link;
      rowProps.to = this.rowURL(rowData.id);
    }

    return (
      <RowComponent
        aria-rowindex={rowIndex + 2}
        className={rowClass}
        data-label={[
          rowData.name,
          // this.formatter.trackingNumber(rowData),
        ].join('...')}
        key={`row-${rowIndex}`}
        role="row"
        {...rowProps}
      >
        {cells}
      </RowComponent>
    );
  }


  toggleFilterPane = () => {
    this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    }));
  }


  renderResultsFirstMenu = (filters) => {
    const { filterPaneIsVisible } = this.state;
    const filterCount = filters.string !== '' ? filters.string.split(',').length : 0;
    const hideOrShowMessageId = filterPaneIsVisible ?
      'stripes-smart-components.hideSearchPane' : 'stripes-smart-components.showSearchPane';

    return (
      <PaneMenu>
        <FormattedMessage id="stripes-smart-components.numberOfFilters" values={{ count: filterCount }}>
          {appliedFiltersMessage => (
            <FormattedMessage id={hideOrShowMessageId}>
              {hideOrShowMessage => (
                <FilterPaneToggle
                  visible={filterPaneIsVisible}
                  aria-label={`${hideOrShowMessage}...s${appliedFiltersMessage}`}
                  onClick={this.toggleFilterPane}
                  badge={!filterPaneIsVisible && filterCount ? filterCount : undefined}
                />
              )}
            </FormattedMessage>
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  }

  renderResultsLastMenu() {
    if (this.props.disableRecordCreation) {
      return null;
    }

    return (
      <IfPermission perm="ui-shipping.shipment.edit">
        <PaneMenu>
          <FormattedMessage id="ui-shipping.createShipment">
            {ariaLabel => (
              <Button
                aria-label={ariaLabel}
                buttonStyle="primary"
                id="clickable-new-shipment"
                marginBottom0
                to={`/shipping/create${this.props.searchString}`}
              >
                <FormattedMessage id="stripes-smart-components.new" />
              </Button>
            )}
          </FormattedMessage>
        </PaneMenu>
      </IfPermission>
    );
  }


  renderResultsPaneSubtitle = (source) => {
    if (source && source.loaded()) {
      const count = source.totalCount();
      return <FormattedMessage id="stripes-smart-components.searchResultsCountHeader" values={{ count }} />;
    }

    return <FormattedMessage id="stripes-smart-components.searchCriteria" />;
  }


  renderIsEmptyMessage = (query, source) => {
    if (!source) {
      return 'no source yet';
    }

    return (
      <div data-test-shipments-no-results-message>
        <NoResultsMessage
          source={source}
          searchTerm={query.query || ''}
          filterPaneIsVisible
          toggleFilterPane={noop}
        />
      </div>
    );
  }


  rowURL = (id) => {
    return `/shipping/${id}`;
  }


  render() {
    const {
      children,
      shippingData,
      onNeedMoreData,
      queryGetter,
      querySetter,
      source,
      visibleColumns,
    } = this.props;

    const query = queryGetter() || {};
    const count = source ? source.totalCount() : 0;
    const sortOrder = query.sort || '';

    return (
      <SearchAndSortQuery
        querySetter={this.querySetter}
        queryGetter={this.queryGetter}
        initialSortState={{ sort: 'id' }}
        initialSearchState={{ query: '' }}
      >
        {
          ({
            searchValue,
            getSearchHandlers,
            onSubmitSearch,
            onSort,
            getFilterHandlers,
            activeFilters,
            filterChanged,
            searchChanged,
            resetAll,
          }) => {
            return (
              <Paneset id="shipping-paneset">
                {this.state.filterPaneIsVisible &&
                  <Pane
                    defaultWidth="22%"
                    onClose={this.toggleFilterPane}
                    paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  >
                    <form onSubmit={onSubmitSearch}>
                      {/* TODO: Use forthcoming <SearchGroup> or similar component */}
                      <div className={css.searchGroupWrap}>
                        <FormattedMessage id="ui-shipping.searchInputLabel">
                          { ariaLabel => (
                            <SearchField
                              aria-label={ariaLabel}
                              autoFocus
                              className={css.searchField}
                              data-test-shipping-search-input
                              id="input-shipping-search"
                              inputRef={this.searchField}
                              marginBottom0
                              name="query"
                              onChange={getSearchHandlers().query}
                              onClear={getSearchHandlers().reset}
                              value={searchValue.query}
                            />
                          )}
                        </FormattedMessage>
                        <Button
                          buttonStyle="primary"
                          disabled={!searchValue.query || searchValue.query === ''}
                          fullWidth
                          id="clickable-search-shipments"
                          marginBottom0
                          type="submit"
                        >
                          <FormattedMessage id="stripes-smart-components.search" />
                        </Button>
                      </div>
                      <div className={css.resetButtonWrap}>
                        <Button
                          buttonStyle="none"
                          id="clickable-reset-all"
                          disabled={false}
                          onClick={resetAll}
                        >
                          <Icon icon="times-circle-solid">
                            <FormattedMessage id="stripes-smart-components.resetAll" />
                          </Icon>
                        </Button>
                      </div>
                      {/* FILTERS NOT WORKING AS EXPECTED
                         <ShipmentFilters
                          activeFilters={activeFilters.state}
                          data={shippingData}
                          filterHandlers={getFilterHandlers()}
                        /> */}
                    </form>
                  </Pane>
                }
                <Pane
                  appIcon={<AppIcon app="shipping" />}
                  defaultWidth="fill"
                  firstMenu={this.renderResultsFirstMenu(activeFilters)}
                  lastMenu={this.renderResultsLastMenu()}
                  padContent={false}
                  paneTitle={<FormattedMessage id="ui-shipping.meta.title" />}
                  paneSub={this.renderResultsPaneSubtitle(source)}
                >
                  <MultiColumnList
                    autosize
                    columnMapping={this.columnMapping}
                    columnWidths={this.columnWidths}
                    contentData={shippingData.shipments}
                    formatter={this.formatter}
                    id="list-shipments"
                    isEmptyMessage={this.renderIsEmptyMessage(query, source)}
                    onHeaderClick={onSort}
                    onNeedMoreData={onNeedMoreData}
                      // onRowClick={onSelectRow}
                    rowFormatter={this.rowFormatter}
                    sortDirection={sortOrder.startsWith('-') ? 'descending' : 'ascending'}
                    sortOrder={sortOrder.replace(/^-/, '').replace(/,.*/, '')}
                    totalCount={count}
                    virtualize
                    visibleColumns={visibleColumns}
                  />
                </Pane>

                { children }

              </Paneset>
            );
          }
        }
      </SearchAndSortQuery>
    );
  }
}

export default Shipments;
