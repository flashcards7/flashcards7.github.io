const NUMBER_OF_ROWS = 6;

let time = 0;

let id = setInterval(function(){
    const timer = document.getElementById("timer");
    timer.innerText = (time / 10).toFixed(1) + "s";
    time += 1;
}, 100)

function range(n) {
    return [...Array(n).keys()];
}

var remaining = range(NUMBER_OF_PAIRS);;

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
    const el = document.getElementById("element");
    if (remaining.length < NUMBER_OF_ROWS) {
        stop_timer();
        el.innerHTML = "";
        return;
    }
    nums1 = range(NUMBER_OF_ROWS).map(function(_) {
        let i = rand_below(remaining.length);
        let ret = remaining[i];
        remaining.splice(i, 1);
        return ret;
    });
    nums2 = shuffle([...nums1]);
    ih = "";
    const template = `<img id="$` + uniqcount + `" src="./images/$.jpeg" height="100px" width="` + WIDTH + `px" onclick="javascript:clicked('$')" />`;
    for (i = 0; i < nums1.length; i++) {
        ih += "<p>" + template.replaceAll("$", nums1[i] + "a") + 
              " &emsp; " + template.replaceAll("$", nums2[i] + "b") + "</p>\n"
    }
    el.innerHTML = ih;
}

function clicked(s) {
    const elem = document.getElementById(s + uniqcount);
    if (done.includes(s.slice(0, -1))) {
        return;
    }
    if (s[s.length - 1] === "a") {
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
        if (a_click.slice(0, -1) === b_click.slice(0, -1)) {
            console.log("Correct!");
            document.getElementById(a_click + uniqcount).classList.remove("dark");
            document.getElementById(b_click + uniqcount).classList.remove("dark");
            document.getElementById(a_click + uniqcount).classList.add("done");
            document.getElementById(b_click + uniqcount).classList.add("done");
            document.getElementById(a_click + uniqcount).src = "../done.svg";
            document.getElementById(b_click + uniqcount).src = "../done.svg";
            done.push(a_click.slice(0, -1));
        } else {
            console.log("Wrong (+3s)")
            document.getElementById(a_click + uniqcount).classList.remove("dark");
            document.getElementById(b_click + uniqcount).classList.remove("dark");
            time += 30;
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

function stop_timer() {
    clearInterval(id);
    console.log("done");
}

document.onkeyup = function (e) {
    if ((e.ctrlKey || e.key === "Control") && e.key === "m") {
      stop_timer();
    }
};

new_rows();