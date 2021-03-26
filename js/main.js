const _Score = document.querySelector(".score div");
const _time = document.querySelector(".time div");
const instruction = document.querySelector('.instruction')
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvas_width = canvas.width;
const canvas_height = canvas.height;
const vertical = 48;
const horizontal = 30;

let width = canvas_width / vertical;
let height = canvas_height / horizontal;

let time = 0;
let interval = 100;
let gameInterval;
 


window.onload = init();

function init() {
  game = new Game();
  update();
}

function update() {
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  game.drawBoard();
  game.update();
  time = 0;
}


gameInterval = setInterval(update, 100);

setInterval(() => {
  game.time++;
  let hour = Math.floor(game.time / 3600);
  let minute = Math.floor((game.time - hour * 3600) / 60);
  let second = game.time - (hour * 3600 + minute * 60);
  _time.innerHTML = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
}, 1000);
function pad(val) {
  let value = val.toString();
  if (value.length < 2) return `0${value}`;
}
const btn_play = document.getElementById('btn-play')
function Check(txt){
  if(txt.value != ''){
    btn_play.disabled = false
  }else{
    btn_play.disabled = true
  }
}

btn_play.addEventListener('click', (e) =>{
  instruction.classList.toggle('isVisible')
})