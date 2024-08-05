import { womenComputerLegends } from './womensData.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const patternSearchInput = document.getElementById('pattern-search-input');
const patternSearchSubmit = document.getElementById('pattern-search-submit');
const womenDisplay = document.getElementById('women-display');
const womanModal = document.getElementById('woman-modal');
const randomBtn = document.getElementById('random-btn');
const suggestionsList = document.getElementById('suggestions');

//assigns each obj in the womens comp legends array with a uuid
assignUUIDtoObj();

/***generates a random object from the women in comp scie legends array */
randomBtn.addEventListener('click', function(){
    womanModal.style.display = 'flex';

    const randomWomanObj = womenComputerLegends[Math.floor(Math.random() * womenComputerLegends.length)];
    loadModal(randomWomanObj.id, false);
})

//SEARCH FUNCTIONALITY
// runs if user selects search
patternSearchSubmit.addEventListener('click', function(){
    if (patternSearchInput.value !== ''){
        findwomens(womenComputerLegends, patternSearchInput.value);
    } else {
        womenDisplay.innerHTML = '';
    }
})

//runs if user types in search bar
patternSearchInput.addEventListener('input', function(){
    if (patternSearchInput.value !== ''){
        womenInSearch(womenComputerLegends, patternSearchInput.value);
    } else {
        womenDisplay.innerHTML = '';
    }
})

/***Assign each object a uuid */
function assignUUIDtoObj() {
    womenComputerLegends.forEach(function(woman){
        const womansUUID = uuidv4();
        woman.id = womansUUID;
    })
}

/**Chooses a randoom modal */
womenDisplay.addEventListener('click', function(event){
    console.log(event.target)
    if (event.target.dataset.id){
        womanModal.style.display = 'flex';
        loadModal(event, true);
    }
})

//SEARCH FUNCTIONALITY
// finds the correct womens based off the users search
function findwomens(womenArr, pattern){
    const regex = new RegExp(pattern, 'i');

    womenDisplay.innerHTML = '';

    womenArr.filter(function(woman){
        return regex.test(woman.name);
    })
    .forEach(function(woman){
        renderwomen(woman);
    })
}

// finds the correct women based off the users unsubmitted input
function womenInSearch(womenArr, pattern){
    const regex = new RegExp(pattern, 'i');

    suggestionsList.innerHTML = '';

    womenArr.filter(function(woman){
        return regex.test(woman.name);
    })
    .forEach(function(woman){
        renderWomenSearch(woman);
    })
}

// creates the women cards based off the found womens
function renderwomen(womanObj) {
    const { name, years, achievement, wikipedia } = womanObj;

    const womenCard = document.createElement('aside');
    womenCard.classList.add('women-card');
    womenCard.setAttribute('data-id', `${womanObj.id}`);

    const nameEl = document.createElement('p');
    const yearsEl = document.createElement('p');
    nameEl.setAttribute('data-id', `${womanObj.id}`);
    yearsEl.setAttribute('data-id', `${womanObj.id}`);

    nameEl.innerText = name;
    yearsEl.innerText = years;

    womenCard.appendChild(nameEl);
    womenCard.appendChild(yearsEl);

    womenDisplay.appendChild(womenCard);
}

//adds womans name to search dropdown
function renderWomenSearch(womanObj){
    const { name } = womanObj;

    const womanOption = document.createElement('option');
    womanOption.innerText = name;
    womanOption.setAttribute('data-id', `${womanObj.id}`);

    suggestionsList.appendChild(womanOption);
}

/***Modal funcitonality */
function loadModal(womanObj, datasetTrue) {
    let womanUUID = '';
    if (datasetTrue){
        womanUUID = womanObj.target.dataset.id;
    } else {
        womanUUID = womanObj
    }
    const selectedWoman = womenComputerLegends.find(obj => {
        return obj.id === womanUUID;
    })

    const { name, years, achievement, wikipedia } = selectedWoman;
    
    const modalEl = /*html*/`<div class="woman-content">
                                <div class="x-out" id="x-out"><i class="fa fa-x"></i></div>
                                <h2>${name}</h2>
                                <p class="years">${years}</p>
                                <p class="achievement">${achievement}</p>
                                <a href="${wikipedia}" alt="The wikipedia page for ${name}" target="_blank" class="btn">Learn more about ${name} from her wikipedia!</a>
                            </div>`;

    document.getElementById('woman-modal').innerHTML = modalEl;

    document.getElementById('x-out').addEventListener('click', function(){
        womanModal.style.display = 'none';
    });
}
