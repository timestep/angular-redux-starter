export default class CallToAction extends React.Component {
  render() {
    const { children } = this.props;

    return (
        <div className="row">
          <div className="col-xs-12">
            <div className="memberBody__flex--center">
              {children}
            </div>
          </div>
        </div>
    );
  }
}
