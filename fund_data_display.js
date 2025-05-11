const papaparseScript = document.createElement('script');
papaparseScript.src = "https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js";
document.head.appendChild(papaparseScript);

papaparseScript.onload = function () {
	const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRTz6qYaiQ-12wssmuuEKG2ehDx_jIFgD8FVqSa0IQCqpGtFVRxajoijuJ1vezpOlAm56YLsjwhN5_m/pub?output=csv';
	const rowsPerPage = 5;
	let currentPage = 1;
	let cardData = [];
	let filteredData = [];

	let regionSet = new Set();
	let ageSet = new Set();
	let typeSet = new Set();

	fetch(csvUrl)
	.then(response => response.text())
	.then(csv => {
			Papa.parse(csv, {
			header: true,
			skipEmptyLines: true,
			complete: function(results) {
					cardData = results.data;
					filteredData = cardData;
					extractFilterOptions(cardData);
					renderCards(currentPage);
					renderPagination();
					setupFilterListeners();
			}
			});
	});

	function extractFilterOptions(data) {
	data.forEach(row => {
			if (row["Region"]) regionSet.add(row["Region"]);
			if (row["Age Eligibility"]) ageSet.add(row["Age Eligibility"]);
			if (row["Type of Funding"]) {
			row["Type of Funding"].split(',').map(t => t.trim()).forEach(t => typeSet.add(t));
			}
	});

	const regionContainer = document.getElementById('filter-region');
	[...regionSet].sort().forEach(region => {
			const label = document.createElement('label');
			label.innerHTML = `<input type="checkbox" value="${region}"> ${region}`;
			label.style.display = 'block';
			regionContainer.appendChild(label);
	});

	const ageSelect = document.getElementById('filter-age');
	[...ageSet].sort().forEach(age => {
			const option = document.createElement('option');
			option.value = age;
			option.textContent = age;
			ageSelect.appendChild(option);
	});

	const typeContainer = document.getElementById('filter-type');
	[...typeSet].sort().forEach(type => {
			const label = document.createElement('label');
			label.innerHTML = `<input type="checkbox" value="${type}"> ${type}`;
			label.style.display = 'block';
			typeContainer.appendChild(label);
	});
	}

	function setupFilterListeners() {
	document.getElementById('filter-keyword').addEventListener('input', applyFilters);
	document.getElementById('filter-age').addEventListener('change', applyFilters);
	document.querySelectorAll('#filter-region input, #filter-type input').forEach(input => {
			input.addEventListener('change', applyFilters);
	});
	}

	function applyFilters() {
	const keyword = document.getElementById('filter-keyword').value.toLowerCase();
	const selectedRegions = [...document.querySelectorAll('#filter-region input:checked')].map(cb => cb.value);
	const selectedTypes = [...document.querySelectorAll('#filter-type input:checked')].map(cb => cb.value);
	const selectedAge = document.getElementById('filter-age').value;

	filteredData = cardData.filter(item => {
			const keywordMatch = keyword === '' || Object.values(item).some(val => String(val).toLowerCase().includes(keyword));
			const regionMatch = selectedRegions.length === 0 || selectedRegions.includes(item["Region"]);
			const ageMatch = selectedAge === '' || item["Age Eligibility"] === selectedAge;
			const itemTypes = item["Type of Funding"] ? item["Type of Funding"].split(',').map(t => t.trim()) : [];
			const typeMatch = selectedTypes.length === 0 || selectedTypes.some(t => itemTypes.includes(t));

			return keywordMatch && regionMatch && ageMatch && typeMatch;
	});

	currentPage = 1;
	renderCards(currentPage);
	renderPagination();
	}

	function renderCards(page) {
	const container = document.getElementById('card-container');
	container.innerHTML = '';

	const start = (page - 1) * rowsPerPage;
	const end = start + rowsPerPage;
	const currentItems = filteredData.slice(start, end);

	currentItems.forEach(item => {
			const card = document.createElement('div');
					card.style.borderBottom = '1px solid #000';
					card.style.padding = '20px 30px 40px 15px'; // top, right, bottom, left
					card.style.width = 'calc(100% - 50px)';
					card.style.boxSizing = 'border-box'; // ensures padding is included
			
					let infoButton = undefined;
					for (const key in item) {
			const line = document.createElement('div');
							if (key === 'Fund Name') {
									line.style.fontSize = '26px';
									line.style.fontWeight = 'bold';
									line.style.color = '#306844'
									line.innerHTML = `<strong>${item[key]}`;
									line.style.marginBottom = '10px';
							} else if (key === 'Information') {
									line.style.fontSize = '18px';
									line.innerHTML = `<a href="${item[key]}" target="_blank" style="text-decoration: none;">
															<button style="padding: 10px 20px; background-color: #000000; color: white; border: none; border-radius: 4px; cursor: pointer;">
															More Infomation
															</button>
													</a>`;
									line.style.marginBottom = '6px';
									infoButton = line;
									continue;
							} else {
									line.style.fontSize = '18px';
									line.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
									line.style.marginBottom = '6px';
							}
			card.appendChild(line);
			}
					card.appendChild(infoButton);

			container.appendChild(card);
	});
	}

	function renderPagination() {
	const pagination = document.getElementById('pagination');
	pagination.innerHTML = '';

	const totalPages = Math.ceil(filteredData.length / rowsPerPage);
	if (totalPages <= 1) return;

	for (let i = 1; i <= totalPages; i++) {
			const btn = document.createElement('button');
			btn.textContent = i;
			btn.style.margin = '0 5px';
			btn.style.padding = '6px 12px';
			btn.style.cursor = 'pointer';
			if (i === currentPage) {
			btn.style.backgroundColor = '#ddd';
			}
			btn.addEventListener('click', () => {
			currentPage = i;
			renderCards(currentPage);
			renderPagination();
			});
			pagination.appendChild(btn);
	}
	}

	function toggleDropdown(id) {
	const el = document.getElementById(id);
	el.style.display = (el.style.display === 'none') ? 'block' : 'none';
	}
}