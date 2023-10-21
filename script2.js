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
  tabSize = document.getElementById("table_size"),
  userInfo = document.querySelector(".userInfo"),
  table = document.querySelector("table"),
  filterData = document.getElementById("search")

let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
console.log(originalData);
let getData = [...originalData]
console.log(getData);



let isEdit = false, editId

var arrayLength = 0

var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0

showInfo()

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

uploadimg.onchange = function(){
    if(uploadimg.files[0].size < 1000000){   // 1MB = 1000000
        var fileReader = new FileReader()

        fileReader.onload = function(e){
            var imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(uploadimg.files[0])
    }

    else{
        alert("This file is too large!")
    }

}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    console.log("submitted");

    const information = {
        id: Date.now(),
        // picture: imgInput.src == undefined ? "./img/pic1.png" :imgInput.src,
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
        originalData.unshift(information)
    }
    else{
        originalData[editId] = information
    }
    getData = [...originalData]
    console.log(getData);
    localStorage.setItem('userProfile', JSON.stringify(originalData))

    // submitBtn.innerHTML = "Submit"
    // modalTitle.innerHTML = "Fill the Form"

    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset()

    showInfo()
})


function showInfo(){
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove())

    // var tab_start = startIndex - 1
    // var tab_end = endIndex

    if(getData.length > 0){
        for(var i=0; i<getData.length; i++){
            var staff = getData[i]


            if(staff){
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
                        <button onclick="readInfo('${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-eye"></i></button>
    
                        <button onclick="editInfo('${i}', '${staff.picture}', '${staff.fName}', '${staff.lName}', '${staff.ageVal}', '${staff.cityVal}', '${staff.positionVal}', '${staff.salaryVal}', '${staff.sDateVal}', '${staff.emailVal}', '${staff.phoneVal}')"><i class="fa-regular fa-pen-to-square"></i></button>
    
    
                        <button onclick = "deleteInfo(${i})"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
            </tr>`;

                userInfo.innerHTML += createElement
                table.style.minWidth = "1400px"
            }
        }
    }


    else{
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in table</td></tr>`
        table.style.minWidth = "1400px"
    }
}

showInfo()


// function readInfo(pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone){
//     imgInput.src = pic
//     fName.value = fname
//     lName.value = lname
//     age.value = Age
//     city.value = City
//     position.value = Position
//     salary.value = Salary
//     sDate.value = SDate
//     email.value = Email
//     phone.value = Phone

//     darkBg.classList.add('active')
//     popupForm.classList.add('active')
//     popupFooter.style.display = "none"
//     modalTitle.innerHTML = "Profile"
//     formInputFields.forEach(input => {
//         input.disabled = true
//     })


//     imgHolder.style.pointerEvents = "none"
// }

// function editInfo(id, pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone){
//     isEdit = true
//     editId = id

//     // Find the index of the item to edit in the original data based on id
//     const originalIndex = originalData.findIndex(item => item.id === id)

//     // Update the original data
//     originalData[originalIndex] = {
//         id: id,
//         picture: pic,
//         fName: fname,
//         lName: lname,
//         ageVal: Age,
//         cityVal: City,
//         positionVal: Position,
//         salaryVal: Salary,
//         sDateVal: SDate,
//         emailVal: Email,
//         phoneVal: Phone
//     }

//     imgInput.src = pic
//     fName.value = fname
//     lName.value = lname
//     age.value = Age
//     city.value = City
//     position.value = Position
//     salary.value = Salary
//     sDate.value = SDate
//     email.value = Email
//     phone.value = Phone


//     darkBg.classList.add('active')
//     popupForm.classList.add('active')
//     popupFooter.style.display = "block"
//     modalTitle.innerHTML = "Update the Form"
//     submitBtn.innerHTML = "Update"
//     formInputFields.forEach(input => {
//         input.disabled = false
//     })


//     imgHolder.style.pointerEvents = "auto"
// }

// function deleteInfo(index){
//     if(confirm("Aer you sure want to delete?")){
//         originalData.splice(index, 1);
//         localStorage.setItem("userProfile", JSON.stringify(originalData));
        
//         // Update getData after deleting the record
//         getData = [...originalData];


//         if(getData.length === 0){
//             currentIndex = 1
//             startIndex = 1
//             endIndex = 0
//         }
//         else if(currentIndex > maxIndex){
//             currentIndex = maxIndex
//         }

//         showInfo()

//     }
// }



// filterData.addEventListener("input", ()=> {
//     const searchTerm = filterData.value.toLowerCase().trim()

//     if(searchTerm !== ""){

//         const filteredData = originalData.filter((item) => {
//             const fullName = (item.fName + " " + item.lName).toLowerCase()
//             const city = item.cityVal.toLowerCase()
//             const position = item.positionVal.toLowerCase()

//             return(
//                 fullName.includes(searchTerm) ||
//                 city.includes(searchTerm) ||
//                 position.includes(searchTerm)
//             )
//         })

//         // Update the current data with filtered data
//         getData = filteredData
//     }

//     else{
//         getData = JSON.parse(localStorage.getItem('userProfile')) || []
//     }


//     currentIndex = 1
//     startIndex = 1
   
// })

