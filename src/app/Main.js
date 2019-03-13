import React from 'react';


import LayoutContainer from '../modules/layout/LayoutContainer';

/**
 * Main component
 */
export default class Main extends React.Component {

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    return (
      <div className="page">
        <LayoutContainer {...this.props} />
      </div>

    )
  }
}