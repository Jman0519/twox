let input = document.getElementById("speed");
let button = document.getElementById("set");

let rate = Number(chrome.storage.local.get("speed").speed);
if (!Number.isFinite(rate)) {
    rate = 1.0;
}

input.value = rate;

button.onclick = () => {
    console.log(input.value)
    chrome.storage.local.set({ "speed": input.value });
}