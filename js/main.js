const newNote = document.querySelector(".input-gorev");
const addButton = document.querySelector(".btn-gorev-ekle");
const noteUL = document.querySelector(".gorev-listesi");

localStorageControl();
reloadList();

let noteObject = Object({text:null,checked:null});

addButton.addEventListener('click', addNote);

noteUL.addEventListener('click', captureListEvent);

function addNote(e, check = false) {
    let storageItems = JSON.parse(localStorage.getItem('notes'));
    var content = newNote.value

    if(content){
        let trueorfalse = noteControl(content)
        if(!trueorfalse){
            noteObject.text = content
            noteObject.checked = check
        
            storageItems.push(noteObject)
            localStorage.setItem('notes', JSON.stringify(storageItems));
            createItem(noteObject)
        } else {alert('Aynı not tekrar eklenemez!')}
    } else {
        alert('Boş not giremezsin!')
    }
    newNote.value = "";
}

function removeNote(text) {
    let storageItems = JSON.parse(localStorage.getItem('notes'));
    let index = noteControlIndex(text)

    storageItems.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(storageItems))

    let ulList = document.querySelectorAll('.gorev-item')
    ulList[index].remove()
}

function checkedNote(text) {
    let storageItems = JSON.parse(localStorage.getItem('notes'));
    let index = noteControlIndex(text)
    let ulList = document.querySelectorAll('.gorev-item');
    ulList[index].classList.add('gorev-tamamlandi')

    storageItems[index].checked = true;
    localStorage.setItem('notes',JSON.stringify(storageItems));
}

function createItem(noteObject) {
    const itemDiv = document.createElement("div"); //DIV
    itemDiv.classList.add("gorev-item");
    noteUL.appendChild(itemDiv);
    const itemLi = document.createElement("li"); //LI
    itemLi.classList.add("gorev-icerik");
    itemLi.textContent = `${noteObject.text}`;
    itemDiv.appendChild(itemLi);
    const itemCheckBtn = document.createElement("button"); //CHECK BUTTON
    itemCheckBtn.classList.add("gorev-btn");
    itemCheckBtn.classList.add("gorev-btn-tamamlandi");
    itemCheckBtn.innerHTML = '<i class="far fa-check-circle"></i>';
    itemDiv.appendChild(itemCheckBtn);
    const itemRemoveBtn = document.createElement("button"); //REMOVE BUTTON
    itemRemoveBtn.classList.add("gorev-btn");
    itemRemoveBtn.classList.add("gorev-btn-sil");
    itemRemoveBtn.innerHTML = '<i class="far fa-trash-alt"></i>';
    itemDiv.appendChild(itemRemoveBtn);
  }

function captureListEvent(e) {
    if(e.target.classList.contains('gorev-btn-tamamlandi')){
        checkedNote(e.target.parentElement.textContent);
    }
    else if(e.target.classList.contains('gorev-btn-sil')){
        removeNote(e.target.parentElement.textContent);
    }
}

function reloadList(){
    let storageItems = JSON.parse(localStorage.getItem('notes'));
    if(storageItems.length > 0){
        storageItems.forEach((element,index) => {
            createItem(element);
            if(element['checked'] == true){
                let luList = document.querySelectorAll('.gorev-item');
                luList[index].classList.add('gorev-tamamlandi')
            }
        });
    }
}

function localStorageControl() {
    if(localStorage.getItem('notes') == null){
        localStorage.setItem('notes',JSON.stringify([]))
    }
}

function noteControl(content){
    let storageItems = JSON.parse(localStorage.getItem('notes'));

    let trueorfalse;
    if(storageItems.length > 0){
        storageItems.forEach(element => {
            if(element.text == content){
                trueorfalse = true;
            }
        });
    }
    return trueorfalse;
}

function noteControlIndex(content){
    let storageItems = JSON.parse(localStorage.getItem('notes'));

    let findIndex;
    if(storageItems.length > 0) {
        storageItems.forEach((element, index) => {
            if (element.text == content) {
                findIndex = index;
            }
        });
    }
    return findIndex;
}