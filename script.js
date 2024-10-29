const btn = document.getElementById("btn");
const birthdayInput = document.getElementById("birthday");
const result = document.getElementById("result");
result.style.display = "none";

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

let calculateYear, calculateDate, calculateMonth;

function calculateAge() {
  if (birthdayInput.value === "") {
    alert("sahi sahi date daalo bhai !!");
    return;
  }

  let inputDate = new Date(birthdayInput.value);
  //   console.log(inputDate);
  let birthYear = inputDate.getFullYear();
  let birthMonth = inputDate.getMonth() + 1; // +1 bcz month is 0 indexed in getmonth()
  let birthDate = inputDate.getDate();

  let today = new Date();
  let currYear = today.getFullYear();
  let currMonth = today.getMonth() + 1;
  let currDate = today.getDate();

  checkLeapYear(currYear);

  if (
    birthYear > currYear ||
    (birthMonth > currMonth && birthYear === currYear)
  ) {
    alert("baccha paida hi nhi hua bhai !!");
    return;
  }

  // calculating year
  calculateYear = currYear - birthYear;

  // calculating month
  if (currMonth >= birthMonth) {
    // agr currmonth birthmonth se bada hai to simple minus
    calculateMonth = currMonth - birthMonth;
  } else {
    // warna we have to borrow a month bcz pura bday complete nhi hua hai
    calculateYear--;
    calculateMonth = 12 + currMonth - birthMonth;
  }

  //calculating date
  if (currDate >= birthDate) {
    calculateDate = currDate - birthDate;
  } else {
    calculateMonth--;
    // let borrowedDays = months[currMonth - 2];
    let borrowedDays = currMonth === 1 ? months[11] : months[currMonth - 2];
    calculateDate = borrowedDays + currDate - birthDate;

    if (calculateMonth < 0) {
      // agr month negative me chla jaye means we are going prev yrs december so month ko 11 kr do & year ek piche
      calculateMonth = 11;
      calculateYear--;
    }
  }

  //   console.log(calculateYear, calculateMonth, calculateDate);

  result.style.display = "block";
  result.textContent = `Age: ${calculateYear} years, ${calculateMonth} months, and ${calculateDate} days.`;
}

function checkLeapYear(yr) {
  if (yr % 4 === 0 || (yr % 100 === 0 && yr % 400 === 0)) months[1] = 29;
  else months[1] = 28;
}

btn.addEventListener("click", calculateAge);
