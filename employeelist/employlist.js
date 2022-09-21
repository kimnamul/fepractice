// TO IMPROVE
// 1. fetch all 12 employees
// 2 render them in html file

// TODO:
// check more about promises / async code
// after completing React project: check difference between imperative and declarative principles

const data = [];
let cscount = 0;
let firstopen = true;
getRandomUser()
  .then(() => {
    for (let i = 0; i < 12; i++) {
      // const res = await getUser()

      let cardhome = document.getElementById("upper1");

      let cardblock = document.createElement("div");
      cardblock.setAttribute("class", "cardblock");
      cardhome.appendChild(cardblock);
      cardblock.addEventListener("click", () => openInfo(i, 0));

      let cardimage = document.createElement("img");
      cardimage.setAttribute("src", data[i].image);
      cardblock.appendChild(cardimage);

      let cardname = document.createElement("div");
      cardname.setAttribute("class", "cardname");
      cardname.innerHTML = data[i].name;
      cardblock.appendChild(cardname);

      let cardtext = document.createElement("div");
      cardtext.setAttribute("class", "cardtext");
      cardtext.innerHTML = data[i].email + "<br /><br />" + data[i].city;
      cardblock.appendChild(cardtext);

      let cardusername = document.createElement("div");
      cardusername.setAttribute("class", "cardusername");
      cardusername.innerHTML = data[i].username;
      cardblock.appendChild(cardusername);
    }
  })
  .catch((err) => console.error(err));

// function naming -> lower case openInfo()
// class naming -> upper case

function openInfo(i, openindex) {
  console.log(i);
  if (i < 0 || i > 11) {
    return;
  }

  if (openindex === 0) {
    const info = document.getElementsByClassName("infoback");
    info[0].style.display = "flex";

    if (firstopen == true) {
      let infoback = document.getElementsByClassName("infoback");
      infoback[0].addEventListener("click", () => ExitInfo());

      let infoblock = document.getElementsByClassName("infoblock");
      infoblock[0].addEventListener("click", (event) => {
        event.stopPropagation();
      });

      let infoexit = document.getElementsByClassName("infoexit");
      infoexit[0].addEventListener("click", () => ExitInfo());

      firstopen = false;
    }
  }
  let infoimage = document.getElementsByClassName("infoimage");
  infoimage[0].setAttribute("src", data[i].image);

  let infoname = document.getElementsByClassName("infoname");
  infoname[0].innerHTML = "<br />" + data[i].name;

  let infotext = document.getElementsByClassName("infotext");
  infotext[0].innerHTML =
    "<br /><br />" +
    data[i].email +
    "<br /><br />" +
    data[i].city +
    "<br /><br /><hr><br />" +
    data[i].cell +
    "<br /><br />" +
    data[i].city +
    "," +
    data[i].state +
    "," +
    data[i].postcode +
    "<br /><br />Birthday: " +
    data[i].birth;

  let infoprev = document.getElementsByClassName("infoprev");
  infoprev[0].replaceWith(infoprev[0].cloneNode(true));
  infoprev[0].innerHTML = "Prev";
  infoprev[0].addEventListener("click", () => openInfo(i - 1, -1)); //if i > 0

  let infonext = document.getElementsByClassName("infonext");
  infonext[0].replaceWith(infonext[0].cloneNode(true));
  infonext[0].innerHTML = "Next";
  infonext[0].addEventListener("click", () => openInfo(i + 1, 1)); //if i < 11
}

function ExitInfo() {
  const info = document.getElementsByClassName("infoback");
  info[0].style.display = "none";
}

function Filter() {
  let search = document.getElementById("search").value.toLowerCase();
  let blocklist = document.getElementsByClassName("cardblock");

  for (let i = 0; i < blocklist.length; i++) {
    const sname = blocklist[i].getElementsByClassName("cardname");
    const susername = blocklist[i].getElementsByClassName("cardusername");
    if (
      sname[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
      susername[0].innerHTML.toLowerCase().indexOf(search) != -1
    ) {
      blocklist[i].style.display = "grid";
    } else {
      blocklist[i].style.display = "none";
    }
  }
}

async function getUserAPI() {
  const res = await fetch("https://randomuser.me/api/?results=12");
  const data = await res.json();
  console.log(data);
  return data;
}

async function getRandomUser() {
  try {
    const data = await getUserAPI();
    for (let i = 0; i < 12; i++) {
      const user = data.results[i];
      const newUser = {
        image: `${user.picture.large}`,
        name: `${user.name.first} ${user.name.last}`,
        username: `${user.login.username}`,
        email: `${user.email}`,
        city: `${user.location.city}`,
        state: `${user.location.state}`,
        postcode: `${user.location.postcode}`,
        cell: `${user.cell}`,
        birth: `${user.dob.date[2]}${user.dob.date[3]}/${user.dob.date[5]}${user.dob.date[6]}/${user.dob.date[8]}${user.dob.date[9]}`,
      };
      //   console.log(newUser);
      addData(newUser);
    }
  } catch (error) {
    // handle error case
    // console.error(error)
  }
}

// add User to data array
function addData(obj) {
  data.push(obj);
  //   console.log(data[cscount]);
  cscount++;
}
