import _ from 'lodash';
import * as Consts from './TriggersConstants.jsx';
import Button from './Button.jsx';
import Coupon from './Coupon.jsx';
import PointOfInterest from './PointOfInterest.jsx';
import TriggersFactor from './TriggersFactor.jsx';

/**
 * Triggers Rendering Library - generates all the Components used by the Today's Triggers panel
 * @type {
  {
    renderSection: TriggersRenderLibrary.renderSection,
    renderLoadingSection: TriggersRenderLibrary.renderLoadingSection,
    renderHeaderSection: TriggersRenderLibrary.renderHeaderSection,
    renderFactorsSection: TriggersRenderLibrary.renderFactorsSection,
    renderPOIsSection: TriggersRenderLibrary.renderPOIsSection,
    renderCouponsSection: TriggersRenderLibrary.renderCouponsSection,
    renderNavigationSection: TriggersRenderLibrary.renderNavigationSection
  }
 }
 */
let TriggersRenderLibrary = {

  /**
   * Renders a section that either has a border or do not have a border
   * @param userBorder
   * @param html
   * @param key
   * @returns {XML}
   */
  renderSection: function (html, userBorder, key) {
    return (
      <section className={userBorder ? 'border' : ''}
          key={key}
      >
        {html}
      </section>
    );
  },

  /**
   * Render loading section
   * @param html
   * @returns {*|XML}d
   */
  renderLoadingSection: function () {

    let loadingHTML = (
      <div className='triggers--loading'>
        <p>
          <i className='fa fa-4x fa-spinner fa-spin' />
        </p>
        <p>{'Fetching Your Trigger\'s Information - Please Wait...'}</p>
      </div>
    );
    return this.renderSection(loadingHTML, false, 'TriggersLoading');
  },

  /**
   * Render a header component
   * @returns {*}
   */
  renderHeaderSection: function (firstName, date) {

    let userLocale = moment.locale();
    let dateStr;
    let headerHTML;

    if (firstName) {
      firstName += '\'s ';
    } else {
      firstName = 'Your ';
    }

    moment.locale('en-US');
    dateStr = moment(date).format('MMMM D, YYYY').toString();
    moment.locale(userLocale);
    headerHTML = [
      (<div className='triggers--title'>
        {firstName + 'Triggers Today'}
      </div>),
      (<div className='triggers--date'>
        {dateStr}
      </div>)
    ];

    return this.renderSection(headerHTML, false, 'TriggersHeader');
  },

  /**
   * Render factors with a container
   * @returns {*}
   */
  renderFactorsSection: function (factors) {

    /**
     * Render factors based on a specific order
     */
    let factorsHTML = _(Consts.factorTypes)
      .map((type, key) => {
        return _(factors)
          .filter((factor) => factor.type === type)
          .map((factor) => {
            let props = {
              iconUrl: Consts.factorIconUrl[type],
              list: factor.results
            };

            return (
              <TriggersFactor
                  key={'TriggersFactor-' + key}
                  {...props}
              />
            );
          })
          .value();
      })
      .value();

    let factorsContainerHTML = (
      <div style={Consts.styles.columnFlex}>
        {factorsHTML}
      </div>
    );

    return this.renderSection(factorsContainerHTML, false, 'TriggersFactors');
  },

  /**
   * Render Point of interests with a bordered container
   * @returns {*}
   */
  renderPOIsSection: function (currentPosition, pois) {
    return _(pois)
      .map((poi, key) => {
        let props = {
          name: poi.name,
          phone: poi.phone,
          currentPosition: currentPosition,
          destinationPosition: poi.position,
          key: key
        };

        let poiHTML = (
          <PointOfInterest key={'PointOfInterest-' + key}
              {...props}
          />
        );

        return this.renderSection(poiHTML, true, 'TriggersPOI' + '-' + key);
      })
      .value();
  },

  /**
   * Render Coupons with a bordered container
   * @returns {*}
   */
  renderCouponsSection: function (coupons) {
    return _(coupons)
      .map((coupon, key) => {
        let props = coupon;
        let couponHTML = (
          <Coupon key={'Coupon-' + key}
              {...props}
          />
        );

        return this.renderSection(couponHTML, true, 'TriggersCoupon' + '-' + key);
      })
      .value();
  },

  /**
   * Render Navigation with a container
   * @returns {XML}
   */
  renderNavigationSection: function (list) {
    let navHTML = _(list)
      .map((nav, key) => {

        if (nav.type === Consts.navigationType.button) {
          let props = {
            key: key,
            id: nav.id,
            label: nav.label,
            style: nav.style,
            onClick: nav.onClick,
            disabled: nav.disabled
          };

          return (
            <Button key={'Button-' + key}
                {...props}
            />
          );
        } else if (nav.type === Consts.navigationType.anchor) {
          return (
            <a href={nav.href}
                id={nav.id}
                onClick={nav.onClick}
                style={nav.style}
            >
              {nav.label}
            </a>
          );
        }
      })
      .value();

    let containerHTML = (
      <div style={Consts.styles.columnFlex}>
        {navHTML}
      </div>
    );

    return this.renderSection(containerHTML, false, 'TriggersNavigation');
  }

};

export default TriggersRenderLibrary;
