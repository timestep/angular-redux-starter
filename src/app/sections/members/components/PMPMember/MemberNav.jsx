import React, { PropTypes } from 'react';

export default class MemberNav extends React.Component {
  render() {
    const { goBackToTablePage } = this.props;
    return (
      <div className="container-fluid">
        <div className="row memberNav__body">
          <div className="col-sm-12">
            <span className="glyphicon glyphicon-chevron-left"/>
            <a
                onClick={goBackToTablePage}
            >
              {'Back'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

MemberNav.propTypes = {
  goBackToTablePage: PropTypes.func.isRequired
};
