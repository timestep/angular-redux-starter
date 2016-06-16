const inputStyle = {
  width: '70%'
};

const errorStyle = {
  width: '20%',
  float: 'right',
  lineHeight: '22px',
  color: 'red'
};

const imageStyle = {
  maxWidth: '90%',
  height: 'auto'
};

export default class NotificationImage extends React.Component {

  onImageSelect(event) {
    var files = event.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = function(readerEvt) {
        var binaryString = readerEvt.target.result;
        var base64Str = 'data:image/png;base64,' + btoa(binaryString);
        document.getElementById('img-preview').src = base64Str;
      };

      reader.readAsBinaryString(file);
    }
  }

  render() {

    const { reduxFormImage, reduxFormLinks, reduxFormViewTemplate } = this.props;

    if (reduxFormLinks.value === 'Edit Profile') {
      return null;
    }

    // if its undefined, its in the default state (of 'Text')
    if (typeof reduxFormViewTemplate.value === 'undefined' || reduxFormViewTemplate.value === 'Text') {
      return null;
    }

    return (
      <div className="form-group">
        <label className="col-xs-4 control-label">{'Image'}</label>
        <div className="col-xs-8">
          <input style={inputStyle}
              type="file"
              {...reduxFormImage}
              onChange={this.onImageSelect}
              value={null}
          />
          {reduxFormImage.touched && reduxFormImage.error &&
            <div style={errorStyle}>{reduxFormImage.error}</div>
          }
          <img id="img-preview"
              style={imageStyle}
          />
        </div>
      </div>
    );

  }

}
