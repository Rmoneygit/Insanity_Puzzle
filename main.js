document.addEventListener("click", (e) => {
    cList = e.target.classList;
    if(cList.contains("circle")) {
        if(cList.contains("red") || cList.contains("blue")) {
            cList.toggle("selected");
        }
        else {
            selectedPeg = document.getElementsByClassName("selected").item(0);
            if (selectedPeg != null) {
                selectedPeg.classList.toggle("selected");
                if(selectedPeg.classList.contains("blue")) {
                    cList.toggle("blue");
                    selectedPeg.classList.toggle("blue");
                }
                if(selectedPeg.classList.contains("red")) {
                    cList.toggle("red")
                    selectedPeg.classList.toggle("red");
                }
            }
        }
    }
});