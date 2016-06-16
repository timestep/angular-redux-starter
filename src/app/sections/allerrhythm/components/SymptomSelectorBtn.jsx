const BS = ReactBootstrap;

export default class SymptomSelectorBtn extends React.Component {
  render() {
    // Add a tool-tip to the 'coming soon btns'
    if (this.props.className === 'coming-soon') {
      return (
        <BS.OverlayTrigger
            overlay={(<BS.Tooltip id={'tt' + this.props.className}>{'Coming Soon'}</BS.Tooltip>)}
            placement="top"
        >
          <BS.Button className={this.props.className}>
            {this.props.proper_name}
          </BS.Button>
        </BS.OverlayTrigger>
      );
    }

    return (
      <BS.Button
          className={this.props.className}
          onClick={this.props.onClick}
      >
        {this.props.proper_name}
      </BS.Button>
    );
  }
}
