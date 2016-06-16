/**
 * Trigger Factor order - change the order of the values, if re-ordering is required
 * @type {string[]}
 */
export const factorTypes = ['eyes', 'nose', 'sinus', 'lungs'];

/**
 * Trigger Icon URLs
 * @type {{eyes: string, nose: string, sinus: string, lungs: string}}
 */
export const factorIconUrl = {
  eyes: 'images/eye.png',
  nose: 'images/nose.png',
  sinus: 'images/sinus.png',
  lungs: 'images/lungs.png'
};

export const couponIconUrl = {
  comingSoon: 'images/KagenAir-Icon-Notification-Coupon-2.svg'
};

/**
 * The different types of navigation elements that can be rendered
 * @type {{anchor: string, button: string}}
 */
export const navigationType = {
  anchor: 'anchor',
  button: 'button'
};

/**
 * The different in-line styles that are used by the components
 * @type {
    {
      container: { padding: string, display: string, flexDirection: string, justifyContent: string,
        alignItems: string
      },
      column: { width: string, textAlign: string},
      columnFlex: {display: string, flexDirection: string, justifyContent: string, alignItems: string}
    }
  }
 */
export const styles = {

  /**
   * This is a wrapper container for a component
   */
  container: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  /**
   * This is a column wrapper container for a component's container
   */
  column: {
    width: '100%',
    textAlign: 'center'
  },

  /**
   * This is a column (with flex-box styling) wrapper container for a component's container
   */
  columnFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  }
};
