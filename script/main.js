const dataLoadWrapper = document.getElementById("data-load-container");
const apiIssuesTrackerUrl = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
let allData;
fetch(apiIssuesTrackerUrl)
.then(response => response.json())
.then(data => {
    allData = data.data;
    loadAllIssues();
    // console.log(allData);
});

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
       <div class="card status-${data.status}" onclick="openModal(${data.id})">
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
function loadAllIssues(){
    specificDataList(allData);
    issuesCount();
}
function loadOpenIssues(){
    const openIssues = allData.filter(data => {
        return data.status === "open";
    });
    specificDataList(openIssues);
}
function loadClosedIssues(){
    const closeIssues = allData.filter(data => {
        return data.status === "closed";
    });
    specificDataList(closeIssues);
}

function issuesCount(){
    const countHtml = document.getElementById("issues-count");
    countHtml.innerHTML = dataLoadWrapper.children.length;
}
