var newMemberAddBtn = document.querySelector('.addMemberBtn'),
    darkBg = document.querySelector('.dark_bg'),
    popupForm = document.querySelector('.popup'),
    crossBtn = document.querySelector('.closeBtn'),
    submitBtn = document.querySelector('.submitBtn'),
    modalTitle = document.querySelector('.modalTitle'),
    popupFooter = document.querySelector('.popupFooter'),
    imgInput = document.querySelector('.img'),
    imgHolder = document.querySelector('.imgholder')
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

var startIndex = 1;
var endIndex = 0;

let isEdit = false;
let editId;

// convert string back to array using json.parse and store the array in originalData
let originalData = new Array();
originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];
console.log(originalData);

// convert array to copy by reference using spread operator
// const getData = [...originalData];
// console.log(getData);

// v important

// Convert object to array of objects
let dataArray = Object.entries(originalData).map(([key, value]) => ({ [key]: value }));

// Merge objects into a single object
let mergedObject = dataArray.reduce((acc, obj) => {
    return { ...acc, ...obj };
  }, {});
  
  // Convert the object into an array
  let newArray = [mergedObject];
  
  console.log(newArray);





// Form Submitted

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("submitted");

    const info = {
        id: Date.now(),
        // picture: imgInput.src == undefined ? "./img/pic1.jpg" :imgInput.src,
        fName: fName.value,
        lName: lName.value,
        ageVal: age.value,
        cityVal: city.value,
        positionVal: position.value,
        salaryVal: salary.value,
        sDateVal: sDate.value,
        emailVal: email.value,
        phoneVal: phone.value
    }

    if(!isEdit){
        originalData.unshift(info);
    }
    else{
        originalData[editId] = info;
    }

    // getData = [...originalData];

    // Convert the object to a JSON string
    const userJSON = JSON.stringify(info);

    // Store the JSON string in local storage with a specific key as UserProfile

    localStorage.setItem('userProfile', userJSON);

    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()

});

// New Member Clicked

newMemberAddBtn.addEventListener("click", (e) => {
    darkBg.classList.add('active')
    popupForm.classList.add('active')
});

crossBtn.addEventListener("click", (e) => {
    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset();
});

//



// Show Info function to show entries in the table

function showInfo() {
    // if there exists a class employeedetails remove all entries under it 
    // else create a employeeDetails class that stores the entries

    document.querySelectorAll(".employeeDetails").forEach(info => info.remove());

    // if(dataArray.length==0){
    //     // html string
    //     userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
    //     table.style.minWidth = "1400px"
    // }
    // else {
        const staff = newArray[0];
        let createElement = `<tr class="employeeDetails">
            <td>1</td>
            <td><img  alt="" width="40" height="40"></td>
            <td>${staff.fName + " " + staff.lName}</td>
            <td>${staff.ageVal}</td>
            <td>${staff.cityVal}</td>
            <td>${staff.positionVal}</td>
            <td>${staff.salaryVal}</td>
            <td>${staff.sDateVal}</td>
            <td>${staff.emailVal}</td>
            <td>${staff.phoneVal}</td>
            <td>
            <button onclick="readInfo('${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-eye"></i></button>

            <button onclick="editInfo('${i}',  '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-pen-to-square"></i></button>


            <button onclick = "deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
        </td>
        </tr>`;

        userInfo.innerHTML += createElement;
        table.style.minWidth = "1400px";
    }

    
// }
showInfo();





