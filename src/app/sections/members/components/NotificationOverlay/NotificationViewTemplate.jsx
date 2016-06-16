const templateTypes = [
  {
    name: 'Text'
  }, {
    name: 'Image'
  }, {
    name: 'Text+Image'
  }
];

export default class NotificationViewTemplate extends React.Component {

  render() {

    const { reduxFormLinks, reduxFormViewTemplate } = this.props;

    if (reduxFormLinks.value === 'Edit Profile') {
      return null;
    }

    const typesJSX = templateTypes.map((type, idx) => {
      return (
          <option key={idx}
              value={type.name}
          >
            {type.name}
          </option>
      );
    });

    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Template'}</label>
        <div className="col-xs-8">
          <select {...reduxFormViewTemplate}
              value={reduxFormViewTemplate.value}
          >
            {typesJSX}
          </select>
        </div>
      </div>
    );

  }

}
