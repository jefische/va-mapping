import county_list from '../assets/data/usa_counties.js';

var VA_counties = county_list.features.filter((x) => {
	return x.properties.STATEFP == '51'; // Virginia
})

// console.log(VA_counties.length);
// console.log(VA_counties[30]);

for (var i = 0; i < VA_counties.length; i++) {
	// console.log((i + 1) + ': ' + VA_counties[i].properties.NAME)
}

const getLocationData = () => {
	const locationElements = document.querySelectorAll('#va-county-data .rcva-location');
	const locations = [];

	locationElements.forEach(element => {
		const name = element.getAttribute('data-name');
		const description = element.getAttribute('data-description');
		let background = name.replace(" ", "-").toLowerCase() + "-background";

		element.children[0].children[0].classList.add(background);
		const body = element.children[0];
		
		// console.log(test);
		console.log(body.outerHTML);
		locations.push({name, description, body});
	});
	return locations;
};

const locations = getLocationData(); 

// console.log(locations[0].body)