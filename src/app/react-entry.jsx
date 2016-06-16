'use strict';

import Dash from './sections/allerrhythm/components/Dash.jsx';
import MembersApp from './sections/members/index.jsx';

// Exporting the Dash component allows us to render
// it in Angular on the AllerRhythm component
window.kagenairDashboard = {
  dash: Dash,
  membersApp: MembersApp
};
