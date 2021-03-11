document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}
var issuesClosed = localStorage.getItem('issuesClosed') || 0;
const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  if(currentIssue.status != 'Closed'){

    currentIssue.status = 'Closed';
    currentIssue.description = `<del> ${currentIssue.description}</del>`;
    localStorage.setItem('issues', JSON.stringify(issues));
    issuesClosed++;
    localStorage.setItem('issuesClosed', issuesClosed);
  }


  fetchIssues ();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id != id );
  localStorage.setItem('issues', JSON.stringify(remainingIssues));

  const remainingC = issues.find(issue => issue.id == id );
  if(remainingC.status == 'Closed'){
    issuesClosed--;
    localStorage.setItem('issuesClosed', issuesClosed);
  }
 
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;

  }
  document.getElementById('total').innerText = issues.length;
  document.getElementById('remain').innerText = issues.length - issuesClosed;

}
