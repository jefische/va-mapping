import county_list from '../assets/data/usa_counties.js';

var VA_counties = county_list.features.filter((x) => {
	return x.properties.STATEFP == '51'; // Virginia
})

// console.log(VA_counties);
