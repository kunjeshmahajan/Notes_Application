
let addBtn = document.getElementById("add-button");
addBtn.addEventListener("click", function(e) {

  let addTitle = document.getElementById("note-title");
  let addText = document.getElementById("note-discription");
  
    if (addTitle.value == "" || addText.value == "") {
        return alert("Please add Note Title and Details")
    }

  let notes = localStorage.getItem("notes");
  if (notes == null)
   {
    notesObj = [];
  } 
  else {
    notesObj = JSON.parse(notes);
  }
  let myObj = {
    title: addTitle.value,
    text: addText.value
  }
  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addText.value = "";
  addTitle.value = "";
//   console.log(notesObj);
  showNotes();
});

function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function(element, index) {
    html += `
        <div class="note">
            <p class="note-counter">Note ${index + 1}</p>
            <h3 class="note-title"> ${element.title} </h3>
            <p class="note-text"> ${element.text}</p>
            <button id="${index}"onclick="deleteNote(this.id)" class="note-btn">Delete Note</button>
            <button id="${index}"onclick="editNote(this.id)" class="note-btn edit-btn">Edit Note</button>
        </div>
            `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
  } else {
    notesElm.innerHTML = `no notes available`;
  }
}


function deleteNote(index) {

    let confirmDel = confirm("Delete this note?");
    if (confirmDel == true) {
        let notes = localStorage.getItem("notes");
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        
        notesObj.splice(index, 1);
        //console.log(notesObj)
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
    }
  
}


function editNote(index) {
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("note-title");
    let addText = document.getElementById("note-discription");
    

    if (addTitle.value !== "" || addText.value !== "") {
      return alert("firstly clear the form")
    } 

    if (notes == null) {
      notesObj = [];
    } 
    else {

      notesObj = JSON.parse(notes);
    }
    

    notesObj.findIndex((element) => {
        
      addTitle.value = element.title;
      addText.value = element.text;
    })
    notesObj.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        showNotes();
}


showNotes();

