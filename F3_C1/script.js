

var i=1;
var formData =[{n:name,pro:profession,a:age}];

document.getElementById("btn").addEventListener('click', (ev) => {
    ev.preventDefault;

   

    var name = document.getElementById("name").value;
    var profession = document.getElementById("profession").value;
    var age = document.getElementById("age").value;


    if(name== "" || profession== "" || age== "" ){
        document.getElementById("error-notif").style.display="block"; 
        document.getElementById("success-notif").style.display="none";
    }else{
        document.getElementById("success-notif").style.display="block";
        setTimeout(() =>{
            document.getElementById("success-notif").style.display="none";
        },3000)
        document.getElementById("error-notif").style.display="none"; 
        document.getElementById("no-emp").style.display="none";

                formData.push({Name:name,pro:profession,a:age});
                console.log(formData);

    //     var emp = document.getElementById("emp-list");
    //     emp.innerHTML += 
    // `<div>${i++} &nbsp Name:${name} &nbsp Profession:${profession} &nbsp Age:${age}</div>`;

    const list_item = document.createElement('div');
    list_item.innerHTML = 
    `<div>${i++} &nbsp Name:${name} &nbsp Profession:${profession} &nbsp Age:${age}</div>`;
    list_item.style.display = "inline-block";
    list_item.style.padding = '10px';
    list_item.style.border = '1px solid white';
    list_item.style.borderRadius = '5px';
    list_item.style.margin = '10px';
    list_item.style.width = '30vw';
    list_item.style.textAlign = 'left';

    const delBtn = document.createElement("button");
    delBtn.innerHTML = `Delete User </br>`;
    delBtn.style.display = "inline-block";
    delBtn.style.padding = '10px 15px';
    delBtn.style.borderRadius = '5px';
    delBtn.style.border = "none";
    delBtn.style.backgroundColor = "#fff";
    delBtn.style.color = "#000";
    delBtn.style.cursor = "pointer";
    delBtn.addEventListener("click", () => {
        document.getElementById("emp-list").removeChild(list_item);
        i--;
        delBtn.style.display = "none";
    })

    const lineBreak = document.createElement("div");
    lineBreak.style.display = "block";

    document.getElementById("emp-list").appendChild(list_item);
    document.getElementById("emp-list").appendChild(delBtn);
    document.getElementById("emp-list").appendChild(lineBreak);
        
        
    }
  
    
});

