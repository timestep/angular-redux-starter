const BS = ReactBootstrap;

export default class ModalContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {containerIsVisible: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({containerIsVisible: !this.state.containerIsVisible});
  }

  render() {
    const {
      label,
      icon,
      children
    } = this.props;

    const renderDropDown = () => {
      if (this.state.containerIsVisible) {
        return children;
      }
      return null;
    };

    return (
      <div>
        <BS.Button
            className="dropdownbtn"
            onClick={this.handleClick}
        >
          {label}
          <span className={icon}></span>
        </BS.Button>
        {renderDropDown()}
      </div>
    );
  }
}
