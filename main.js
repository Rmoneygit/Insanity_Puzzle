document.addEventListener("click", (e) => {
    cList = e.target.classList;
    let selectedItems = document.getElementsByClassName("selected");
    if(cList.contains("circle")) {
        if(cList.contains("red") || cList.contains("blue")) {
            if(selectedItems.length === 0) {
                cList.add("selected");
            }
            else if(cList.contains("selected")) {
              cList.remove("selected");  
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