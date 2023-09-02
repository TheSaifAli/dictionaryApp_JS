const searchInput = document.querySelector("#searchInput");
const form = document.querySelector("form");
const searchWord = document.querySelector("#searchWord");
const partOfSpeech = document.querySelector("#partOfSpeech");
const definition = document.querySelector("#definition");
const example = document.querySelector("#example");
const exampleLabel = document.querySelector("#exampleLabel");
const usAudio = document.querySelector("#usAudio");

const fetchApi = async (word) => {
  try {
    searchWord.textContent = word;
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if(!res.ok)
    {
      document.querySelector('#antonymsHeading').innerText='';
      document.querySelector('#synonymsHeading').innerText='';
      const errors = await res.json();
      throw errors;
    }
    document.querySelector('#antonymsHeading').innerText='Antonyms';
      document.querySelector('#synonymsHeading').innerText='Synonyms';
    const data = await res.json();
    console.log(data);
    partOfSpeech.textContent = data[0].meanings[0].partOfSpeech;
    definition.textContent = data[0].meanings[0].definitions[0].definition;
    exampleLabel.textContent='Example:';
    example.innerText = data[0].meanings[0].definitions[0].example;
    usAudio.src = data[0].phonetics[1].audio;
    usAudio.setAttribute('controls','controls');
    searchInput.value = "";
      document.querySelector('#antonymsList').innerHTML =  data[0].meanings[0].antonyms.map((antonym)=>{
          return `<li>${antonym}</li>`
      });
      document.querySelector('#synonymsList').innerHTML =  data[0].meanings[0].synonyms.map((synonym)=>{
        return `<li>${synonym}</li>`
      });
  } 
  catch (errors) {
    partOfSpeech.innerText = errors.title;
    definition.textContent = errors.message;
    exampleLabel.textContent='Resolution:';
    example.textContent = errors.resolution;
    usAudio.removeAttribute('controls');

    document.querySelector('#antonymsList').innerHTML='';
    document.querySelector('#synonymsList').innerHTML='';
    searchInput.value = "";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputWord = searchInput.value;
  if (inputWord == "") {
    alert("Enter word please!!");
  } else {
    fetchApi(inputWord);
  }
});
