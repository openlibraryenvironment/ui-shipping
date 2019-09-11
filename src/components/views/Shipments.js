import React from 'react';
import css from './Shipments.css';
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
  MultiColumnList
} from '@folio/stripes/components';

import { IntlConsumer } from '@folio/stripes/core';

export default class Shipments extends React.Component {
  static propTypes = {
    searchString: PropTypes.string,
    source: PropTypes.shape({
      loaded: PropTypes.func,
      totalCount: PropTypes.func,
    }),
    visibleColumns: PropTypes.arrayOf(PropTypes.string),
  }




  constructor(props) {
    super(props);
    this.state = {}
  }

  state = {
    filterPaneIsVisible: true,
  }

  toggleFilterPane = () => {
    /* this.setState(curState => ({
      filterPaneIsVisible: !curState.filterPaneIsVisible,
    })); */
    console.log("I'm being called")
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





  render () {
    const {
      queryGetter,
      querySetter,
      source,
      visibleColumns,
    } = this.props;
/* 
    const query = queryGetter() || {};
    const count = source ? source.totalCount() : 0;
    const sortOrder = query.sort || ''; */

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
            resetAll,
          }) => {
            const disableReset = () => (!filterChanged && !searchChanged);
            return (
              <Paneset>
                <Pane defaultWidth="20%"
                  onClose={this.toggleFilterPane}
                  paneTitle={<FormattedMessage id="stripes-smart-components.searchAndFilter" />}
                  dismissable={true}
                  //lastMenu={}
                >
                  <div>
                    <TextField
                      label="user search"
                      name="query"
                      onChange={getSearchHandlers().query}
                      value={searchValue.query}
                    />
                    <Button onClick={onSubmitSearch}>Search</Button>
                  </div>
                </Pane>

                <Pane defaultWidth="fill">
                  {/* <IntlConsumer>
                    { intl => (
                      <MultiColumnList
                        visibleColumns={this.props.visibleColumns ? this.props.visibleColumns : ['status', 'name', 'barcode', 'patronGroup', 'username', 'email']}
                        contentData={get(resources, 'records.records', [])}
                        columnMapping={{
                          status: intl.formatMessage({ id: 'ui-users.active' }),
                          name: intl.formatMessage({ id: 'ui-users.information.name' }),
                          barcode: intl.formatMessage({ id: 'ui-users.information.barcode' }),
                          patronGroup: intl.formatMessage({ id: 'ui-users.information.patronGroup' }),
                          username: intl.formatMessage({ id: 'ui-users.information.username' }),
                          email: intl.formatMessage({ id: 'ui-users.contact.email' }),
                        }}
                        formatter={resultsFormatter}
                        rowFormatter={this.anchorRowFormatter}
                        onRowClick={onSelectRow}
                        onNeedMore={this.onNeedMore}
                        onHeaderClick={onSort}
                      />
                    )}
                  </IntlConsumer> */}
                </Pane>
              </Paneset>
            );
          }
        }
      </SearchAndSortQuery>
    );
  }
}