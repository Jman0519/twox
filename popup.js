let input = document.getElementById("speed");
input.onchange = () => {
    console.log(input.value)
    chrome.storage.local.set({ "speed": input.value });
}