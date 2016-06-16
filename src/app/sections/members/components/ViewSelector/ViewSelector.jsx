import SearchButton from '../SearchButton/SearchButton.jsx';
import SeveritySelector from '../SeveritySelector/SeveritySelector.jsx';

export default class ViewSelector extends React.Component {

  render() {
    const {
      activeSeverity,
      onSeverityButtonClick,
      categories,
      isSearchSelected,
      numHigh,
      numLow,
      numModerate,
      numOoc,
      numVeryHigh,
      onSearchButtonClick
    } = this.props;

    /**
     * TODO - we should refactor the SeveritySelector and SearchButton to be one giant tab-based selector (code smell)
     */
    return (
      <div className="container-fluid">
        <div className="row viewSelector__nav">
          <div className="col-xs-6 col-lg-10">
            <SeveritySelector
                activeSeverity={activeSeverity}
                categories={categories}
                numHigh={numHigh}
                numLow={numLow}
                numModerate={numModerate}
                numOoc={numOoc}
                numVeryHigh={numVeryHigh}
                onSeverityButtonClick={onSeverityButtonClick}
            />
          </div>
          <div className="col-xs-6 col-lg-2">
            <SearchButton
                onSearchButtonClick={onSearchButtonClick}
                selected={isSearchSelected}
            />
          </div>
        </div>
      </div>
    );
  }
}
