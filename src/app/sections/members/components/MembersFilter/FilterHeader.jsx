import React from 'react';

const KAGEN_GRAY = '#808180';
const GLYPH_ICON_STYLE = {
  color: KAGEN_GRAY,
  cursor: 'pointer'
};

export default class FilterHeader extends React.Component {
  render() {
    const {
      filterIsActive,
      onFilterToggleChange
    } = this.props;

    let glyphIcon = (
      <span
          className="glyphicon glyphicon-minus"
          style={GLYPH_ICON_STYLE}
      />
    );

    if (!filterIsActive) {
      glyphIcon = (
        <span
            className="glyphicon glyphicon-plus"
            style={GLYPH_ICON_STYLE}
        />
      );
    }

    return (
      <div
          className="row"
          onClick={()=> onFilterToggleChange(filterIsActive)}
      >
        <div className="col-xs-8 col-sm-8">
          <h1>{'Filters'}</h1>
        </div>
        <div className="col-xs-4 col-sm-4">
          <span className="pull-right crossRotate">
            {glyphIcon}
          </span>
        </div>
      </div>
    );
  }
}
