// Variable Declarations

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
  sDate = document.getElementById("sDate"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  entries = document.querySelector(".showEntries"),
  tabSize = document.getElementById("table_size"),
  userInfo = document.querySelector(".userInfo"),
  table = document.querySelector("table"),
  filterData = document.getElementById("search");


// retrieves the value stored in the 'userProfile' key in the
//  browser's local storage using localStorage.getItem('userProfile').

let originalData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []
let getData = [...originalData]


let isEdit = false, editId;

var arrayLength = 0
var tableSize = 10
var startIndex = 1
var endIndex = 0
var currentIndex = 1
var maxIndex = 0;


// showInfo();

// Event Listeners

newMemberAddBtn.addEventListener('click', () => {
  isEdit = false
  submitBtn.innerHTML = "Submit"
  modalTitle.innerHTML = "Fill the Form"
  popupFooter.style.display = "block"
  imgInput.src = "./img/pic1.jpg"
  darkBg.classList.add('active')
  popupForm.classList.add('active')
});

crossBtn.addEventListener('click', () => {
  darkBg.classList.remove('active')
  popupForm.classList.remove('active')
  form.reset()
});

uploadimg.onchange = function () {
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

};

form.addEventListener('submit', (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Create an object 'information' with form data
    const information = {
        id: Date.now(),
        picture: imgInput.src == undefined ? "./img/pic1.png" :imgInput.src,
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

    // Check if it's in edit mode and update the data accordingly
    if (!isEdit) {
        originalData.unshift(information);
    } else {
        originalData[editId] = information;
    }

    // Update 'getData' and store in local storage
    getData = [...originalData];
    localStorage.setItem('userProfile', JSON.stringify(originalData));

    // Reset form and update UI
    submitBtn.innerHTML = "Submit";
    modalTitle.innerHTML = "Fill the Form";
    darkBg.classList.remove('active');
    popupForm.classList.remove('active');
    form.reset();

    highlightIndexBtn();
    displayIndexBtn();
    showInfo();

    // Update 'next' and 'prev' button visibility based on the current index
    var nextBtn = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev");
    if (Math.floor(maxIndex) > currentIndex) {
        nextBtn.classList.add("act");
    } else {
        nextBtn.classList.remove("act");
    }

    if (currentIndex > 1) {
        prevBtn.classList.add("act");
    }
});

filterData.addEventListener("input", () => {
    // Get the value from the input, convert to lowercase, and trim whitespace
    const searchTerm = filterData.value.toLowerCase().trim();

    // Check if there's a search term
    if (searchTerm !== "") {
        // Filter the original data based on the search term
        const filteredData = originalData.filter((item) => {
            const fullName = (item.fName + " " + item.lName).toLowerCase();
            const city = item.cityVal.toLowerCase();
            const position = item.positionVal.toLowerCase();

            // Return true if any of the fields includes the search term
            return (
                fullName.includes(searchTerm) ||
                city.includes(searchTerm) ||
                position.includes(searchTerm)
            );
        });

        // Update 'getData' with filtered data
        getData = filteredData;
    } else {
        // If there's no search term, use the original data from local storage
        getData = JSON.parse(localStorage.getItem('userProfile')) || [];
    }

    // Reset indices and update pagination buttons
    currentIndex = 1;
    startIndex = 1;
    displayIndexBtn();
});

// Functions

function preLoadCalculations() {
    array = getData
    arrayLength = array.length
    maxIndex = arrayLength / tableSize

    if((arrayLength % tableSize) > 0){
        maxIndex++
    }
}


function displayIndexBtn() {
  preLoadCalculations()

    const pagination = document.querySelector('.pagination')

    pagination.innerHTML = ""

    pagination.innerHTML = '<button onclick="prev()" class="prev">Previous</button>'

    for(let i=1; i<=maxIndex; i++){
        pagination.innerHTML += '<button onclick= "paginationBtn('+i+')" index="'+i+'">'+i+'</button>'
    }

    pagination.innerHTML += '<button onclick="next()" class="next">Next</button>'

    highlightIndexBtn()
}
function highlightIndexBtn() {
    // Calculate the start and end indices based on the current index and table size
    startIndex = ((currentIndex - 1) * tableSize) + 1;
    endIndex = (startIndex + tableSize) - 1;

    // Adjust the end index if it exceeds the array length
    if (endIndex > arrayLength) {
        endIndex = arrayLength;
    }

    // If there are more than one page, add the 'act' class to the 'Next' button
    if (maxIndex >= 2) {
        var nextBtn = document.querySelector(".next");
        nextBtn.classList.add("act");
    }

    // Update the displayed range of entries
    entries.textContent = `Showing ${startIndex} to ${endIndex} of ${arrayLength} entries`;

    // Highlight the current page button in the pagination UI
    var paginationBtns = document.querySelectorAll('.pagination button');
    paginationBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('index') === currentIndex.toString()) {
            btn.classList.add('active');
        }
    });

    // Call the showInfo() function (which is not provided in the snippet)
    showInfo();
}

