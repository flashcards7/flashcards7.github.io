let answered = 0;
let game_on = true;

let a = 0;
let q = "";

let id = setInterval(async function(){
    const timer = document.getElementById("countdown");
    timer.innerText = (x = timer.innerText.slice(0, -1) - 0.1).toFixed(1) + "s";
    if (x <= 0) {
        end();
    }
}, 100)

function randint(a, b) {
    return a + Math.floor(Math.random() * (b - a));
}

function evaluate(x, op, y) {
    let str = x + " " + op + " " + y
    return [str, eval(str)];
}

function choice(l) {
    return l[Math.floor(Math.random() * l.length)];
}

function generate_problem(difficulty) {
    switch (difficulty) {

        case 0:

            /*************************
             *        LEVEL 0        *
             *                       *
             * single-digit addition *
             *************************/

            return (
                a = randint(1, 10),
                b = randint(1, 10),
                evaluate(a, "+", b)
            );


        case 1:

            /*************************
             *        LEVEL 1        *
             *                       *
             * two-digit addition or *
             * one-digit subtraction *
             *************************/

            return choice(
                [
                    (
                        a = randint(10, 25),
                        b = randint(10, 25),
                        evaluate(a, "+", b)
                    ),
                    (
                        a = randint(2, 10),
                        b = randint(1, a),
                        evaluate(a, "-", b)
                    )
                ]
            );


        case 2:

            /*************************
             *        LEVEL 2        *
             *                       *
             * one-digit multiplica- *
             * tion, larger two-     *
             * digit addition or     *
             * two-digit subtraction *
             *************************/

            return choice(
                [
                    (
                        a = randint(10, 100),
                        b = randint(10, 100),
                        evaluate(a, "+", b)
                    ),
                    (
                        a = randint(10, 50),
                        b = randint(1, a),
                        evaluate(a, "-", b)
                    ),
                    (
                        a = randint(2, 10),
                        b = randint(2, 10),
                        evaluate(a, "*", b)
                    )
                ]
            );


        case 3:
            
            /*************************
             *        LEVEL 3        *
             *                       *
             * three-digit addition, *
             * two-digit subtraction *
             * more multiplication,  *
             * or basic division     *
             *************************/

            return choice(
                [
                    (
                        a = randint(100, 500),
                        b = randint(100, 500),
                        evaluate(a, "+", b)
                    ),
                    (
                        a = randint(10, 100),
                        b = randint(1, a),
                        evaluate(a, "-", b)
                    ),
                    (
                        a = randint(10, 25),
                        b = randint(2, 10),
                        evaluate(a, "*", b)
                    ),
                    (
                        a = randint(2, 10),
                        b = randint(2, 10),
                        evaluate(a * b, "/", b)
                    )
                ]
            );


        case 4:

            /*************************
             *        LEVEL 4        *
             *                       *
             * three-digit addition  *
             * or subtraction, two-  *
             * digit multiplication, *
             * or two-digit division *
             *************************/

            return choice(
                [
                    (
                        a = randint(100, 1000),
                        b = randint(100, 1000),
                        evaluate(a, "+", b)
                    ),
                    (
                        a = randint(100, 500),
                        b = randint(1, a),
                        evaluate(a, "-", b)
                    ),
                    (
                        a = randint(10, 50),
                        b = randint(10, 25),
                        evaluate(a, "*", b)
                    ),
                    (
                        a = randint(10, 25),
                        b = randint(10, 25),
                        evaluate(a * b, "/", b)
                    )
                ]
            );

    }
}

function new_question() {
    old_q = q;
    while (q === old_q) {
        [q, a] = generate_problem(Math.floor(answered / 10))
    }
    document.getElementById("question").innerText = q
}

function end() {
    clearInterval(id);
    game_on = false;
    document.getElementById("countdown").innerText = "Score: " + answered;
    document.getElementById("question").style.display = 'none';
    document.getElementById("input").style.display = 'none';
}

function check() {
    if (document.getElementById("input").value === a + "") {
        answered += 1;
        new_question();
        document.getElementById("countdown").innerText = (document.getElementById("countdown").innerText.slice(0, -1) - -1.5).toFixed(1) + "s";
        document.getElementById("input").value = "";
    }
}

document.getElementById("input").addEventListener("input", check);

new_question();

document.getElementById("input").focus()
