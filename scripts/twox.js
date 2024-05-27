document.onchange = main;
document.onlaod = main;
window.addEventListener("popstate", main)
console.log("started twox");

let vo;

function main() {
    console.log("ran main");
    function updateRate() {
        chrome.storage.local.get("speed").then((rate) => {
            // starts playing at 2x, but ads reset this
            let video = document.querySelector("video");
            rate = Number(rate.speed);
            video.playbackRate = rate;
        });
    }

    function skip() {
        let video = document.querySelector("video");
        if (Number.isFinite(video.duration)) {
            video.currentTime = video.duration;
        }
    }

    function clickSkip() {
        // to find the skip button, get all elements, untested
        let allVideoElements = document.body.querySelector("video").parentElement.parentElement.getElementsByTagName("*");
        for (let element of allVideoElements) {
            let innerHTML = element.innerHTML;
            if (innerHTML.includes("skip") || innerHTML.includes("Skip") || innerHTML.includes("SKIP")) {
                element.click();
            }
        }
    }

    function isAdShowing() {
        let videoContainer = document.body.querySelector("video").parentElement.parentElement
        let innerHTML = videoContainer.innerHTML;
        if (innerHTML.includes("sponsored") || innerHTML.includes("Sponsored") || innerHTML.includes("SPONSORED")) {
            return true;
        }
        return false;
    }

    function start() {
        let video = document.querySelector("video");
        if (video == null) {
            setTimeout(start, 100);
            return;
        }

        updateRate();

        if (vo) {
            delete vo;
        }

        vo = new MutationObserver(() => {
            console.log("detected change");
            updateRate();
            if (isAdShowing()) {
                skip();
                setTimeout(clickSkip, 10);
            }
        });

        vo.observe(video.parentElement.parentElement, { childList: true, subtree: true });
        console.log("ran start");
    }

    start();
}

main();