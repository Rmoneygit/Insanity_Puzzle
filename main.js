document.addEventListener("click", (e) => {
    cList = e.target.classList;
    let selectedItems = document.getElementsByClassName("selected");
    if(cList.contains("circle")) {
        let color = "";
        color = cList.contains("red") ? "red" : color;
        color = cList.contains("blue") ? "blue" : color;
        if(color === "red" || color === "blue") {
            if(selectedItems.length === 0) {
                cList.add("selected");
                let from = parseInt(e.target.dataset.hole);
                addMovementHighlights(color, from);
            }
            else if(cList.contains("selected")) {
              cList.remove("selected");
              removeMovementHighlights();
            }

        }
        else if(selectedItems.length > 0) {
            selectedPeg = document.getElementsByClassName("selected").item(0);
            let from = parseInt(selectedPeg.dataset.hole);
            let to = parseInt(e.target.dataset.hole);

            if (selectedPeg != null) {
                if(selectedPeg.classList.contains("blue")) {
                    if(determineLegality("blue", from, to)) {
                        cList.toggle("blue");
                        selectedPeg.classList.toggle("blue");
                        selectedPeg.classList.toggle("selected");
                    }
                }
                if(selectedPeg.classList.contains("red")) {
                    if(determineLegality("red", from, to)) {
                        cList.toggle("red")
                        selectedPeg.classList.toggle("red");
                        selectedPeg.classList.toggle("selected");
                    }
                }
            }
            removeMovementHighlights();
            if(isSolution()) {
                window.alert("You solved the puzzle! Well done!");
            }
        }
    }
});

function determineLegality(color, from, to) {
    // to spot is not occupied
    // move is in the correct direction
    // move is either:
    //  one spot away
    //  two spots away, with a peg in the middle to hop over

    let holes = document.querySelectorAll("[data-hole]")
    let legal = true;

    if(holes[to].classList.contains("blue") || holes[to].classList.contains("red")) {
        legal = false;
    }

    if(color === "blue") {
        if(from < to) {
            legal = false;
        }
    }
    if(color === "red") {
        if(from > to) {
            legal = false;
        }
    }

    if(Math.abs(from - to) > 2) {
        legal = false;
    }

    if(Math.abs(from - to) === 2) {
        let mid = from < to ? from + 1: to + 1;

        if(!holes[mid].classList.contains("blue") && !holes[mid].classList.contains("red")) {
            legal = false;
        }
    }

    return legal;
}

function isSolution() {
    let holes = document.querySelectorAll("[data-hole]");
    let isSol = true;

    for(var i = 0; i < 10; i++) {
        if(i < 4) {
            if(!holes[i].classList.contains("blue")) {
                isSol = false;
            }
        }
        if(i > 5) {
            if(!holes[i].classList.contains("red")) {
                isSol = false;
            }
        }
    }

    return isSol;
}

function addMovementHighlights(color, from) {
    let holes = document.querySelectorAll("[data-hole]");

    for(var i = 0; i < 10; i++) {
        if(determineLegality(color, from, i)) {
            holes[i].classList.add("movement-highlight");
        }
    }
}

function removeMovementHighlights() {
    let holes = document.querySelectorAll("[data-hole]");

    for(var i = 0; i < 10; i++) {
        holes[i].classList.remove("movement-highlight");
    }
}

function resetBoard() {
    let holes = document.querySelectorAll("[data-hole]");
    for(var i = 0; i < 10; i++) {

        if(i < 4) {
            holes[i].classList.add("red")
        }
        else if(6 > i  && i >= 4) {
            holes[i].classList.remove("red");
            holes[i].classList.remove("blue");
        }
        else {
            holes[i].classList.add("blue")
        }
        holes[i].classList.remove("movement-highlight");
    }
}