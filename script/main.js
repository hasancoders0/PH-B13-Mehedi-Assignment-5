const dataLoadWrapper = document.getElementById("data-load-container");
const apiIssuesTrackerUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let allData;
enableIssueLoader();
fetch(apiIssuesTrackerUrl)
.then(response => response.json())
.then(data => {

    allData = data.data;
    const defaultBtn = document.querySelector(".nav-wrapper button");
    loadAllIssues(defaultBtn);
    // Exit Loader when data will load
    disableIssueLoader();
    // console.log(allData);
});


// Modal Data
async function loadModal(id){
    enableModalLoader();
    const apiSingleIssueUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const response = await fetch(apiSingleIssueUrl);
    const modalData = await response.json();
    displayModalData(modalData.data);
    openModal();
    disableModalLoader();
}
function displayModalData(details){
    const dynamicModalData = document.getElementById("modal-details");
    dynamicModalData.innerHTML = "";
    let labels = "";

    details.labels.forEach(label => {
        if(label === "bug"){
            labels += `<span class="bug"><i class="fa-solid fa-bug"></i> ${label}</span>`;
        }
        else if(label === "help wanted"){
            labels += `<span class="help"><i class="fa-regular fa-life-ring"></i> ${label}</span>`;
        }
        else if(label === "enhancement"){
            labels += `<span class="enhancement"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</span>`;
        }else{
            labels += `<span class="other-labels">${label}</span>`;
        }
    });
    dynamicModalData.innerHTML = `
        <h1>${details.title}</h1>
        <div class="status-wrapper">
            <div class="text-status ${details.status}">${details.status}</div>
            <div class="separetor"></div>
            <p class="opened-by">Opened by ${details.author}</p>
            <div class="separetor"></div>
            <p class="date">${new Date(details.createdAt).toLocaleDateString("en-GB").replace(/\//g,"-")}</p>
        </div>
        <p class="modal-details">${details.description}</p>
        <div class="labels">${labels}</div>
        <div class="modal-bottom">
            <span>Assignee: <h2>${details.assignee ? details.assignee : 'Unassignee'}</h2></span>
            <span>Priority: <span class="priority ${details.priority.toLowerCase()}">${details.priority.toUpperCase()}</span></span>
            
        </div>
    `

    // console.log(dynamicModalData);
    // console.log(details);
}
function openModal(){
    const modalSec = document.getElementById("open_modal");
    const modalOverlay = document.getElementById("modal-overlay");
    modalSec.classList.remove("hidden");
    modalOverlay.classList.remove("hidden");
}
function closeModal(){
    const modalSec = document.getElementById("open_modal");
    const modalOverlay = document.getElementById("modal-overlay");
    modalSec.classList.add("hidden");
    modalOverlay.classList.add("hidden");
}
function specificDataList(datas){
    dataLoadWrapper.innerHTML = "";
    datas.forEach(data => {
        let labels = "";

        data.labels.forEach(label => {
            if(label === "bug"){
                labels += `<span class="bug"><i class="fa-solid fa-bug"></i> ${label}</span>`;
            }
            else if(label === "help wanted"){
                labels += `<span class="help"><i class="fa-regular fa-life-ring"></i> ${label}</span>`;
            }
            else if(label === "enhancement"){
                labels += `<span class="enhancement"><i class="fa-solid fa-arrow-up-right-dots"></i> ${label}</span>`;
            }else{
                labels += `<span class="other-labels">${label}</span>`;
            }
        });
       dataLoadWrapper.innerHTML += `
       <div class="card status-${data.status}" onclick="loadModal(${data.id})">
            <div class="inner-card">
                <div class="card-head">
                    <img src="./assets/${data.status === "open" ? 'Open-Status.png' : 'Closed-Status.png'}" alt="" class="status-open-icon">
                    <span class="priority ${data.priority.toLowerCase()}">${data.priority.toUpperCase()}</span>
                </div>
                <div class="issue-details">
                    <h3>${data.title}</h3>
                    <p>${data.description}</p>
                </div>
                <div class="labels">
                 ${labels}
                </div>
                <div class="card-bottom">
                    <div class="declare-by">
                        <p>#${data.id} by ${data.author}</p>
                        <p><strong>Assignee:</strong> ${data.assignee ? data.assignee : 'Unassignee'}</p>
                    </div>
                    <div class="date">
                        <p>${new Date(data.createdAt).toLocaleDateString("en-GB").replace(/\//g,"-")}</p>
                        <p><strong>Updated:</strong> ${new Date(data.updatedAt).toLocaleDateString("en-GB").replace(/\//g,"-")}</p>
                    </div>
                </div>
            </div>
        </div>
       `;
    });
    issuesCount();
}
function setActiveButton(clickedBtn) {

    const buttons = document.querySelectorAll(".nav-wrapper button");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    clickedBtn.classList.add("active");
}

function loadAllIssues(btn){
    setActiveButton(btn);
    enableIssueLoader();

    specificDataList(allData);
    disableIssueLoader();
}
function loadOpenIssues(btn){
    setActiveButton(btn);
    enableIssueLoader();

    const openIssues = allData.filter(data => data.status === "open");
    specificDataList(openIssues);
    disableIssueLoader();
}
function loadClosedIssues(btn){
    setActiveButton(btn);
    enableIssueLoader();

    const closeIssues = allData.filter(data => data.status === "closed");
    specificDataList(closeIssues);
    disableIssueLoader();
}
function loadSearchIssues(){
    enableIssueLoader();

    const closeIssues = allData.filter(data => data.status === "closed");
    specificDataList(closeIssues);
    disableIssueLoader();
}

function issuesCount(){
    const countHtml = document.getElementById("issues-count");
    countHtml.innerHTML = dataLoadWrapper.children.length;
}

function enableIssueLoader(){
    const loader = document.getElementById("issues-loader");
    loader.classList.remove("hidden");
}
function disableIssueLoader(){
    const loader = document.getElementById("issues-loader");
    loader.classList.add("hidden");
}
function enableModalLoader(){
    const loader = document.getElementById("modal-loader");
    loader.classList.remove("hidden");
}
function disableModalLoader(){
    const loader = document.getElementById("modal-loader");
    loader.classList.add("hidden");
}
