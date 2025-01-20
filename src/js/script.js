import county_list from '../assets/usa_counties.js';

var VA_counties = county_list.features.filter((x) => {
	return x.properties.STATEFP == '51'; // Virginia
})