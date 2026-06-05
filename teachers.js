function getTeachers(){
    return JSON.parse(localStorage.getItem("teachers")) || [];
}

function saveTeachers(data){
    localStorage.setItem("teachers", JSON.stringify(data));
}

/* ================= SAVE TEACHER ================= */

const form = document.getElementById("teacherForm");

if(form){
form.addEventListener("submit", function(e){
    e.preventDefault();

    let teachers = getTeachers();

    let fileInput = document.getElementById("photo");
    let fileName = fileInput.files[0] ? fileInput.files[0].name : "";

    let teacher = {
        id: Date.now(),
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        gender: document.getElementById("gender").value,
        subject: document.getElementById("subject").value,
        status: document.getElementById("status").value,
        address: document.getElementById("address").value,
        photo: fileName   // optional
    };

    teachers.push(teacher);
    saveTeachers(teachers);

    alert("Teacher Saved Successfully");
    window.location.href = "view-teachers.html";
});
}

/* ================= RENDER TEACHERS ================= */

function render(){
    let tbody = document.getElementById("tbody");
    if(!tbody) return;

    let teachers = getTeachers();

    tbody.innerHTML = "";

    teachers.forEach(t => {

        tbody.innerHTML += `
        <tr>
            <td>${t.name}</td>
            <td>${t.email}</td>
            <td>${t.phone}</td>
            <td>${t.subject}</td>
            <td>
                <span class="badge ${t.status.toLowerCase()}">
                    ${t.status}
                </span>
            </td>
            <td class="actions">
                <button class="edit" onclick="editTeacher(${t.id})">Edit</button>
                <button class="delete" onclick="deleteTeacher(${t.id})">Delete</button>
            </td>
        </tr>`;
    });
}

/* ================= DELETE ================= */

function deleteTeacher(id){
    let teachers = getTeachers();
    teachers = teachers.filter(t => t.id !== id);
    saveTeachers(teachers);
    render();
}

/* ================= SEARCH ================= */

document.addEventListener("input", function(e){
    if(e.target.id === "search"){
        let value = e.target.value.toLowerCase();
        let rows = document.querySelectorAll("tbody tr");

        rows.forEach(row => {
            row.style.display =
            row.innerText.toLowerCase().includes(value)
            ? ""
            : "none";
        });
    }
});

/* INIT */
render();