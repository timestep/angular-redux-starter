import React from 'react';

const BS = ReactBootstrap;

export default class CheckBox extends React.Component {

  render() {
    const {
      id,
      label,
      onClickHandler
    } = this.props;

    return (
      <div className="membersFilter__container">
        <div key={'Checkbox-' + id}>
          <BS.Input
              onClick={onClickHandler}
              type="checkbox"
          /> {label}
        </div>
      </div>
    );
  }
}
