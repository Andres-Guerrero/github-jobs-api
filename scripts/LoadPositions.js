class LoadPositions {
	constructor() {
		this.cors = 'https://cors.bridged.cc/';
		this.github_url = 'https://jobs.github.com/positions.json?';
		this.positionId = 0;
		this.description = '';
		this.fullTime = false;
		this.location = '';
		this.page = 1;
		this.colorPosition = '#EEEEEE';
	}
	getPositions() {
		//fetch(`${this.cors}${this.github_url}`)
		fetch('./scripts/positions.json')
			.then((req) => {
				return req.json();
			})
			.then((data) => {
				// loadMoreBtn.style.display = 'block';
				loadMoreOn();
				this.iteratePositions(data);
			});
	}
	getPositionsFiltered() {
		fetch(
			`${this.cors}${this.github_url}?description=${this.description}&full_time=${this.fullTime}&location=${this
				.location}`
		)
			.then((req) => {
				return req.json();
			})
			.then((data) => {
				if (loadMoreBtn) loadMoreBtn.style.display = 'none';
				positionsGrid.innerHTML = '';
				this.iteratePositions(data);
			});
	}
	pagination() {
		this.page++;
		loadMoreOn();
		fetch(`${this.cors}${this.github_url}page=${this.page}`)
			.then((req) => {
				return req.json();
			})
			.then((data) => {
				this.iteratePositions(data);
				if (data.length < 50) {
					loadMoreBtn.style.display = 'none';
				} else {
					loadMoreOn();
				}
			});
	}
	getPositionDetail() {
		const posHeader = document.querySelector('.position-header');
		const posDetail = document.querySelector('.position-detail');
		const posDescription = document.querySelector('.position-description');
		const posHowApply = document.querySelector('.how-to-apply');
		const posApplyBottom = document.querySelector('.apply-now');
		let url = window.location.href.split('?');
		let parameters = url[1].split('&');
		let url_id = parameters[0].split('='); // ID
		let url_page = parameters[1]; // page=#
		let color = parameters[2].split('='); // color
		fetch(`${this.cors}${this.github_url}${url_page}`)
			.then((req) => {
				return req.json();
			})
			.then((data) => {
				data.forEach((position) => {
					if (position.id === url_id[1]) {
						posHeader.innerHTML = `
                            <div class="logo" style="background-color:${color[1]}"><img src="${position.company_logo}" /></div>
                            <div class="company-info">
                                <h2 class="company">${position.company}</h2>
                                <p class="website">${this.cleanCompanyURL(position.company_url)}</p>
                            </div>
                            <div class="btn-company-site">
                                <a href="${position.company_url}" class="button button--default-two">
                                    <span class="button-label">Company Site</span>
                                </a>
                            </div>
                            `;
						posDetail.innerHTML = `
                            <div class="position-info">
                                <div class="position-time-type">
                                    <span class="time">${this.positionDate(position.created_at)}</span>
                                    •
                                    <span class="type">${position.type}</span>
                                </div>
                                <h1 class="position-title">${position.title}</h1>
                                <h4 class="position-location">${position.location}</h4>
                            </div>
                            <div class="btn-apply">
                                <a href="${position.url}" class="button button--default-one">
                                    <span class="button-label">Apply Now</span>
                                </a>
                            </div>
                            `;
						posDescription.innerHTML = `${position.description}`;
						posHowApply.innerHTML = `
                            <h3>How to Apply</h3>
                            ${position.how_to_apply}
                            `;
						posApplyBottom.innerHTML = `
						    <div class="company-info">
						        <h2 class="company">${position.company}</h2>
						        <p class="website">CLEAN.com${position.company_url}</p>
						    </div>
						    <div class="btn-apply-now">
						    <a href="${position.url}" class="button button--default-one">
						        <span class="button-label">Apply Now</span>
						    </a>
						    </div>
						`;
					}
				});
			});
	}
	iteratePositions(positions) {
		positions.forEach((position) => {
			this.colorPosition = this.positionColor();
			if (positionsGrid) {
				positionsGrid.innerHTML += `
                    <div class="position">
                        <div class="position-logo" style="background-color: ${this.colorPosition}">
                            <img src="${position.company_logo}" width="50%" />
                        </div>
                        <div class="position-time-type">
                            <span class="time">${this.positionDate(position.created_at)}</span>
                            •
                            <span class="type">${position.type}</span>
                        </div>
                        <!-- <h3 class="position-title"><a href="${position.url}">${position.title}</a></h3> -->
                        <h3 class="position-title"><a href="position-detail.html?position-id=${position.id}&page=${this
					.page}&color=${this.colorPosition}">${position.title}</a></h3>
                        <p class="position-company">${position.company}</p>
                        <p class="position-location">${position.location}</p>
                    </div>
                `;
			}
		});
	}
	positionDate(date) {
		const postDate = Math.abs(new Date(date).getTime() / 1000).toFixed(0);
		const currentDate = Math.abs(new Date().getTime() / 1000).toFixed(0);
		const diff = currentDate - postDate;
		const days = Math.floor(diff / 86400);
		const hours = Math.floor(diff / 3600) % 24;
		const minutes = Math.floor(diff / 60) % 60;
		let dateString;
		if (days < 1 && hours < 20) {
			dateString = hours + 'h ago';
		} else if (days <= 7 && days >= 1) {
			dateString = days + 'd ago';
		} else if (days > 7 && days <= 14) {
			dateString = '1w ago';
		} else if (days > 14 && days <= 21) {
			dateString = '2w ago';
		} else if (days > 21 && days < 30) {
			dateString = '3w ago';
		} else {
			dateString = 'More than a month ago';
		}
		return dateString;
	}
	positionColor() {
		const colors = [
			'#DF6DAE',
			'#3DB3D1',
			'#3D3B94',
			'#F0B62A',
			'#E66D39',
			'#222121',
			'#5964E0',
			'#FB7E66',
			'#007CFF',
			'#492A29',
			'#60DCAD',
			'#FF585F'
		];

		return colors[Math.floor(Math.random() * colors.length)];
	}
	cleanCompanyURL(url) {
		if (url !== undefined) {
			return new URL(url).hostname;
		} else {
			return '';
		}
	}
}
