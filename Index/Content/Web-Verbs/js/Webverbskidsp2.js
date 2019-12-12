let guessedPlanets = [];
const planets = ["Mars", "Saturn", "Jupiter", "Venus", "Earth", "Mercury", "Uranus", "Neptune"];

function setName() {
  const name = $(".cat-name").val();
  $("#cat-name-set").text(name);
  $("#hat-cat-page").css("display", "block"); // block
  $("#name-cat-page").css("display", "none");
  // document.getElementById("spacecat-intro2").style.display = "block";
  $("#spacecat-intro2").css("display", "block"); // block
  $("#spacecat-intro").css("display", "none");
  $("#Jupiter").css("display", "none");
  $("#Correct").css("display", "none");
  $("#RememberPlanet").css("display", "none"); // none
  document.addEventListener("keypress", () => giveHat(name), {
    once: true
  });
}

function giveHat(name) {
  $("#cat").attr("src", "../images/catwithhat-04.svg");
  $("#spacecat-intro2").css("display", "none");
  $("#rocket-cat-name-set").text(name);
  $("#hat-cat-page").css("display", "none");
  $("#rocket-cat-page").css("display", "block");
  $("#Jupiter").css("display", "none");
  $("#Correct").css("display", "none");
  document.addEventListener("keypress", () => createRocket(name), {
    once: true
  });
}

function moveRight(e) {
  $("#spacecat-intro2").css("display", "none");
  $("#hat-cat-page").css("display", "none");
  $("#rocket-cat-page").css("display", "none");
  $("#rocket-move-page").css("display", "block");
  $("#Jupiter").css("display", "none");
  $("#Correct").css("display", "none");
  const rocket = $("#rocket");
  const docWidth = $(window).width();
  const rocketLeft = parseInt(rocket.css("left"), 10);
  if (rocketLeft >= docWidth + 210) {
    planetPage();
    return;
  }
  rocket.css("left", rocketLeft + 20 + "px");
}

function createRocket(name) {
  $("#cat").css("display", "none");
  $(".rocket").css("display", "block");
  $("#spacecat-intro2").css("display", "none");
  $("#rocket-move-cat-name-set").text(name);
  $("#hat-cat-page").css("display", "none");
  $("#rocket-cat-page").css("display", "none");
  $("#rocket-move-page").css("display", "block");
  $("#Jupiter").css("display", "none");
  $("#Correct").css("display", "none");
  document.addEventListener("keydown", moveRight);
}

function planetPage() {
  document.removeEventListener("keydown", moveRight);
  $("#planet1").css("display", "block");
  $("#rocket-move-page").css("display", "none");
  $("#spacecat-intro2").css("display", "none");
}

function verifyPlanet(e, planetName, planetNum) {
  console.log(planetName, planetNum);
  const planetId = "planet" + planetNum;
  if ($(`#${planetId}-text`).val() === planetName) {
    $(`#${planetName}`).css("display", "none");
    $(`#${planetName}-false`).css("display", "none");
    $(`#${planetId}`).css("display", "none");
    if (planetNum === 8) {
      RememberPlanet();
      return;
    }
    $(`#planet${planetNum + 1}`).css("display", "block");
  } else {
    $(`#${planetId}-false`).css("display", "block");
  }
}

function RememberPlanet() {
  var timer2 = "3:00";
  var interval = setInterval(function() {
    var timer = timer2.split(':');
    //by parsing integer, I avoid all extra string processing
    var minutes = parseInt(timer[0], 10);
    var seconds = parseInt(timer[1], 10);
    --seconds;
    minutes = (seconds < 0) ? --minutes : minutes;
    if (minutes < 0) clearInterval(interval);
    seconds = (seconds < 0) ? 59 : seconds;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    //minutes = (minutes < 10) ?  minutes : minutes;
    $('.countdown').html(minutes + ':' + seconds);
    timer2 = minutes + ':' + seconds;
    if (minutes <= 0 && seconds <= 0) {
      clearInterval(interval);
      alert("Times up!");
      window.location.href = "./Webverbskidsp2.html"
    }
  }, 1000);
  $("#spacecat-intro2").css("display", "none");
  $("#hat-cat-page").css("display", "none");
  $("#rocket-cat-page").css("display", "none");
  $("#RememberPlanet").css("display", "block");
}

function planetCheck() {
  // function PlanetCheck(){
  //  console.log(planetName, planetNum);
  // }
  const planet = $("#planet-guess").val();
  if (planets.indexOf(planet) > -1 && guessedPlanets.indexOf(planet) === -1) {
    $(`#${planet}-image`).css("display", "block");
    $("#PlanetCheckError").css("display", "none");
    guessedPlanets.push(planet);
    if (planets.length === guessedPlanets.length) {
      window.location.href = "./Webverbskidsend.html"
    }
    return;
  }
  $("#PlanetCheckError").css("display", "block");
  // Planet was matched
}