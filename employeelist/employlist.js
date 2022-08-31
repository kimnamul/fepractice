// $.ajax({
//     url: 'https://randomuser.me/api/',
//     dataType: 'json',
//     success: function (data) {
//         console.log(data);
//     }
// });

let data = [];
let cscount = 0;
for (let i = 0; i < 12; i++) {
    getRandomUser().then(() => {
        let cardhome = document.getElementById("upper1");

        let cardblock = document.createElement("div");
        cardblock.setAttribute("class", "cardblock");
        cardhome.appendChild(cardblock);

        let cardimage = document.createElement("img");
        cardimage.setAttribute("src", data[i].image);
        cardblock.appendChild(cardimage);

        let cardname = document.createElement("div");
        cardname.setAttribute("class", "cardname");
        cardname.innerHTML = data[i].name;
        cardblock.appendChild(cardname);

        let cardtext = document.createElement("div");
        cardtext.setAttribute("class", "cardtext");
        cardtext.innerHTML = data[i].email+"<br /><br />"+data[i].city;
        cardblock.appendChild(cardtext);

        let cardusername = document.createElement("div");
        cardusername.setAttribute("class", "cardusername");
        cardusername.innerHTML = data[i].username;
        cardblock.appendChild(cardusername);

    })
}

function filter() {
    let search = document.getElementById("search").value.toLowerCase();
    let blocklist = document.getElementsByClassName("cardblock");

    for (let i = 0; i < blocklist.length; i++) {
        sname = blocklist[i].getElementsByClassName("cardname");
        susername = blocklist[i].getElementsByClassName("cardusername");
        if (sname[0].innerHTML.toLowerCase().indexOf(search) != -1 ||
            susername[0].innerHTML.toLowerCase().indexOf(search) != -1) {
            blocklist[i].style.display = "grid";
        }
        else {
            blocklist[i].style.display = "none";
        }
    }
}

//get random users and their money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    image: `${user.picture.large}`,
    name: `${user.name.first} ${user.name.last}`,
    username: `${user.login.username}`,
    email: `${user.email}`,
    city: `${user.location.city}`,
    state: `${user.location.state}`,
    postcode: `${user.location.postcode}`,
    cell: `${user.cell}`,
    birth: `${user.dob.date[2]}${user.dob.date[3]}/${user.dob.date[5]}${user.dob.date[6]}/${user.dob.date[8]}${user.dob.date[9]}`
  };
  //   console.log(newUser);

  addData(newUser);
}

// add User to data array
function addData(obj) {
  data.push(obj);
//   console.log(data[cscount]);
  cscount++;
}