// UI variables
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const filter_btn = document.querySelector('.filter-btn');
const positionsGrid = document.querySelector('.content-positions');
const loadMoreBtn = document.querySelector('.load-more');
const searchBtn = document.getElementById('search-btn');
const navBottom = document.querySelector('.nav-bottom');
// Search Form Desktop
const searchFormDesk = document.getElementById('search-form-desktop');
const searchFieldDesk = document.getElementById('search-field-desk');
const filterFieldDesk = document.getElementById('location-field-desk');
const checkFulltimeDesk = document.getElementById('check-fulltime-desk');
// Search Form Mobile
const searchFormMobile = document.getElementById('search-form-mobile');
const filterFieldMobile = document.getElementById('location-field-mobile');
const checkFulltimeMobile = document.getElementById('check-fulltime-mobile');

const loadPositions = new LoadPositions();

if (filter_btn) {
	filter_btn.addEventListener('click', () => {
		overlay.classList.add('visible');
		modal.classList.add('visible');
	});
}

if (overlay) {
	overlay.addEventListener('click', closeModalOVerlay);
}

document.addEventListener('DOMContentLoaded', () => {
	loadPositions.getPositions();
});

if (loadMoreBtn) {
	loadMoreBtn.addEventListener('click', () => {
		loadPositions.pagination();
	});
}

if (searchFormDesk) {
	searchFormDesk.addEventListener('submit', (e) => {
		loadPositions.description = searchFieldDesk.value;
		loadPositions.fullTime = checkFulltimeDesk.checked;
		loadPositions.location = filterFieldDesk.value;
		loadPositions.getPositionsFiltered();
		e.preventDefault();
	});
}

if (searchFormMobile) {
	searchFormMobile.addEventListener('submit', (e) => {
		loadPositions.location = filterFieldMobile.value;
		loadPositions.fullTime = checkFulltimeMobile.checked;
		loadPositions.getPositionsFiltered();
		closeModalOVerlay();
		e.preventDefault();
	});
}

function closeModalOVerlay() {
	overlay.classList.remove('visible');
	modal.classList.remove('visible');
}

if (navBottom) {
	window.addEventListener('scroll', () => {
		if (window.scrollY >= 800) {
			navBottom.classList.add('nav-on');
		} else {
			navBottom.classList.remove('nav-on');
		}
	});
}

function loadMoreOn() {
	loadMoreBtn.classList.toggle('load-on');
}
