import ToggleHeader from './ToggleHeader.jsx';
import ToggleSwitchList from './ToggleSwitchList.jsx';

export default class ToggleColumn extends React.Component {

  render() {
    return (
      <div>
        <ToggleHeader
            categoryName={this.props.categoryName}
            glyphNames={this.props.glyphNames}
        />

        <ToggleSwitchList
            categoryName={this.props.categoryName}
            categoryPropOnState={this.props.categoryPropOnState}
            factorData={this.props.factorData}
            onSwitchChange={this.props.onSwitchChange}
        />
      </div>
    );
  }

}
