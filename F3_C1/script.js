console.log("smth");
var i = 1;

const addForm = (event) =>{

    event.preventDeafult();

    let formData = [];
    
    let form = {
        ID:i++,
        Name: document.getElementById("name").value,
        Age: document.getElementById("age").value,
        Profession: document.getElementById("profession").value,
    }

    formData.push(form);
    document.forms[0].reset();
    console.log(formData);
    alert("Form Submitted");
}


    document.getElementById("btn").addEventListener('click', addForm);
