export default class Switch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var el = ReactDOM.findDOMNode(this);

    el.onclick = () => {
      this.props.onClick(this.props.value);
      this.props.on = !this.props.on;
    };
  }

  render() {

    var background = '#FFF';
    if (this.props.color && this.props.on) {
      background = this.props.color;
    }

    return (
      <div
          className={'switch ' + (this.props.on ? 'on' : '')}
          style={{background: background}}
      >
        <div
            className="switch-toggle"
        ></div>

      </div>
    );
  }
}
