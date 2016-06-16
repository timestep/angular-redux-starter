const defaultTab = {
  borderRadius: '0',
  color: '#5A9EEE',
  border: 'none',
  outline: 'none',
  position: 'relative'
};

const activeTab = {
  backgroundColor: '#5A9EEE',
  color: '#fff',
  borderRadius: '0',
  border: 'none',
  outline: 'none',
  position: 'relative'
};

export default class SearchButton extends React.Component {
  render() {

    const {
      onSearchButtonClick,
      selected
    } = this.props;

    return (
      <ul className="nav nav-tabs viewSelector__nav--search">
        <li className="nav nav-tabs">
          <a
              onClick={onSearchButtonClick}
              style={selected ? activeTab : defaultTab}
          >
            <span className="glyphicon glyphicon-search"></span>
            {'Search'}
          </a>
        </li>
      </ul>
    );
  }
}
