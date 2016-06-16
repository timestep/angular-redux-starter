const BS = ReactBootstrap;

export default class MultiSelector extends React.Component {

  render() {
    const {
      label1,
      label1ClickHandler,
      label2,
      label2ClickHandler,
      reduxForm
    } = this.props;

    const repeatedOptions = R.pipe(
      R.keys,
      R.map((formKey)=> {
        return (
          <div className="row"
              key={formKey}
          >
            <div className="col-sm-12">
              <BS.Input
                  label={formKey}
                  type="checkbox"
                  {...reduxForm[formKey]}
              />
            </div>
          </div>
        );
      })
    )(reduxForm);

    const extraButtons = () => {
      let innerButton1;
      let innerButton2;
      const input = (label, clickHandler) => {
        return (
          <BS.Input
              label={label}
              onClick={()=>clickHandler()}
              type="checkbox"
          />
        );
      };
      if (label1) {
        innerButton1 = input(label1, label1ClickHandler);
      }
      if (label2) {
        innerButton2 = input(label2, label2ClickHandler);
      }
      return (
        <div>
          <div className="modal-box__inner">
            {innerButton1}
            {innerButton2}
          </div>
          <hr className="modal-box__hr"/>
        </div>
      );
    };


    return (
      <div className="modal-box__container">
        {extraButtons}
        <div className="modal-box__inner">
          {repeatedOptions}
        </div>
      </div>
    );
  }

}
