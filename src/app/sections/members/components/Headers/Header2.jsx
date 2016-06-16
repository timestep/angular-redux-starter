export default class Header2 extends React.Component {

  render() {
    const { children } = this.props;

    return (
      <div className="row">
        <div className="memberBody__container memberBody__container--subheader">
          <div className="col-xs-12">
            {children}
            <hr/>
          </div>
        </div>
      </div>
    );
  }

}
