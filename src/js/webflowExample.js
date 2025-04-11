mapboxgl.accessToken = "pk.eyJ1IjoiZG9sbGltb3JlIiwiYSI6ImNsbHN4OTZqbzB5eXczb25yM3E3Zjl5cmcifQ.qBDX98UCpc4gkJ_mSIcNig";

let highlightedStateIDs = [];
let hoveredFeatureId = null;
let stateLinks = {};
let defaultCard = null;

const allCards = document.querySelectorAll(".collection-item");
allCards.forEach((card, index) => {
	let cardStateID = card.querySelector(".collection_div .state_id").textContent.trim();
	highlightedStateIDs[index] = cardStateID;

	const cardLink = card.querySelector("#link");

	if (cardLink) {
		stateLinks[cardStateID] = cardLink.textContent;
	}

	if (cardStateID === "99") {
		defaultCard = card;
	}
});

function showDefaultCard() {
	if (defaultCard) {
		defaultCard.style.display = "block";
	}
}

function hideDefaultCard() {
	if (defaultCard) {
		defaultCard.style.display = "none";
	}
}

const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/dollimore/clrx5iprk007m01r61p0m244k",
	center: [-96.9902568005579, 38.521270844520316],
	zoom: 3.65,
	dragPan: false,
});

window.addEventListener("load", showDefaultCard);

map.on("load", () => {
	map.addSource("states", {
		type: "geojson",
		data: "https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson",
	});

	map.addLayer({
		id: "state-fills",
		type: "fill",
		source: "states",
		layout: {},
		paint: {
			"fill-color": [
				"case",
				["boolean", ["feature-state", "hover"], false],
				"#014f86", // Color when hovered
				"#014f86", // Color
			],
			"fill-opacity": [
				"case",
				["boolean", ["feature-state", "hover"], false],
				0.85, // Opacity when hovered
				["match", ["get", "STATE_ID"], highlightedStateIDs, 0.5, 0], // Opacity for highlighted and non-highlighted states
			],
			"fill-outline-color": [
				"case",
				["boolean", ["feature-state", "hover"], false],
				"black", // Change outline color when hovered
				"transparent",
			],
		},
	});

	map.on("mousemove", "state-fills", (e) => {
		if (e.features.length > 0) {
			if (hoveredFeatureId) {
				map.setFeatureState({ source: "states", id: hoveredFeatureId }, { hover: false });
			}
			hoveredFeatureId = e.features[0].id;
			map.setFeatureState(
				{ source: "states", id: hoveredFeatureId },
				{ hover: highlightedStateIDs.includes(e.features[0].properties.STATE_ID) },
			);

			const stateID = e.features[0].properties.STATE_ID;
			let isHoveringActiveState = false;

			allCards.forEach((card) => {
				const cardStateID = card.querySelector(".collection_div .state_id").textContent.trim();

				if (cardStateID === stateID) {
					hideDefaultCard();
					card.style.display = "block";
					isHoveringActiveState = true;
				} else {
					card.style.display = "none";
				}
			});

			if (!isHoveringActiveState) {
				showDefaultCard();
			}
		} else {
			showDefaultCard();
		}
	});

	map.on("click", "state-fills", (e) => {
		const stateID = e.features[0].properties.STATE_ID;

		if (stateLinks[stateID]) {
			const linkUrl = stateLinks[stateID];
			window.open(linkUrl, "_blank");
		}
	});

	map.scrollZoom.disable();
	map.doubleClickZoom.disable();
});
