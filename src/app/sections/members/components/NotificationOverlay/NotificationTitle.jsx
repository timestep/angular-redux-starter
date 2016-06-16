const inputStyle = {
  width: '70%'
};

const errorStyle = {
  width: '20%',
  float: 'right',
  lineHeight: '22px',
  color: 'red'
};

export default class NotificationTitle extends React.Component {

  render() {

    const { reduxFormTitle } = this.props;

    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Title'}</label>
        <div className="col-xs-8">
          <input style={inputStyle}
              {...reduxFormTitle}
          />
        {reduxFormTitle.touched && reduxFormTitle.error && <div style={errorStyle}>{reduxFormTitle.error}</div>}
        </div>
    </div>
    );

  }

}
