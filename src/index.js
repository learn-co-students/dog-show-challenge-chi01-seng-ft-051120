const URL = "http://localhost:3000/dogs"

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    document.addEventListener("click", showDogInfo)
    document.getElementById("dog-form").addEventListener("submit", editDog)
})

function fetchDogs() {
    fetch(URL)
    .then(resp => resp.json())
    .then(data => renderDogs(data))
}

function renderDogs(data) {
    data.forEach(dog => {renderDog(dog)})
}

function renderDog(dog) {
    const table = document.getElementById("table-body")
    table.innerHTML += `<tr id=${dog.id}><td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button class="edit" data-dog-id="${dog.id}">Edit</button></td></tr>`
}

function showDogInfo(event) {
    if (event.target.className === "edit") {
        const thisDogRow = document.getElementById(`${event.target.dataset.dogId}`)
        document.getElementsByName("name")[0].value = thisDogRow.childNodes[0].textContent
        document.getElementsByName("breed")[0].value = thisDogRow.childNodes[2].textContent
        document.getElementsByName("sex")[0].value = thisDogRow.childNodes[4].textContent
        document.getElementById("dog-form").class = event.target.dataset.dogId
    }
}

function editDog(event) {
    event.preventDefault();
    const dogUrl = URL + '/' + event.target.class
    const payload = {
        name: event.target.name.value,
        breed: event.target.breed.value,
        sex: event.target.sex.value
    }

    event.target.reset();

    const reqObj = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(payload)
    }

    fetch(dogUrl, reqObj)
    .then(resp => resp.json())
    .then(dog => editTableRow(dog))
}

function editTableRow(dog) {
    const dogRow = document.getElementById(`${dog.id}`)
    dogRow.innerHTML = `<tr id=${dog.id}><td>${dog.name}</td> 
    <td>${dog.breed}</td> 
    <td>${dog.sex}</td> 
    <td><button class="edit" data-dog-id="${dog.id}">Edit</button></td></tr>`
}