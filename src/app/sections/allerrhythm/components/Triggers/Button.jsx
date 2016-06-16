import * as BS from 'react-bootstrap';

/**
 * Navigation Button Component used by Today's Triggers panel
 */
export default class Button extends React.Component {
  render() {
    const {
      disabled,
      label,
      onClick
    } = this.props;

    if (disabled === true) {
      return (
        <BS.Button
            disabled
            onClick={onClick}
        >
          {label}
        </BS.Button>
      );
    }

    return (
      <BS.Button onClick={onClick}>
        {label}
      </BS.Button>
    );
  }
}
