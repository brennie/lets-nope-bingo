import React from 'react';


/**
 * An individual bingo cell.
 *
 * Each cell contains a horror trope for the bingo.
 */
export default class BingoCell extends React.Component {
  /**
   * Handle the compnent mounting.
   *
   * This will handle binding the on click handler to the DOM element.
   */
  componentDidMount() {
    this._el.addEventListener('click', this.props.onClick);
  }

  /**
   * Handle the component unmounting.
   *
   * This will handle unbinding the click handler from the DOM element.
   */
  componentWillUnmount() {
    this._el.removeEventListener('click', this.props.onClick);
  }

  /**
   * Render the bingo cell.
   *
   * @returns {React.ReactElement} The rendered component.
   */
  render() {
    const activeClass = this.props.active ? ' bingo-card__cell--active' : '';
    const classes = `bingo-card__cell${activeClass}`;

    return (
      <div className={classes} ref={ (el) => this._el = el }>
        {this.props.tropeText}
      </div>
    );
  }
};
