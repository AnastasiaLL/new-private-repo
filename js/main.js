var users = "http://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture";
var cors_Api = "https://cors-anywhere.herokuapp.com/";
const domObj = {
  popUp: document.querySelectorAll(".peoples-popup"),
  btnSpaceClick: document.querySelectorAll(".open-information"),
  avatarUser: document.querySelectorAll(".img-medium"),
  titleUser: document.querySelectorAll(".peoples-title")
};

function load(callback, api) {
  fetch(cors_Api + api)
    .then(function(response) {
      console.log(response);
      return Promise.all([response.status, response.json()]);
    })
    .then(function(result) {
      if (result[0] != 200) {
        console.log("Ошибка");
      } else {
        callback(result[1]);
        console.log(result[1]);
      }
    })
    .catch(function(error) {
      alert("Ошибка");
    });
}

let objData;
function transform(data) {
  objData = data.results;
  render(objData);
}
function render(objData) {
  for (let i = 0; i < objData.length; i++) {
    let userObj = {
      gender: objData[i]["gender"],
      avatar: objData[i]["picture"]["medium"],
      avatarLarge: objData[i]["picture"]["large"],
      title: objData[i]["name"]["title"],
      first: objData[i]["name"]["first"],
      last: objData[i]["name"]["last"],
      street: objData[i]["location"]["street"],
      city: objData[i]["location"]["city"],
      state: objData[i]["location"]["state"],
      email: objData[i]["email"],
      phone: objData[i]["phone"]
    };
    domObj.avatarUser[i].src = userObj.avatar;
    domObj.titleUser[i].textContent = `${userObj.title}. ${userObj.first} ${userObj.last}`;
  }
}
function toClose() {
  document.querySelector(".peoples-popup").style.display = "none";
}
function sortAlphavite() {
  objData.sort(function(a, b) {
    if (a.name.last > b.name.last) {
      return 1;
    }
    if (a.name.last < b.name.last) return -1;
    if (a.name.last == b.name.last) return 0;
  });
  render(objData);
}
function backSort() {
  objData.sort(function(a, b) {
    if (a.name.last > b.name.last) {
      return -1;
    }
    if (a.name.last < b.name.last) return 1;
    if (a.name.last == b.name.last) return 0;
  });
  render(objData);
}

function listenToTheEvent() {
  document.querySelector(".close").addEventListener("click", toClose);
  document
    .getElementById("sortAlphavite")
    .addEventListener("click", sortAlphavite);
  document.getElementById("backSort").addEventListener("click", backSort);
  var elements = document.querySelectorAll(".peoples");
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function() {
      renderPopup(objData);
    };
  }
}

function renderPopup(obj) {
  const peoplePopup = {
    mainPop: document.querySelector(".peoples-popup"),
    popUpContent: document.querySelector(".peoples-popup-content"),
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
load(transform, users);
