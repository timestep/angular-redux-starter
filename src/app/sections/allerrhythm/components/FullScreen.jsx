import * as BS from 'react-bootstrap';

export default class FullScreen extends React.Component {

  render() {
    var { onFullScreen } = this.props;

    return (
      <BS.Button
          onClick={onFullScreen}
      >
        {this.props.content}
      </BS.Button>
    );
  }
}
