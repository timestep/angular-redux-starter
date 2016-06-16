import Miscellaneus from '../../utils/miscellaneous';
import TriggersRenderLibrary from './TriggersRenderLibrary.jsx';

/**
 * Triggers Component used by Today's Triggers panel
 */
export default class Triggers extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * Data is available via props
   */
  renderData() {
    let {activeSymptom, firstName, date, factors, currentPosition, clinic, pharmacy, coupon} = this.props;
    let poisList = [];
    let couponList = [];

    if (clinic) {
      poisList.push ({
        name: clinic.name,
        phone: clinic.phone,
        position: clinic.position
      });
    }

    if (pharmacy) {
      poisList.push({
        name: pharmacy.name,
        phone: pharmacy.phone,
        position: pharmacy.position
      });
    }

    if (coupon) {
      couponList.push(coupon);
    }

    let navigationList = [
      {
        disabled: true,
        id: '',
        label: 'Print',
        style: '',
        type: 'button',
        onClick: Miscellaneus.printScreenShot
          .bind(null,
            '.directionsYTT, .mainLeft, .dashHeader, .toolbarPanel, #footer, .shareAndPrint, .controlGrid',
            '#triggersPrint')
      },
      {
        type: 'button',
        id: '',
        label: 'Share',
        style: '',
        onClick: Miscellaneus.downloadScreenShotAsPNG
          .bind(null, 'triggersPrint', 'download-ytt', 'my-triggers-')
      },
      {
        type: 'anchor',
        id: 'download-ytt',
        label: '',
        style: {
          display: 'none'
        },
        onClick: ''
      }
    ];

    return [
      TriggersRenderLibrary.renderHeaderSection(firstName, date),
      TriggersRenderLibrary.renderFactorsSection(factors[activeSymptom]),
      TriggersRenderLibrary.renderPOIsSection(currentPosition, poisList),
      TriggersRenderLibrary.renderCouponsSection(couponList),
      TriggersRenderLibrary.renderNavigationSection(navigationList)
    ];
  }

  /**
   * If no data is available show the loading sequence
   * @returns {XML}
   */
  render() {
    let factors = this.props.factors;
    return (
      <article className='triggers'
          id='triggersPrint'
      >
        {factors ? this.renderData() : TriggersRenderLibrary.renderLoadingSection()}
      </article>
    );
  }
}

/**
 * Required prop types
 */
Triggers.propTypes = {
  clinic: React.PropTypes.object.isRequired,
  coupon: React.PropTypes.object.isRequired,
  currentPosition: React.PropTypes.object.isRequired,
  date: React.PropTypes.instanceOf(Date).isRequired,
  factors: React.PropTypes.object.isRequired,
  firstName: React.PropTypes.string.isRequired,
  pharmacy: React.PropTypes.object.isRequired
};
