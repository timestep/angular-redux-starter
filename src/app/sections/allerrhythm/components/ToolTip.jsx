var BS = ReactBootstrap;

export default class ToolTip extends React.Component {

  render() {
    let tooltip = (<BS.Tooltip id={this.props.tooltip}>{this.props.tooltip}</BS.Tooltip>);

    return (
          <BS.OverlayTrigger
              key={this.props.tooltip}
              overlay={tooltip}
              placement='top'
          >
            <span>{this.props.children}</span>
          </BS.OverlayTrigger>
    );
  }

}
