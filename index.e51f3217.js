fetch("https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json").then((e=>e.json())).then((e=>{const t=e[Math.floor(Math.random()*e.length)];console.log({word:t});const o=document.querySelector("#form"),l=document.querySelector("#input");o.addEventListener("submit",(e=>{e.preventDefault();let o=[];if(l.value===t){let e=[];for(let o=0;o<t.length;o++)e.push(1);o=e}else for(let e=0;e<l.value.length;e++)l.value[e]===t[e]?o.push(1):-1!==t.indexOf(l.value[e])?o.push(0):o.push(-1);console.log({result:o})}))}));
//# sourceMappingURL=index.e51f3217.js.map
