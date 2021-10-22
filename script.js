const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

function toggleButton() {
  button.disabled = !button.disabled;
}

function tellMe(joke) {
  VoiceRSS.speech({
    key: "4b0398ca84674fbfa0a35c4c5eb2eec5",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text-to-Speech
    tellMe(joke);
    //Disable Button
    toggleButton();
  } catch (error) {
    //Catch Error Here
    console.log("Error", error);
  }
}

//Event Listners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
