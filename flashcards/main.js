const NUMBER_OF_PAIRS = 6;
const NUMBER_OF_ROWS = 2;

let time = 0;

let id = setInterval(function(){
    const timer = document.getElementById("timer");
    timer.innerText = (time / 10).toFixed(1) + "s";
    time += 1;
}, 100)

function range(n) {
    return [...Array(n).keys()];
}

let remaining = range(NUMBER_OF_PAIRS);

let nums1 = [];
let nums2 = [];

let a_click = "";
let b_click = "";

let done = [];
let uniqcount = 0;

function rand_below(n) {
    return Math.floor(Math.random() * n);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function new_rows() {
    if (JSON.stringify(remaining) === "[]") {
        clearInterval(id);
        console.log("done");
        return;
    }
    nums1 = range(Math.min(remaining.length, NUMBER_OF_ROWS)).map(function(_) {
        let i = rand_below(remaining.length);
        let ret = remaining[i];
        remaining.splice(i, 1);
        return ret
    });
    nums2 = shuffle([...nums1]);
    const el = document.getElementById("element");
    ih = "";
    const template = `<img id="$%" src="./images/$.jpeg" width="100px" onclick="javascript:clicked('$')" />`;
    for (i = 0; i < nums1.length; i++) {
        ih += "<p>" + template.replaceAll("$", nums1[i] + "a").replace("%", uniqcount + "") + " &emsp; " + template.replaceAll("$", nums2[i] + "b").replace("%", uniqcount + "") + "</p>\n"
    }
    el.innerHTML = ih;
}

function clicked(s) {
    const elem = document.getElementById(s + uniqcount);
    if (done.includes(s[0])) {
        return;
    }
    if (s[1] === "a") {
        if (a_click === s) {
            a_click = "";
            elem.classList.remove("dark");
        } else {
            a_click = s;
            elem.classList.add("dark");
        }
    } else {
        if (b_click === s) {
            b_click = "";
            elem.classList.remove("dark");
        } else {
            b_click = s;
            elem.classList.add("dark");
        }
    }
    if (a_click !== "" && b_click !== "") {
        if (a_click[0] === b_click[0]) {
            console.log("Correct!");
            document.getElementById(a_click + uniqcount).classList.remove("dark");
            document.getElementById(b_click + uniqcount).classList.remove("dark");
            document.getElementById(a_click + uniqcount).classList.add("done");
            document.getElementById(b_click + uniqcount).classList.add("done");
            done.push(a_click[0]);
        } else {
            console.log("Wrong")
            document.getElementById(a_click + uniqcount).classList.remove("dark");
            document.getElementById(b_click + uniqcount).classList.remove("dark");
        }
        a_click = "";
        b_click = "";
    }
    if (done.length === nums1.length) {
        done = [];
        uniqcount += 1;
        new_rows();
    }
}

new_rows();