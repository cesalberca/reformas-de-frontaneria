let e;var t;(t=e||(e={}))[t.EMPTY=-2]="EMPTY",t[t.NOT_PRESENT=-1]="NOT_PRESENT",t[t.PRESENT_BUT_NOT_IN_CORRECT_POSITION=0]="PRESENT_BUT_NOT_IN_CORRECT_POSITION",t[t.PRESENT_AND_IN_CORRECT_POSITION=1]="PRESENT_AND_IN_CORRECT_POSITION";function s(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}const r=new class{findAll(){return this.fetcher("https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json").then((e=>e.json()))}constructor(e){this.fetcher=e}}(window.fetch.bind(void 0)),i=new class{validate(t,s){return t.split("").map(((t,r)=>t===s[r]?e.PRESENT_AND_IN_CORRECT_POSITION:s.includes(t)?e.PRESENT_BUT_NOT_IN_CORRECT_POSITION:e.NOT_PRESENT))}},o=new class{async execute(e,t){return this.wordValidator.validate(e,t)}constructor(e){this.wordValidator=e}}(i),a=new class{async execute(e){const t=await this.wordsRepository.findAll();return t[Math.floor(e*t.length)]}constructor(e){this.wordsRepository=e}}(r),n=new class{start(e,t,s,r){this.maxRows=e,this.boardLength=t,this.printBoard(s,r)}printBoard(e,t){this.clearBoard();for(let s=0;s<this.maxRows;s++)this.printRow(e[s],t[s])}addEventListeners(e){this.form.addEventListener("submit",(async t=>{t.preventDefault(),this.element.value&&await e(this.element.value)}))}showWonMessage(){alert("You won! Try again!")}showLostMessage(e){alert(`You lost! The word to guess was ${e}. Try again!`)}clearInput(){this.element.value=""}clearBoard(){this.boardElement.innerHTML=""}printRow(e,t){const s=document.createElement("div");s.setAttribute("class","row");for(let r=0;r<this.boardLength;r++)this.printLetterCell(s,e[r],t?.[r]),this.boardElement.appendChild(s)}printLetterCell(t,s,r){const i=document.createElement("div");i.classList.add("cell"),void 0!==r&&(i.innerHTML=r);let o="";switch(s){case e.NOT_PRESENT:o="not-present";break;case e.PRESENT_AND_IN_CORRECT_POSITION:o="present-and-in-correct-position";break;case e.PRESENT_BUT_NOT_IN_CORRECT_POSITION:o="present-but-not-in-correct-position";break;case e.EMPTY:o="empty"}i.classList.add(o),t.appendChild(i)}constructor(){s(this,"boardElement",document.querySelector("#board")),s(this,"form",document.querySelector("#form")),s(this,"element",document.querySelector("#input")),s(this,"maxRows",6)}};new class{async start(){const e=Math.random();this.wordToGuess=await this.getRandomWordToGuessUseCase.execute(e),this.generateEmptyGuesses(),console.log(this.wordToGuess),this.view.start(this.maximumNumberOfTries,this.wordToGuess.length,this.tries,this.triedWords),this.view.addEventListeners(this.wordHandler.bind(this))}async wordHandler(e){const t=await this.getWordGuessesUseCase.execute(e,this.wordToGuess);if(this.tries[this.triedWords.length]=t,this.triedWords.push(e),this.updateView(),this.isWordGuessed(t))return this.view.showWonMessage(),void this.resetGame();return this.triedWords.length===this.maximumNumberOfTries&&(this.view.showLostMessage(this.wordToGuess),this.resetGame()),t}resetGame(){this.tries=[],this.triedWords=[],this.start()}updateView(){this.view.printBoard(this.tries,this.triedWords),this.view.clearInput()}generateEmptyGuesses(){for(let t=0;t<this.maximumNumberOfTries;t++){const t=[];for(let s=0;s<this.wordToGuess.length;s++)t.push(e.EMPTY);this.tries.push(t)}}isWordGuessed(t){return t.every((t=>t===e.PRESENT_AND_IN_CORRECT_POSITION))}constructor(e,t,s){this.view=e,this.getWordGuessesUseCase=t,this.getRandomWordToGuessUseCase=s,this.wordToGuess="",this.tries=[],this.triedWords=[],this.maximumNumberOfTries=6}}(n,o,a).start();
//# sourceMappingURL=index.d7197307.js.map
