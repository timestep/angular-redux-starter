const BS = ReactBootstrap;
import Header2 from '../../Headers/Header2.jsx';

export default class ProfileSmokingHistory extends React.Component {
  render() {
    return (
      <div className="memberBody__section">
        <div className="row">
          <div className="col-sm-12">
            <Header2>
              <h2>{'Smoking History'}</h2>
            </Header2>
            <span className="col-sm-12">
              <BS.Input
                  defaultValue={'N/A'}
                  type="text"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}
