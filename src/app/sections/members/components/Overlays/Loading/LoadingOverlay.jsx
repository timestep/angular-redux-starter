import React from 'react';
const SPINNER_HEIGHT = 128;
const HALF_SPINNER_HEIGHT = 128 / 2;
const SPINNER_SVG = 'images/loading-spinner.svg';
const overlayStyle = {
  background: '#000',
  bottom: 0,
  height: '100%',
  left: 0,
  opacity: 0.6,
  position: 'fixed',
  right: 0,
  top: 0,
  width: '100%',
  zIndex: 2000
};

const spinnerStyle = {
  height: SPINNER_HEIGHT + 'px',
  left: '50%',
  margin: '-' + HALF_SPINNER_HEIGHT + 'px 0 0 -' + HALF_SPINNER_HEIGHT + 'px',
  position: 'absolute',
  top: '50%',
  width: SPINNER_HEIGHT + 'px'
};

export default class LoadingOverlay extends React.Component {

  render() {
    return (
      <div key="loading-div"
          style={overlayStyle}
      >
        <img height={SPINNER_HEIGHT}
            src={SPINNER_SVG}
            style={spinnerStyle}
            width={SPINNER_HEIGHT}
        />
      </div>
    );
  }

}
