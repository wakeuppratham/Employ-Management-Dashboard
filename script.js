// DOM Elements
var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder = document.querySelector('.imgholder'),
    form = document.querySelector('form'),
    formInputFields = document.querySelectorAll('form input'),
    uploadimg = document.querySelector("#uploadimg"),
    fName = document.getElementById("fName"),
    lName = document.getElementById("lName"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    position = document.getElementById("position"),
    salary = document.getElementById("salary"),
    sDate = document.getElementById("start"),
    email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    entries = document.querySelector(".showEntries"),
    userInfo = document.querySelector(".userInfo"),
    table = document.querySelector("table"),
    filterData = document.getElementById("search");

// Data from localStorage
let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
console.log(originalData);
let getData = [...originalData];
console.log(getData);

// Event Listener for Add Member Button
newMemberAddBtn.addEventListener('click', () => {
    isEdit = false;
    console.log("Add member button clicked");
    darkBg.classList.add('active');
    popupForm.classList.add('active');
});

// Event Listener for Close Button
crossBtn.addEventListener('click', () => {
    console.log("Close button clicked");
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();
});

// Event Listener for Image Upload
uploadimg.onchange = function () {
    if (uploadimg.files[0].size < 1000000) {   // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(uploadimg.files[0]);
    } else {
        alert("This file is too large!");
    }
};

// Function to display user information
function showInfo() {
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove());

    if (getData.length > 0) {
        for (var i = 0; i < getData.length; i++) {
            var staff = getData[i];

            if (staff) {
                console.log("Displaying user information:", staff);
                let createElement = `<tr class="employeeDetails">
                    <td>${i + 1}</td>
                    <td><img src="${staff.picture}" alt="" width="40" height="40"></td>
                    <td>${staff.fName + " " + staff.lName}</td>
                    <td>${staff.ageVal}</td>
                    <td>${staff.cityVal}</td>
                    <td>${staff.positionVal}</td>
                    <td>${staff.salaryVal}</td>
                    <td>${staff.sDateVal}</td>
                    <td>${staff.emailVal}</td>
                    <td>${staff.phoneVal}</td>
                    <td>
                        <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-eye"></i></button>
                        <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                </tr>`;

                userInfo.innerHTML += createElement;
                table.style.minWidth = "1400px";
            }
        }
    } else {
        console.log("No user data available.");
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in the table</td></tr>`;
        table.style.minWidth = "1400px";
    }
}

// Initial call to display user information
showInfo();

// Function to populate form fields for read-only view
function readInfo(pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
    console.log("Read info called");
    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    age.value = Age;
    city.value = City;
    position.value = Position;
    salary.value = Salary;
    sDate.value = SDate;
    email.value = Email;
    phone.value = Phone;

    darkBg.classList.add('active');
    popupForm.classList.add('active');

    formInputFields.forEach(input => {
        input.disabled = true;
    });

    imgHolder.style.pointerEvents = "none";
}

// Function to populate form fields for editing
function editInfo(id, pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
    isEdit = true;
    editId = id;

    const originalIndex = originalData.findIndex(item => item.id === id);

    originalData[originalIndex] = {
        id: id,
        picture: pic,
        fName: fname,
        lName: lname,
        ageVal: Age,
        cityVal: City,
        positionVal: Position,
        salaryVal: Salary,
        sDateVal: SDate,
        emailVal: Email,
        phoneVal: Phone
    };

    imgInput.src = pic;
    fName.value = fname;
    lName.value = lname;
    age.value = Age;
    city.value = City;
    position.value = Position;
    salary.value = Salary;
    sDate.value = SDate;
    email.value = Email;
    phone.value = Phone;

    darkBg.classList.add('active');
    popupForm.classList.add('active');

    formInputFields.forEach(input => {
        input.disabled = false;
    });

    imgHolder.style.pointerEvents = "auto";
}

// Function to delete user information
function deleteInfo(index) {
    if (confirm("Are you sure you want to delete?")) {
        originalData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(originalData));
        getData = [...originalData];
        console.log("User deleted. Updated data:", getData);
        showInfo();
    }
}

// Event Listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("Form submitted");

    const information = {
        id: Date.now(),
        picture: imgInput.src == undefined ? "./img/pic1.png" : imgInput.src,
        fName: fName.value,
        lName: lName.value,
        ageVal: age.value,
        cityVal: city.value,
        positionVal: position.value,
        salaryVal: salary.value,
        sDateVal: sDate.value,
        emailVal: email.value,
        phoneVal: phone.value
    };

    if (!isEdit) {
        originalData.unshift(information);
    } else {
        originalData[editId] = information;
    }
    getData = [...originalData];
    console.log("Updated data after form submission:", getData);
    localStorage.setItem('userProfile', JSON.stringify(originalData));

    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();

    showInfo();
});

// Event Listener for filtering data
filterData.addEventListener("input", () => {
    const searchTerm = filterData.value.toLowerCase().trim();

    if (searchTerm !== "") {
        const filteredData = originalData.filter((item) => {
            const fullName = (item.fName + " " + item.lName).toLowerCase();
            const city = item.cityVal.toLowerCase();
            const position = item.positionVal.toLowerCase();

            return (
                fullName.includes(searchTerm) ||
                city.includes(searchTerm) ||
                position.includes(searchTerm)
            );
        });

        getData = filteredData;
    } else {
        getData = JSON.parse(localStorage.getItem('userProfile')) || [];
    }
    console.log("Filtered data:", getData);
});
