import ToolTip from './ToolTip.jsx';

export default class ControlGrid extends React.Component {

  // Redraw the donuts on state change
  componentDidUpdate() {
    this.drawSVG();
  }

  accumulateTotals(data) {
    if (!data) {
      return 0;
    }

    return R.foldl(function(acc, d) {
      acc += d.value;
      return acc;
    }, 0, data);
  }

  tallyDates(data, tally) {
    if (!data) {
      return 0;
    }

    return R.foldl(function (acc, obj) {
      if (obj.value && !acc[obj.date]) {
        acc[obj.date] = 1;
      }
      return acc;
    }, tally || {}, data);
  }

  filterByDateRange(data) {
    let startDate = moment(this.props.display_range[0]);
    let endDate = moment(this.props.display_range[1]).subtract(3, 'days');

    // only return data within the date range
    return R.filter(function (dateData) {
      var date = moment(dateData.date);
      return date.isAfter(startDate) && date.isBefore(endDate);
    }, data);
  }

  createCard(value, label) {
    let card = (<ul>
      <li className={value === -1 ? 'title' : 'title-value'}>{value === -1 ? 'Not Answered' : value}</li>
      <li className="details">{label}</li>
    </ul>);

    return (<div className={value === -1 ? 'no-value' : 'value'}>
      {value === -1 ?
        (<ToolTip tooltip={'Please take your asthma severity test on your mobile app.'}>{card}</ToolTip>)
        : card}
      </div>
    );
  }

  drawSVG() {
    if (this.props.active_symptom !== 'asthma') {
      return;
    }

    // Cleanup text
    d3.select('.top-donut').selectAll('*').remove();
    d3.select('.bottom-donut').selectAll('*').remove();

    let {influences} = this.props;
    let asthmaControl = influences.asthma_control;

    let tally = this.tallyDates(this.filterByDateRange(asthmaControl.puffs_of_albuterol.data));
    tally = this.tallyDates(this.filterByDateRange(asthmaControl.nights_with_asthma.data), tally);
    tally = this.tallyDates(this.filterByDateRange(asthmaControl.emergency_visits.data), tally);
    tally = this.tallyDates(this.filterByDateRange(asthmaControl.prednisone_days.data), tally);

    let numOutOfControlDays = 0;
    R.mapObj(function() {
      numOutOfControlDays++;
    }, tally);

    let startDate = this.props.display_range[0];
    let endDate = this.props.display_range[1];

    // this calcultes the total days displayed on the graph minues the 3 predicted days.
    let maxDays = moment(endDate).diff(moment(startDate), 'days') - 3;
    let numAsthmaControlDays = Math.abs(maxDays - numOutOfControlDays);

    let donutData = {
      asthmaControl: [numAsthmaControlDays, numOutOfControlDays],
      outOfControl: [numOutOfControlDays, numAsthmaControlDays]
    };

    var width = 200;
    var height = 200;
    var radius = Math.min(width, height) / 2;
    var widthOfDoughnut = 15;
    var padding = 15;

    var color = d3.scale.category20();

    // make our pie graph
    var pie = d3.layout.pie().sort(null);

    // cut out the centre
    var arc = d3.svg.arc()
      .innerRadius(radius - padding)
      .outerRadius(radius - padding - widthOfDoughnut);

    var svg = d3.select('.top-donut')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')');

    var svg2 = d3.select('.bottom-donut')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' + (width / 2) + ', ' + (height / 2) + ')');

    svg.selectAll('path')
      .data(pie(donutData.asthmaControl))
      .enter().append('path')
      .attr('fill', function (d, i) {
        return color(i);
      })
      .attr('d', arc);

    svg2.selectAll('path')
      .data(pie(donutData.outOfControl))
      .enter().append('path')
      .attr('fill', function (d, i) {
        return color(i);
      })
      .attr('d', arc);

    let numDaysFontSize = '36px';
    // 6 MONTHS time frame
    if (maxDays >= 170) {
      numDaysFontSize = '28px';
    }

    // Labels
    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', numDaysFontSize)
      .attr('transform', 'translate(0, -10)')
      .text(numAsthmaControlDays + ' / ' + maxDays);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('transform', 'translate(0, 15)')
      .text('ASTHMA');

    svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('transform', 'translate(0, 40)')
      .text('CONTROL DAYS');

    svg2.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', numDaysFontSize)
      .attr('transform', 'translate(0, -10)')
      .text(numOutOfControlDays + ' / ' + maxDays);

    svg2.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('transform', 'translate(0, 15)')
      .text('OUT OF');

    svg2.append('text')
      .attr('text-anchor', 'middle')
      .attr('font-size', '12px')
      .attr('transform', 'translate(0, 40)')
      .text('CONTROL DAYS');
  }

  render() {
    var {influences, active_symptom } = this.props;

    // Render nothing on the other tabs
    if (active_symptom !== 'asthma') {
      return (<div></div>);
    }

    var asthmaControl = influences.asthma_control;
    var takenDailyTest = this.accumulateTotals(this.filterByDateRange(asthmaControl.puffs_of_albuterol.data)) > 0;
    var takenWeeklyTest = this.accumulateTotals(this.filterByDateRange(asthmaControl.nights_with_asthma.data)) > 0 ||
      this.accumulateTotals(this.filterByDateRange(asthmaControl.emergency_visits.data)) > 0 ||
      this.accumulateTotals(this.filterByDateRange(asthmaControl.prednisone_days.data)) > 0;

    var totalPuffsOfAlbuterol = this.accumulateTotals(this.filterByDateRange(asthmaControl.puffs_of_albuterol.data));
    var totalNightsAsthma = this.accumulateTotals(
      this.filterByDateRange(asthmaControl.nights_with_asthma.data)
    );
    var totalEmergencyVisits = this.accumulateTotals(this.filterByDateRange(asthmaControl.emergency_visits.data));
    var totalPrednisoneDays = this.accumulateTotals(this.filterByDateRange(asthmaControl.prednisone_days.data));

    return (
      <div className="controlGrid-border">
        <div className="controlGrid">
          <div className="header">{'Asthma Control'}</div>

          <div className="topLeft top-donut"></div>

          <div className="topRight">

            <div className="top controlCard">
              {this.createCard(takenDailyTest ? totalPuffsOfAlbuterol : -1, 'PUFFS OF ALBUTEROL')}
            </div>
            <div className="bottom controlCard">
              {this.createCard(takenWeeklyTest ? totalNightsAsthma : -1, 'NIGHTS WITH ASTHMA')}
            </div>
          </div>

          <div className="bottomLeft bottom-donut"></div>

          <div className="bottomRight controlCard">
            <div className="top">
              {this.createCard(takenWeeklyTest ? totalEmergencyVisits : -1, 'EMERGENCY VISITS')}
            </div>
            <div className="bottom controlCard">
              {this.createCard(takenWeeklyTest ? totalPrednisoneDays : -1, 'PREDNISONE DAYS')}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
