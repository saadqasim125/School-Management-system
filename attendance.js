function getStudents(){
    return JSON.parse(localStorage.getItem("students")) || [];
}

function getAttendance(){
    return JSON.parse(localStorage.getItem("attendance")) || [];
}

/* ---------------- ADD ATTENDANCE ---------------- */

function loadStudents(){

    let cls = document.getElementById("classSelect").value;
    let search = document.getElementById("search").value.toLowerCase();

    let students = getStudents().filter(s => s.className === cls);

    let body = document.getElementById("body");
    body.innerHTML = "";

    students
    .filter(s => s.name.toLowerCase().includes(search))
    .forEach(s => {

        body.innerHTML += `
        <tr>
            <td>${s.rollNo}</td>
            <td>${s.name}</td>
            <td><input type="number" id="p_${s.id}" value="0"></td>
            <td><input type="number" id="a_${s.id}" value="0"></td>
            <td><input type="number" id="l_${s.id}" value="0"></td>
        </tr>`;
    });
}

function saveAttendance(){

    let cls = document.getElementById("classSelect").value;
    let month = document.getElementById("month").value;

    let students = getStudents().filter(s => s.className === cls);
    let attendance = getAttendance();

    students.forEach(s => {

        attendance.push({
            class: cls,
            month: month,
            roll: s.rollNo,
            name: s.name,
            present: document.getElementById(`p_${s.id}`).value || 0,
            absent: document.getElementById(`a_${s.id}`).value || 0,
            leave: document.getElementById(`l_${s.id}`).value || 0
        });

    });

    localStorage.setItem("attendance", JSON.stringify(attendance));
    alert("Attendance Saved!");
}

/* ---------------- VIEW ATTENDANCE ---------------- */

function renderAttendance(){

    let data = getAttendance();

    let search = document.getElementById("search")?.value?.toLowerCase() || "";
    let cls = document.getElementById("filterClass")?.value || "";

    let body = document.getElementById("attBody");
    if(!body) return;

    body.innerHTML = "";

    data
    .filter(d =>
        d.name.toLowerCase().includes(search) &&
        (cls === "" || d.class === cls)
    )
    .forEach(d => {

        body.innerHTML += `
        <tr>
            <td>${d.class}</td>
            <td>${d.month}</td>
            <td>${d.roll}</td>
            <td>${d.name}</td>
            <td>${d.present}</td>
            <td>${d.absent}</td>
            <td>${d.leave}</td>
        </tr>`;
    });
}

window.onload = renderAttendance;