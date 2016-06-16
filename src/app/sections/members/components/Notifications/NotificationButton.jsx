const BS = ReactBootstrap;

const buttonStyle = {
  marginLeft: '1.25rem',
  padding: '0.5rem'
};

export default class NotificationButton extends React.Component {

  render() {
    const { icon, onNotificationButtonClick, text } = this.props;

    // space between the icon and the text
    return (
      <BS.Button
          bsSize="small"
          onClick={() => onNotificationButtonClick(text)}
          style={buttonStyle}
      >
        <i className={icon}></i>
        {' ' + text}
      </BS.Button>
    );
  }

}
