import {contactsArr} from './contactsData.js';

const patternSearchInput = document.getElementById('pattern-search-input');
const patternSearchSubmit = document.getElementById('pattern-search-submit');
const contactDisplay = document.getElementById('contact-display');

// runs if user selects search
patternSearchSubmit.addEventListener('click', function(){
    contactDisplay.innerHTML = '';
    renderContact(patternSearchInput.value);
})

//runs if user types in search bar
patternSearchInput.addEventListener('input', function(){
    contactDisplay.innerHTML = '';
    if (patternSearchInput.value != ''){
        renderContact(patternSearchInput.value);
    }
})

//creates the contact cards based off users search
function renderContact(contactObj) {
    for (let i = 0; i < contactsArr.length; i++){
        const searchedText = new RegExp(contactObj, 'gi');
        if (contactsArr[i].name.match(searchedText) || contactsArr[i].email.match(searchedText) || contactsArr[i].phone.match(searchedText)){
            const contactCard = document.createElement('aside');
            contactCard.classList.add('contact-card');
            contactCard.innerHTML /*HTML*/+= `<p>${contactsArr[i].name}</p>
                                            <p>${contactsArr[i].email}</p>
                                            <p>${contactsArr[i].phone}</p>`;
            contactDisplay.appendChild(contactCard);

        }
    }
}