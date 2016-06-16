const errorStyle = {
  color: 'red',
  lineHeight: '80px',
  textAlign: 'center'
};

export default class NotificationLinks extends React.Component {

  render() {
    const { reduxFormLinks } = this.props;
    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Link'}</label>

        <div className="col-xs-4">
          <div className="radio">
            <label>
              <input {...reduxFormLinks}
                  defaultChecked={true}
                  type="radio"
                  value=""
              />
                {'None'}
            </label>
          </div>

          <div className="radio">
            <label>
              <input {...reduxFormLinks}
                  type="radio"
                  value="Edit Profile"
              />
                {'Edit Profile'}
            </label>
          </div>

          <div className="radio">
            <label>
              <input {...reduxFormLinks}
                  type="radio"
                  value="Call Your Doctor"
              />
                {'Call Your Doctor'}
            </label>
          </div>

        </div>

        {reduxFormLinks.touched && reduxFormLinks.error &&
          <div className="col-xs-4"
              style={errorStyle}
          >
            {'Required'}
          </div>
        }

      </div>
    );

  }

}
