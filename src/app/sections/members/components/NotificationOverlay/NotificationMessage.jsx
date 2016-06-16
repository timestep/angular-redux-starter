const inputStyle = {
  width: '70%'
};

const errorStyle = {
  width: '20%',
  float: 'right',
  lineHeight: '22px',
  color: 'red'
};

export default class NotificationMessage extends React.Component {

  render() {

    const { reduxFormLinks, reduxFormMessage, reduxFormViewTemplate } = this.props;

    if (reduxFormLinks.value === 'Edit Profile') {
      return null;
    }

    if (reduxFormViewTemplate.value === 'Image') {
      return null;
    }

    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Message'}</label>
        <div className="col-xs-8">
          <input style={inputStyle}
              {...reduxFormMessage}
          />
          {reduxFormMessage.touched && reduxFormMessage.error &&
            <div style={errorStyle}>{reduxFormMessage.error}</div>
          }
        </div>
      </div>
    );

  }

}
