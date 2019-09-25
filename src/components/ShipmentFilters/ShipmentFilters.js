import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Accordion, AccordionSet, FilterAccordionHeader, Selection } from '@folio/stripes/components';
import { CheckboxFilter, MultiSelectionFilter } from '@folio/stripes/smart-components';

const FILTERS = [
  'library',
];

class ShipmentFilters extends React.Component {
  static propTypes = {
    shippingData: PropTypes.object.isRequired,
    filterHandlers: PropTypes.object,
  };

  static defaultProps = {
    activeFilters: {
      library: [],
    }
  };

  state = {
    library: [],
  }

  static getDerivedStateFromProps(props, state) {
    const newState = {};

    FILTERS.forEach(filter => {
      const values = props.data[`${filter}Values`];
      if (values.length !== state[filter].length) {
        newState[filter] = values.map(({ label }) => ({ label, value: label }));
      }
    });

    if (Object.keys(newState).length) return newState;

    return null;
  }




  renderCheckboxFilter = (name, props) => {
    const { activeFilters } = this.props;
    const groupFilters = activeFilters[name] || [];
    console.log("groupFilters: %o", groupFilters)
    return (
      <Accordion
        id={`filter-accordion-${name}`}
        displayClearButton={groupFilters.length > 0}
        header={FilterAccordionHeader}
        label={<FormattedMessage id={`ui-shipping.prop.${name}`} />}
        onClearFilter={() => { this.props.filterHandlers.clearGroup(name); }}
        separator={false}
        {...props}
      >
        <CheckboxFilter
          dataOptions={this.state[name]}
          name={name}
          onChange={(group) => { this.props.filterHandlers.state({ ...activeFilters, [group.name]: group.values }); }}
          selectedValues={groupFilters}
        />
      </Accordion>
    );
  }


  render() {
    return (
      <AccordionSet>
        {this.renderCheckboxFilter('library')}
      </AccordionSet>
    );
  }
}

export default ShipmentFilters;