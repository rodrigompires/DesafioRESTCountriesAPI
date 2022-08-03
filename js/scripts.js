'use strict'

// Função Inicial

async function GetCountry() {

    const url = await fetch('https://restcountries.com/v3.1/all');
    const dataCountry = await url.json();

    dataCountry.forEach(element => {
        renderCountry(element)
    });

}

GetCountry();


const bodyCountries = document.querySelector('.country-container')

function renderCountry(d) {
    // console.log(data.name[0]);

    const cardCountry = document.createElement('div');
    cardCountry.classList.add('card-country');
    cardCountry.classList.add(`${d.region}`);
    cardCountry.setAttribute('id', `${d.fifa}`);
    cardCountry.innerHTML = `
                <img src="${d.flags.png}" alt="Bandeira ${d.name.common}">
                <h3 class="country-name">${d.name.common}</h3>
                <p class="population"><strong>Population:  </strong>${d.population.toLocaleString()}</p>
                <p><strong>Region:  </strong>${d.region}</p>
                <p><strong>Capital:  </strong>${d.capital}n</p>
    `

    bodyCountries.appendChild(cardCountry);


    cardCountry.addEventListener('click', () => {

        const imgModal = document.querySelector('.imgmodal');
        const countryName = document.querySelector('.name-country');
        const nativeMo = document.querySelector('.nativeMo');
        const populationMo = document.querySelector('.populationMo');
        const regionMo = document.querySelector('.regionMo');
        const subregionMo = document.querySelector('.subregionMo');
        const capitalMo = document.querySelector('.capitalMo');
        const tldMo = document.querySelector('.tldMo');
        const currenciesMo = document.querySelector('.currenciesMo');
        const languagesMo = document.querySelector('.languagesMo');
        const page1 = document.querySelectorAll('.page1');
        const page2 = document.querySelectorAll('.page2');
        const btnback = document.querySelector('.back-btn');



        page1.forEach(element => {
            element.style.display = 'none'
            page2.forEach(element => {
                element.style.display = 'grid'
            });
        });

        btnback.addEventListener('click', function () {
            page1.forEach(element => {
                element.style.display = '';
                page2.forEach(element => {
                    element.style.display = 'none';
                });
            });
        })




        imgModal.setAttribute('src', `${d.flags.png}`);
        imgModal.setAttribute('alt', "Bandeira " + `${d.name.common}`);
        nativeMo.innerHTML = `${Object.values(d.name.nativeName).map(el => el.common)}`;
        // countryName.innerHTML = `${d.name.common}`;
        populationMo.innerHTML = `${d.population.toLocaleString()}`;
        regionMo.innerHTML = `${d.region}`;
        subregionMo.innerHTML = `${d.subregion}`;
        capitalMo.innerHTML = `${d.capital}`;
        tldMo.innerHTML = `${d.tld}`;
        currenciesMo.innerHTML = `${Object.values(d.currencies).map(el => el.name)}`;
        languagesMo.innerHTML = `${Object.values(d.languages).map(el => el)}`;




        // INCLUÇÃO NO HTML DOS BOTÕES DAS REGIÕES FRONTEIRIÇAS

        const buttons = document.querySelector('.buttons')
        if (document.querySelector('.country-btn') || !document.querySelector('.country-btn')) {

            buttons.innerText = ""
        }

        if (d.borders) {
            const name = `${Object.values(d.borders).map(el => el)}`.split(',');
            name.forEach(element => {

                const filho = document.createElement('input');
                filho.setAttribute('type', 'button');
                filho.setAttribute('value', `${element}`);
                filho.classList.add('country-btn')
                buttons.appendChild(filho);

            });
        } else {
            const filho = document.createElement('h5');
            filho.innerHTML = 'Esse país não tem fronteiras definidas'
            buttons.appendChild(filho);
        }


    })

}










// FUNÇÕES UTILIZADAS NO SUBMENU DAS REGIÕES

const drop = document.querySelector('.btnDropdown');
const nameRegions = document.querySelectorAll('.nameRegions');
const textSubmenu = document.querySelector('.placeholder');
const subMenu = document.querySelector('.contentFilter');


nameRegions.forEach(element => {
    element.addEventListener('click', filterRegions);
});

drop.addEventListener('click', showRegions);



function showRegions() {
    subMenu.classList.toggle('open');
}


function filterRegions(e) {
    const cards = document.querySelectorAll('.card-country');
    cards.forEach(element => {
        if (element.getAttribute('class') === "card-country " + e.target.innerHTML || e.target.innerHTML === 'Filter by Region') {
            element.style.display = 'block'
        } else {
            element.style.display = 'none'
        }
    });
    textSubmenu.innerHTML = e.target.innerHTML;
    showRegions();
}





// FUNÇÃO QUE ATIVA E DESATIVA O MODO DARK

const btnMode = document.querySelectorAll('.btnToggle');

btnMode.forEach(element => {
    element.addEventListener('click', function () {
        const body = document.querySelector('body').classList.toggle('dark');
    })
});





// FUNÇÃO QUE FILTRA OS PAISES NO INPUT YPE TEXT

const input = document.querySelector('.inputSearch');

input.addEventListener('input', function (e) {
    const textSearch = e.target.value
    const countryName2 = document.querySelectorAll('.country-name');
    countryName2.forEach(name => {
        if (name.innerText.toLowerCase().includes(textSearch.toLowerCase())) {
            name.parentElement.style.display = 'grid';
        } else {
            name.parentElement.style.display = 'none';
        }
    })
});