const users = 'http://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture';
const corsApi = 'https://cors-anywhere.herokuapp.com/';
let objData;
const peopleContent = {};
const peoplePopup = {
  mainPop: document.querySelector('.peoples-popup'),
  imagesLarge: document.querySelector('.img-large'),
  title: document.querySelector('.peoples-popup__title'),
  street: document.querySelector('.peoples-popup__street'),
  city: document.querySelector('.peoples-popup__city'),
  state: document.querySelector('.peoples-popup__state'),
  email: document.querySelector('.peoples-popup__email'),
  phone: document.querySelector('.peoples-popup__telephone'),
};


load(viewDataOnPage, users);


function load(callback, api) {
  fetch(corsApi + api)
    .then((response) => {
      console.log(response);
      return Promise.all([response.status, response.json()]);
    })
    .then((result) => {
      if (result[0] !== 200) {
        console.log(`Error: ${result[0]}`);
      } else {
        callback(result[1]);
        console.log(result[1]);
      }
    })
    .catch((error) => {
      if (error.name === 'TypeError') {
        alert(`Error: ${error.name}. Please, unlock access to the demo on https://cors-anywhere.herokuapp.com/corsdemo`);
      } else alert(`Error: ${error.name}`);
    });
}

function viewDataOnPage(data) {
  objData = data.results;
  createDataContainers(objData.length);
  listenToTheEvent();
  render(objData);
}

function createDataContainers(n) {
  const main = document.querySelector('main');
  document.querySelector('.loading-window').style.display = 'none';
  for (let i = 0; i < n; i += 1) {
    const contentWrapper = document.createElement('div');
    const peopeImage = document.createElement('img');
    const peopeTitle = document.createElement('span');

    contentWrapper.classList.add('peoples');
    peopeImage.classList.add('img-medium');
    peopeTitle.classList.add('peoples__title');

    contentWrapper.dataset.index = i;
    peopeImage.alt = 'avatar';
    peopeTitle.textContent = 'Title';

    contentWrapper.append(peopeImage, peopeTitle);
    main.append(contentWrapper);
  }
  peopleContent.avatarUser = document.querySelectorAll('.img-medium');
  peopleContent.titleUser = document.querySelectorAll('.peoples__title');
}

function listenToTheEvent() {
  document.getElementById('sortAlphabet').addEventListener('click', () => {
    dataSort(1);
  });
  document.getElementById('backSort').addEventListener('click', () => {
    dataSort(-1);
  });

  document.querySelector('.close').addEventListener('click', () => {
    togglePopup(false);
  });

  const peoples = document.querySelectorAll('.peoples');
  for (let i = 0; i < peoples.length; i += 1) {
    peoples[i].addEventListener('click', renderPopup);
  }
}

function render(renderedObject) {
  for (let i = 0; i < renderedObject.length; i += 1) {
    const userAvatar = renderedObject[i].picture.medium;
    const userTitle = renderedObject[i].name.title;
    const userFirstName = renderedObject[i].name.first;
    const userLastName = renderedObject[i].name.last;

    peopleContent.avatarUser[i].src = userAvatar;
    peopleContent.titleUser[i].textContent = `${userTitle}. ${userFirstName} ${userLastName}`;
  }
}

function dataSort(mode) {
  objData.sort((firstItem, secondItem) => {
    if (firstItem.name.last > secondItem.name.last) return mode;
    if (firstItem.name.last < secondItem.name.last) return -mode;
    return 0;
  });
  render(objData);
}

function togglePopup(flag) {
  let displayStyle;
  if (flag) {
    displayStyle = 'display:block';
  } else {
    displayStyle = 'display:none';
  }
  peoplePopup.mainPop.setAttribute('style', displayStyle);
}

function renderPopup() {
  const person = objData[window.event.currentTarget.dataset.index];

  peoplePopup.title.innerHTML = `Full name: ${person.name.title}. ${person.name.first} ${person.name.last}`;
  peoplePopup.city.innerHTML = `City: ${person.location.city}`;
  peoplePopup.state.innerHTML = `State: ${person.location.state}`;
  peoplePopup.email.innerHTML = `Mail: ${person.email}`;
  peoplePopup.street.innerHTML = `Street: ${person.location.street}`;
  peoplePopup.phone.innerHTML = `Phone: ${person.phone}`;
  peoplePopup.imagesLarge.src = person.picture.large;

  togglePopup(true);
}
