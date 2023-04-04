
// let formData = [];
var i = 1;

const addForm = (ev) =>{
    ev.preventDefault();

    let formData = [];
    
    let form = {
        ID:i++,
        Name: document.getElementById("name").value,
        Email: document.getElementById("email").value,
        Age: document.getElementById("age").value,
        GPA: document.getElementById("gpa").value,
        Degree: document.getElementById("degree").value
    }

    formData.push(form);
    document.forms[0].reset();
    // console.log(formData);
    // alert("Form Submitted");



    buildTable(formData);
}




document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener('click', addForm);
})






function deleteRow(rec) {
    var table = document.getElementById("table");
    var row = table.getElementsByTagName("tr")[rec]; 
    row.remove();
    i--;
}

function buildTable(data){
    var table = document.getElementById("myTable");

    for(var i=0; i<data.length; i++){
        var row = `<tr>
        <td>${data[i].ID}</td>
        <td>${data[i].Name}</td>
        <td>${data[i].Email}</td>
        <td>${data[i].Age}</td>
        <td>${data[i].GPA}</td>
        <td>${data[i].Degree} <button id="delete" onclick="deleteRow(${data[i].ID})">delete</button></td>
                   </tr>`
            
        table.innerHTML += row;
    }
}









function tableSearch() {
    let input, filter, table, tr, td, txtValue;

    //Intialising Variables
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }

}

