import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import SearchComponent from './SearchComponent';
import * as LayoutActions from '../layout/LayoutActions';
import * as SearchActions from './SearchActions';
import {isNotEditOrder} from '../phone/PhoneActions';
import {MENU_ITEMS} from '../../constants';
import {isSystemReady} from '../../utils/auth';

function mapStateToProps(state) {
  return {
    isSystemReady: isSystemReady(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectMenuItem: () => {
      dispatch(LayoutActions.selectMenuItem(MENU_ITEMS.search))
    },
    clearSearch: () => {
      dispatch(SearchActions.clearSearch());
    },
    isNotEditOrder: () => {
      dispatch(isNotEditOrder());
    },
    dispatch
  }
}

class SearchContainer extends PureComponent {

  componentWillMount() {
    this.props.selectMenuItem();
    this.props.clearSearch();
  }

  render() {
    return (
      <div>
        {this.props.isSystemReady && <SearchComponent {...this.props} />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);