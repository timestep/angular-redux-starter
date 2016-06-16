import { styles, couponIconUrl } from './TriggersConstants.jsx';

/**
 * KA Coupon Component used by Today's Triggers panel
 */
export default class Coupon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let { imageUrl, url } = this.props;
    let imageHTML = '';
    let urlHTML = '';

    // TODO this is temporary until we actually have a coupon then do we use the code below it...
    return (
      <div style={styles.container}>

        <div style={styles.column}>
          <img className='triggers-coupon--icon'
               src={couponIconUrl.comingSoon}
          /> &nbsp;Coming Soon
        </div>

        <div style={styles.column}>
          Download Coupon
        </div>

      </div>
    );

    if (imageUrl) {
      imageHTML = (
        <img className='triggers-coupon--icon'
            src={imageUrl}
        />);
    }

    if (url) {
      urlHTML = (
        <a href={url}
            target={'_new'}
        >
          {'Download Coupon'}
        </a>
      );
    }

    return (
      <div style={styles.container}>

        <div style={styles.column}>
          {imageHTML}
        </div>

        <div style={styles.column}>
          {urlHTML}
        </div>

      </div>
    );
  }
}
