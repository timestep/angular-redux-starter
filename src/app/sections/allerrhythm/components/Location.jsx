import R from 'ramda';

export default class Location extends React.Component {
  render() {
    const {
      city,
      isShown,
      state
    } = this.props;

    if (isShown === false || R.isNil(isShown)) {
      return null;
    }

    const styles = {
      position: 'absolute',
      left: '10rem',
      color: 'white',
      fontSize: '30px'
    };

    return (
      <div style={styles}>
        <span>{state}</span>{', '}<span>{city}</span>
      </div>
    );
  }
}
