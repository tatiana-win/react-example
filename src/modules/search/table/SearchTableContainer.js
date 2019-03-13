import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import SearchTableComponent from './SearchTableComponent';
import * as SearchActions from '../SearchActions';

function mapStateToProps(state) {
  return {
    searchResults: state.search.results
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

class SearchTableContainer extends PureComponent {

  render() {
    return (
      <div>
        <SearchTableComponent {...this.props} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTableContainer);