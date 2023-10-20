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


document.querySelector("form").addEventListener("submit",(e)=>{
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
// Convert the object to a JSON string
const userJSON = JSON.stringify(info);

// Store the JSON string in local storage with a specific key
localStorage.setItem('userInfo', userJSON);

darkBg.classList.remove('active')
popupForm.classList.remove('active')
form.reset()

});

newMemberAddBtn.addEventListener("click",(e)=>{
    darkBg.classList.add('active')
    popupForm.classList.add('active')
});

crossBtn.addEventListener("click",(e)=>{
    darkBg.classList.remove('active')
    popupForm.classList.remove('active')
    form.reset();
});


  

