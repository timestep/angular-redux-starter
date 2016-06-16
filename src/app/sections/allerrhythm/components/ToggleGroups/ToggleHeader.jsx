
export default class ToggleHeader extends React.Component {

  render() {
    var categoryName = this.props.categoryName;
    var categoryKey = categoryName.toLowerCase();
    var glyphName = this.props.glyphNames[categoryKey];

    var glyphImg = null;

    if (glyphName) {
      var fullPath = '/images/' + glyphName;

      glyphImg = (
        <img className='factorGlyph'
            height='25px'
            src={fullPath}
            width='25px'
        />);
    }

    return (
      <div>
        <span className="toggleTitle">{categoryName}</span>
        {glyphImg}
        <hr style={{marginTop: '10px', marginBottom: '10px'}} />
      </div>
    );
  }

}
