let users = "http://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture";
let corsApi = "https://cors-anywhere.herokuapp.com/";
let objData;
const domObj = {
  popUp: document.querySelectorAll(".peoples-popup"),
  btnSpaceClick: document.querySelectorAll(".open-information"),
  avatarUser: document.querySelectorAll(".img-medium"),
  titleUser: document.querySelectorAll(".peoples__title")
};

function load(callback, api) {
  fetch(corsApi + api)
    .then(function (response) {
      console.log(response);
      return Promise.all([response.status, response.json()]);
    })
    .then(function (result) {
      if (result[0] != 200) {
        console.log(`Error: ${result[0]}`);
      } else {
        callback(result[1]);
        console.log(result[1]);
      }
    })
    .catch(function (error) {
      alert(`Error: ${error}`);
    });
}

function transferData(data) {
  objData = data.results;
  render(objData);
}

function render(objData) {
  for (let i = 0; i < objData.length; i++) {
    let userAvatar = objData[i]["picture"]["medium"];
    let userTitle = objData[i]["name"]["title"]; 
    let userFirstName = objData[i]["name"]["first"];
    let userLastName = objData[i]["name"]["last"];

    domObj.avatarUser[i].src = userAvatar;
    domObj.titleUser[i].textContent = `${userTitle}. ${userFirstName} ${userLastName}`;
  }
}

function toClose() {
  document.querySelector(".peoples-popup").style.display = "none";
}

function alphabetSort() {
  let mode = 1;
  generalSort (mode);
  render(objData);
}

function backSort() {
  let mode = -1;
  generalSort (mode);
  render(objData);
}

function generalSort (mode){
  objData.sort(function (firstItem, secondItem) {
    if (firstItem.name.last > secondItem.name.last) return mode;
    if (firstItem.name.last < secondItem.name.last) return -mode;
    if (firstItem.name.last == secondItem.name.last) return 0;
  });
}


function listenToTheEvent() {
  document.querySelector(".close").addEventListener("click", toClose);
  document.getElementById("sortAlphabet").addEventListener("click", alphabetSort);
  document.getElementById("backSort").addEventListener("click", backSort);

  let peoples = document.querySelectorAll(".peoples");

  for (let i = 0; i < peoples.length; i++) {
    peoples[i].addEventListener( "click", ()=>{
      renderPopup(objData);
    })
  }
}

function renderPopup(obj) {
  const peoplePopup = {
    mainPop: document.querySelector(".peoples-popup"),
    popUpContent: document.querySelector(".peoples-popup__content"),
    imagesLarge: document.querySelector(".img-large"),
    title: document.querySelector(".popup-title"),
    street: document.querySelector(".people-street"),
    city: document.querySelector(".people-city"),
    state: document.querySelector(".people-state"),
    email: document.querySelector(".people-email"),
    phone: document.querySelector(".people-telephone")
  };

  for (let i = 0; i < obj.length; i++) {
    if (event.target.dataset.index == i + 1) {
      peoplePopup.title.innerHTML = `Full name: ${obj[i].name.title} . ${obj[i].name.first} ${obj[i].name.last}`;
      peoplePopup.city.innerHTML = `City: ${obj[i].location.city}`;
      peoplePopup.state.innerHTML = `State: ${obj[i].location.state}`;
      peoplePopup.email.innerHTML = `Mail: ${obj[i].email}`;
      peoplePopup.street.innerHTML = `street: ${obj[i].location.street}`;
      peoplePopup.phone.innerHTML = obj[i].phone;
      peoplePopup.imagesLarge.src = obj[i].picture.large;
    }
  }

  peoplePopup.mainPop.setAttribute("style", "display:block");
}
listenToTheEvent();
load(transferData, users);
