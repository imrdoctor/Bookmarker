var sitename = document.getElementById("bookmarkName");
var siteurl = document.getElementById("bookmarkURL");
var mydata = document.getElementById("mydata");
var serchInput = document.getElementById("serchinput");
var submitBtn = document.getElementById("submitBtn");
var submitUpdate = document.getElementById("submitUpdatebtn");
var error_window = document.getElementById("error_window")
var bookmarksContainer;
if (localStorage.getItem("marksLocal") == null) {
    bookmarksContainer = [];
} else {
    bookmarksContainer = JSON.parse(localStorage.getItem("marksLocal"));
    displaymarks(bookmarksContainer);
}

function clearform() {
    sitename.value = null;
    siteurl.value = null;
}

function supmit() {
    if (validateInputs(sitename) && validateInputs(siteurl)) {
    var pockmarkdata = {
        name: sitename.value,
        url: siteurl.value,
    };
    bookmarksContainer.push(pockmarkdata);
    clearform();
    displaymarks(bookmarksContainer);
    }
    else{
        error_window.classList.replace("d-none","d-block")
    }
}
function displaymarks(arry) {
    var cartona = "";
    for (var i = 0; i < arry.length; i++) {
        cartona += `<tr>
         <td>${[i + 1]}</td>
         <td>${arry[i].name}</td>
         <td><button onclick="visit(${i})" class="btn btn-outline-primary d-block m-auto mb-2">Visit <i class="fa-solid fa-eye pe-2"></i></button></td>
          <td><button onclick="edit(${i})" class="btn btn-outline-warning d-block m-auto mb-2">Edit <i class="fa-solid fa-pen"></i></button></td>
          <td><button onclick="deletemark(${i})" class="btn btn-outline-danger d-block m-auto mb-2">Delete <i class="fa-solid fa-trash-alt"></i></button></td>
          </tr>`;
    }
    mydata.innerHTML = cartona;
    localStorage.setItem("marksLocal", JSON.stringify(bookmarksContainer));
}
function visit(i) {
    var url = bookmarksContainer[i].url;
    window.open(url, "_blank");
}

function deletemark(i) {
    bookmarksContainer.splice(i, 1);
    displaymarks(bookmarksContainer);
    localStorage.setItem("marksLocal", JSON.stringify(bookmarksContainer));
}

function serch() {
    var term = serchInput.value;
    var serchedProdacts = [];
    for (var i = 0; i < bookmarksContainer.length; i++) {
        if (bookmarksContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            serchedProdacts.push(bookmarksContainer[i]);
        }
    }
    displaymarks(serchedProdacts);
}
var updaetindex;
function edit(index) {
    updaetindex = index;
    submitBtn.classList.add("d-none");
    submitUpdate.classList.replace("d-none", "d-block");
    sitename.value = bookmarksContainer[index].name;
    siteurl.value = bookmarksContainer[index].url;
}
function SubmitUpdate() {
    if (validateInputs(sitename) && validateInputs(siteurl)) {
        submitBtn.classList.replace("d-none", "d-block");
        submitUpdate.classList.replace("d-block", "d-none");
        bookmarksContainer[updaetindex].name = sitename.value;
        bookmarksContainer[updaetindex].url = siteurl.value;
        displaymarks(bookmarksContainer)
        clearform();
        localStorage.setItem("marksLocal", JSON.stringify(bookmarksContainer));
    }
    else{
        error_window.classList.replace("d-none","d-block")
    }

}
function validateInputs(element) {
    var regex = {
        "bookmarkName": /^\w{3,}(\s+\w+)*$/,
        "bookmarkURL": /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    };

    var id = element.getAttribute('id');
    var value = element.value;

    if (regex[id].test(value)) {
        console.log("matched");
        element.classList.remove("is-invalid");
        element.classList.add("is-valid");
        return true; 
    } else {
        console.log("not matched");
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        return false; 
    }
}
function close_btn(){
    error_window.classList.replace("d-block","d-none")
}
document.addEventListener('mousedown', function(event) {
    var error_window = document.getElementById('error_window');
    var alert_window = document.querySelector('.alert_window');
    if (!alert_window.contains(event.target)) {
        error_window.classList.replace('d-block', 'd-none');
    }
});