import _ from 'lodash';

/**
 * Navigation Button Component used by Today's Triggers panel
 */
export default class TriggerFactor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {iconUrl, list} = this.props;
    let items = _(list)
      .map((item) => {
        return (
          <li>
            {item}
          </li>
        );
      })
      .value();

    return (
      <div>
        <div>
          <img className='triggers-factor--icon'
              src={iconUrl}
          />
        </div>
        <ul className='triggers-factor--items'>
          {items}
        </ul>
      </div>
    );
  }
}
