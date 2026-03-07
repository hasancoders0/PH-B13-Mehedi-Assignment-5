const dataLoadWrapper = document.getElementById("test-load");

function loadAllIssues(){
    dataLoadWrapper.innerText = "All";
    console.log("Nav All Cliked")
}
function loadOpenIssues(){
    dataLoadWrapper.innerText = "Open";
    console.log("Nav Open Cliked")
}
function loadClosedIssues(){
    dataLoadWrapper.innerText = "Closed";
    console.log("Nav Closed Cliked")
}

loadAllIssues();