function showInfo() {
    // Remove existing elements with class "employeeDetails"
    document.querySelectorAll(".employeeDetails").forEach(info => info.remove());

    // Calculate the start and end indices for the current page
    var tab_start = startIndex - 1;
    var tab_end = endIndex;

    if (getData.length > 0) {
        // Iterate over the data within the current page range
        for (var i = tab_start; i < tab_end; i++) {
            var staff = getData[i];

            if (staff) {
                // Create a table row with employee details
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

                // Append the created element to the table
                userInfo.innerHTML += createElement;

                // Set a minimum width for the table
                table.style.minWidth = "1400px";
            }
        }
    } else {
        // If no data is available, display a message
        userInfo.innerHTML = `<tr class="employeeDetails"><td class="empty" colspan="11" align="center">No data available in the table</td></tr>`;
        table.style.minWidth = "1400px";
    }
}

// showInfo()

function readInfo(pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
  imgInput.src = pic
    fName.value = fname
    lName.value = lname
    age.value = Age
    city.value = City
    position.value = Position
    salary.value = Salary
    sDate.value = SDate
    email.value = Email
    phone.value = Phone

    darkBg.classList.add('active')
    popupForm.classList.add('active')
    popupFooter.style.display = "none"
    modalTitle.innerHTML = "Profile"
    formInputFields.forEach(input => {
        input.disabled = true
    })


    imgHolder.style.pointerEvents = "none"
}

function editInfo(id, pic, fname, lname, Age, City, Position, Salary, SDate, Email, Phone) {
  isEdit = true
  editId = id

  // Find the index of the item to edit in the original data based on id
  const originalIndex = originalData.findIndex(item => item.id === id)

  // Update the original data
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
  }

  imgInput.src = pic
  fName.value = fname
  lName.value = lname
  age.value = Age
  city.value = City
  position.value = Position
  salary.value = Salary
  sDate.value = SDate
  email.value = Email
  phone.value = Phone


  darkBg.classList.add('active')
  popupForm.classList.add('active')
  popupFooter.style.display = "block"
  modalTitle.innerHTML = "Update the Form"
  submitBtn.innerHTML = "Update"
  formInputFields.forEach(input => {
      input.disabled = false
  })


  imgHolder.style.pointerEvents = "auto"
}

function deleteInfo(index) {
  if(confirm("Aer you sure want to delete?")){
    originalData.splice(index, 1);
    localStorage.setItem("userProfile", JSON.stringify(originalData));
    
    // Update getData after deleting the record
    getData = [...originalData];

    preLoadCalculations()

    if(getData.length === 0){
        currentIndex = 1
        startIndex = 1
        endIndex = 0
    }
    else if(currentIndex > maxIndex){
        currentIndex = maxIndex
    }

    showInfo()
    highlightIndexBtn()
    displayIndexBtn()

    var nextBtn = document.querySelector('.next')
    var prevBtn = document.querySelector('.prev')

    if(Math.floor(maxIndex) > currentIndex){
        nextBtn.classList.add("act")
    }
    else{
        nextBtn.classList.remove("act")
    }


    if(currentIndex > 1){
        prevBtn.classList.add('act')
    }
}
};

function next() {
  var prevBtn = document.querySelector('.prev')
  var nextBtn = document.querySelector('.next')

  if(currentIndex <= maxIndex - 1){
      currentIndex++
      prevBtn.classList.add("act")

      highlightIndexBtn()
  }

  if(currentIndex > maxIndex - 1){
      nextBtn.classList.remove("act")
  }
}

function prev() {
  var prevBtn = document.querySelector('.prev')

  if(currentIndex > 1){
      currentIndex--
      prevBtn.classList.add("act")
      highlightIndexBtn()
  }

  if(currentIndex < 2){
      prevBtn.classList.remove("act")
  }
}

function paginationBtn(i) {
  currentIndex = i

  var prevBtn = document.querySelector('.prev')
  var nextBtn = document.querySelector('.next')

  highlightIndexBtn()

  if(currentIndex > maxIndex - 1){
      nextBtn.classList.remove('act')
  }
  else{
      nextBtn.classList.add("act")
  }


  if(currentIndex > 1){
      prevBtn.classList.add("act")
  }

  if(currentIndex < 2){
      prevBtn.classList.remove("act")
  }
}

displayIndexBtn()




