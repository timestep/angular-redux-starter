import {Cell} from 'fixed-data-table';

const BS = ReactBootstrap;

const ELLIPSIS_STYLE = {
  width: '250px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default class LongListCell extends React.Component {

  render() {
    const {
      id,
      list
    } = this.props;

    return (
      <Cell>
          <BS.OverlayTrigger
              overlay={(
                  <BS.Tooltip
                      id={id}
                  >
                    {list}
                  </BS.Tooltip>
                )}
              placement="bottom"
          >
            <div style={ELLIPSIS_STYLE}>
              {list}
            </div>
          </BS.OverlayTrigger>
      </Cell>
    );
  }

}
