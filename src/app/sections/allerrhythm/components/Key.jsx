import d3Util from '../utils/d3.js';
import _ from 'lodash';

export default class Key extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    var svg = d3.select(ReactDOM.findDOMNode(this));

    svg.append('rect')
      .attr('class', 'keyborder');

    svg.append('g').attr('class', 'symptomkey');

    svg.append('g').attr('class', 'factorkey');

    this.drawLabels(this.props.data);
  }

  componentDidUpdate() {
    this.drawLabels(this.props.data);
  }

  drawLabels() {

    function calculateXLeft (d, i, unused, xOffset, iWidth) {
      return (((i % iWidth) * 225) + xOffset);
    }

    function calculateXRight (d, i, unused, xOffset, iWidth) {
      return (((i % iWidth) * -225 + xOffset));
    }

    function calculateY (d, i, unused, yPosition, iWidth) {
      return (Math.floor(i / iWidth) * 20 + yPosition);
    }

    var xSymptom = this.props.x;
    var sBoxX = _.partialRight(calculateXLeft, xSymptom, 2);
    var sTextX = _.partialRight(calculateXLeft, xSymptom + 15, 2);
    var sValueX = _.partialRight(calculateXLeft, xSymptom + 100, 2);

    var ySymptom = this.props.y;
    var sBoxY = _.partialRight(calculateY, ySymptom - 5, 2);
    var sTextY = _.partialRight(calculateY, ySymptom, 2);

    var symptomEnum = ['None', 'Low', 'Moderate', 'High', 'Very High'];
    d3Util.drawKeyGroup(ReactDOM.findDOMNode(this), 'symptomkey', this.props.symptomData,
                        sBoxX, sTextX, sBoxY, sTextY, sValueX, symptomEnum);

    var xFactor = this.props.windowWidth - 40;
    var fBoxX = _.partialRight(calculateXRight, xFactor, 3);
    var fTextX = _.partialRight(calculateXRight, xFactor + 15, 3);
    var fValueX = _.partialRight(calculateXRight, xFactor + 120, 3);

    var yFactor = this.props.y;
    var fBoxY = _.partialRight(calculateY, yFactor - 5, 3);
    var fTextY = _.partialRight(calculateY, yFactor, 3);

    d3Util.drawKeyGroup(ReactDOM.findDOMNode(this), 'factorkey', this.props.factorData, fBoxX,
                        fTextX, fBoxY, fTextY, fValueX);

  }

  render() {
    return (<g></g>);
  }

}
