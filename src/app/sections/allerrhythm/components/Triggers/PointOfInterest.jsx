import { styles } from './TriggersConstants.jsx';
import Miscellaneus from '../../utils/miscellaneous.js';

/**
 * Navigation Button Component used by Today's Triggers panel
 */
export default class PointOfInterest extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {name, phone, currentPosition, destinationPosition} = this.props;
    let innerHTML = [];

    innerHTML.push((
      <div style={styles.column}>
        {name}
      </div>
    ));

    if (phone) {
      innerHTML.push((
        <div style={styles.column}>
          <a href={'tel:' + phone}>{phone}</a>
        </div>
      ));
    }

    if (currentPosition &&
      destinationPosition) {

      innerHTML.push((
        <div style={styles.column}>
          <a className='directionsYTT'
             href={Miscellaneus.encodeGoogleMapsDirectionURL(currentPosition, destinationPosition)}
             target={'_new'}
          >
            {'Directions'}
          </a>
        </div>
      ));
    }

    return (
      <div style={styles.container}>
        {innerHTML}
      </div>
    );

    return (
      <div style={styles.container}>{innerHTML}</div>
    );
  }

}
