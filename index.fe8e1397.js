fetch("https://gist.githubusercontent.com/cesalberca/3d0e343842c7697e0f788178e59fb471/raw/22bfe35c910dd02db78fec87fa39ca25cc604816/data.json").then((function(e){return e.json()})).then((function(e){var t=e[Math.floor(Math.random()*e.length)];console.log({word:t});var n=document.querySelector("#form"),o=document.querySelector("#input");n.addEventListener("submit",(function(e){e.preventDefault();var n=[];if(o.value===t){for(var r=[],u=0;u<t.length;u++)r.push(1);n=r}else for(var a=0;a<o.value.length;a++)o.value[a]===t[a]?n.push(1):-1!==t.indexOf(o.value[a])?n.push(0):n.push(-1);console.log({result:n})}))}));
//# sourceMappingURL=index.fe8e1397.js.map
