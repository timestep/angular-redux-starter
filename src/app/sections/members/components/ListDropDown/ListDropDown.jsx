const BS = ReactBootstrap;

export default class ListDropDown extends React.Component {

  constructor(props) {
    super(props);
    this.state = {title: props.defaultValue};
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(evt) {
    this.setState({title: evt.target.text});
    if (this.props.onChange) {
      this.props.onChange(evt.target.text);
    }
  }

  render() {
    const { list } = this.props;

    const title = this.state.title;

    const fixedHeight = {
      height: '250px',
      overflowY: 'scroll'
    };

    const items = list.map((value) => {
      return (
        <BS.MenuItem
            key={value}
            onSelect={this.onSelect}
        >
          {value}
        </BS.MenuItem>
      );
    });

    return (
      <BS.Dropdown
          id={title}
      >
        <BS.Button>
          {title}
        </BS.Button>
        <BS.Dropdown.Toggle/>
        <BS.Dropdown.Menu
            style={fixedHeight}
        >
          {items}
        </BS.Dropdown.Menu>
      </BS.Dropdown>
    );

  }
}
