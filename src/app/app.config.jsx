export default function config($provide) {
  $provide.decorator('timepickerDirective', function ($delegate) {
    var directive = $delegate[0];
    delete directive.templateUrl;
    // Inline template markup copied from angular-bootstrap/ui-bootstrap-tpls.min.js and modified
    directive.template =
      '<table>\n' +
      '	<tbody>\n' +
      '		<tr class=\'text-center\'>\n' +
      '			<td><a ng-click=\'incrementHours()\' class=\'btn btn-link\'><span class=\'glyphicon glyphicon-chevron-up\'></span></a></td>\n' +
      '			<td>&nbsp;</td>\n' +
      '			<td></td>\n' +
      '			<td ng-show=\'showMeridian\'></td>\n' +
      '		</tr>\n' +
      '		<tr>\n' +
      '			<td style=\'width:50px;\' class=\'form-group\' ng-class=\'{"has-error": invalidHours}\'>\n' +
      '				<input type=\'text\' ng-model=\'hours\' ng-change=\'updateHours()\' class=\'form-control text-center\' ng-mousewheel=\'incrementHours()\' ng-readonly=\'readonlyInput\' maxlength=\'2\'>\n' +
      '			</td>\n' +
      '			<td>:</td>\n' +
      '			<td style=\'width:50px;\' class=\'form-group\' ng-class=\'{"has-error": invalidMinutes}\'>\n' +
      '				<input type=\'text\' ng-model=\'minutes\' ng-change=\'updateMinutes()\' class=\'form-control text-center\' readonly maxlength=\'2\'>\n' +
      '			</td>\n' +
      '			<td ng-show=\'showMeridian\'><button type=\'button\' class=\'btn btn-default text-center\' ng-click=\'toggleMeridian()\'>{{meridian}}</button></td>\n' +
      '		</tr>\n' +
      '		<tr class=\'text-center\'>\n' +
      '			<td><a ng-click=\'decrementHours()\' class=\'btn btn-link\'><span class=\'glyphicon glyphicon-chevron-down\'></span></a></td>\n' +
      '			<td>&nbsp;</td>\n' +
      '			<td></td>\n' +
      '			<td ng-show=\'showMeridian\'></td>\n' +
      '		</tr>\n' +
      '	</tbody>\n' +
      '</table>\n' +
      '';

    return $delegate;
  });
}
