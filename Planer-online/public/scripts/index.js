/*fetch('http://localhost:3000/fetchTest') //fetch napravi GET zahtjev na tu adresu, a za tu adresu sam
    .then(res => {                       //definiro sta radi u server.js jer je to moj server i tu se 
        return res.json();               //prihvacaju svi GET zahtjevi na moju stranicu
    })
    .then(data => {
        console.log(data.test);
    })*/


var dayNumeration = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat"
};
const date = new Date();

//inicijalizacija
//uzmi trenutni datum i ucitaj kalendar za taj mjesec
var selectedMonth;
var selectedYear;
//generateCalendar(selectedYear, selectedMonth);

//uzimanje teksta za datum; generiranje kalendara za novoodabranu godinu
let yearInput = document.querySelector("#year-text");
yearInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        generateCalendar(yearInput.value, selectedMonth);
        yearInput.blur();
    }
});

//generiranje kalendara za danasnji datum
setToTodaysDate();

function setToTodaysDate() {

    let currMonth = date.getMonth() + 1;
    let currYear = date.getFullYear();
    yearInput.value = currYear;
    generateCalendar(currYear, currMonth);
}

function getYear() {
    let year = document.querySelector("#year-text");
    year = year.value;
    year = parseInt(year);
    //alert(year);
    return year;
}

function findDoomsdayForYear(year) {
    /*let doomPerCent = {
        2400: 2,
        2300: 3,
        2200: 5, //ne radi zbog nekog razloga za okrugle godine
        2100: 0, //za svaku okruglu djeljivu s 400 treba maknut prijestupnu godinu
        2000: 2,
        1900: 3,
        1800: 5,
        1700: 0,
        1600: 2
    }*/
    let doomPerAnyCent = function (jahr) {
        if (((jahr % 400) + 400) % 400 == 0) return 2;
        else if (((jahr % 400) + 400) % 400 == 300) return 3;
        else if (((jahr % 400) + 400) % 400 == 200) return 5;
        else if (((jahr % 400) + 400) % 400 == 100) return 0;
        else alert("Error in generating calendar");
    }
    let tenths = year % 100; //uzme samo zadnje dvije znamenke
    let doomForCentury = year - tenths; //uzima koje je stoljece zadana godina
    let doomOffset = Math.floor(tenths / 12); // za svakih 12 godina ide +1, za svakih 24 ide + 2, itd...
    let nearestDay = doomOffset * 12; //najblizi offset zadanoj godini
    let distanceToDoom = tenths - nearestDay;

    //formula za izracunat doomsday za odredjenu godinu
    let doomForYear = (doomOffset + distanceToDoom + (Math.floor(distanceToDoom / 4)) + doomPerAnyCent(doomForCentury)) % 7; //umjesto doomPerAnyCent() moze i doomPerCent[doomForCentury]
    /*if (year % 100 == 0 && year % 400 != 0) {
        doomForYear = (doomForYear + 1) % 7;
    }*/

    //alert(doomPerAnyCent(doomForCentury));
    //alert(doomForYear);
    return doomForYear;
}
function firstOfMonthDay(year, month) {
    let doomsday = findDoomsdayForYear(year);
    let firstOfMonth = 0;

    if (month == 1) {
        if (year % 4 != 0) {
            //firstOfMonth = (doomsday - 2) % 7;
            firstOfMonth = (((doomsday - 2) % 7) + 7) % 7;
        } else {
            //firstOfMonth = (doomsday - 3) % 7;
            firstOfMonth = (((doomsday - 3) % 7) + 7) % 7;
        }
    } else if (month == 2) {
        if (year % 4 != 0) {
            //firstOfMonth = (doomsday - 27) % 7;
            firstOfMonth = (((doomsday - 27) % 7) + 7) % 7;
        } else {
            //firstOfMonth = (doomsday - 28) % 7;
            firstOfMonth = (((doomsday - 28) % 7) + 7) % 7;
        }
    } else if (month == 3) {
        firstOfMonth = (((doomsday - 13) % 7) + 7) % 7;
    } else if (month == 4) {
        firstOfMonth = (((doomsday - 3) % 7) + 7) % 7;
    } else if (month == 5) {
        firstOfMonth = (((doomsday - 8) % 7) + 7) % 7;
    } else if (month == 6) {
        firstOfMonth = (((doomsday - 5) % 7) + 7) % 7;
    } else if (month == 7) {
        firstOfMonth = (((doomsday - 10) % 7) + 7) % 7;
    } else if (month == 8) {
        firstOfMonth = (((doomsday - 7) % 7) + 7) % 7;
    } else if (month == 9) {
        firstOfMonth = (((doomsday - 4) % 7) + 7) % 7;
    } else if (month == 10) {
        firstOfMonth = (((doomsday - 9) % 7) + 7) % 7;
    } else if (month == 11) {
        firstOfMonth = (((doomsday - 6) % 7) + 7) % 7;
    } else if (month == 12) {
        firstOfMonth = (((doomsday - 11) % 7) + 7) % 7;
    } else {
        firstOfMonth = Nan;
    }
    //alert(firstOfMonth);
    return firstOfMonth;
}

function deleteCalendar() {
    let days = document.querySelectorAll(".day");
    days.forEach(day => {
        day.remove();
    });
}

function createDayElement(year, month, firstDay, i) { //ovo koristi funckija generateCalendar()
    let dan = document.createElement("a");
    dan.setAttribute("href", "/" + year + "/" + month + "/" + (i + 1));
    dan.classList.add("day");
    if ((firstDay + i) % 7 == 0) dan.classList.add("sunday");

    let dayName = document.createElement("p");
    dayName.classList.add("name-of-day");
    dayName.innerHTML = dayNumeration[(firstDay + i) % 7]

    let dayOfWeek = document.createElement("p");
    dayOfWeek.classList.add("num-of-day");
    dayOfWeek.innerHTML = i + 1;

    //dodaj jos jedan element "p" sa klasom text
    let availableTasks = document.createElement("p");
    availableTasks.classList.add("all-tasks");
    let avBlagdan = document.createElement("p");
    avBlagdan.classList.add("av-blagdan");
    availableTasks.appendChild(avBlagdan);
    let avTask = document.createElement("p");
    avTask.classList.add("av-task");
    availableTasks.appendChild(avTask);

    dan.appendChild(dayName);
    dan.appendChild(dayOfWeek);
    dan.appendChild(availableTasks);

    let calendar = document.querySelector(".calendar");
    calendar.appendChild(dan);
}

function generateCalendar(year, month) {

    selectedMonth = month;
    selectedYear = year;
    updateButtons(month);
    console.log("Year:" + selectedYear + "\nMonth: " + selectedMonth);
    deleteCalendar();
    let numOfPreDays;
    let numOfPostDays;
    let firstDay = firstOfMonthDay(year, month);
    let lastDay = 0;

    if ((month == 1 || month == 2) && year % 4 == 0 && year % 400 != 0 && year % 100 == 0) {
        firstDay = (firstDay + 1) % 7;
    }//normalizacija zbog godina djeljivih sa 100; moze se implementirat i u funkciji firstOfMonthDay(year, month)

    ////////////////////////ovaj if dio dodaje dane prijasnjeg mjeseca
    if (firstDay != 0) {
        numOfPreDays = firstDay - 1;
    } else {
        numOfPreDays = 6;
    }
    for (let i = 0; i < numOfPreDays; i++) {
        let dan = document.createElement("a");
        dan.classList.add("day");
        //dodaj atribut href
        let calendar = document.querySelector(".calendar");
        calendar.appendChild(dan);
    }
    ///////////////////////////////

    if (month <= 7) { //ovaj if dio se da ljepse napravit i dodaje dane odabranog mjeseca
        if ((month % 2 != 0) || (month == 1 && year % 4 == 0 && year % 400 == 0)) {
            //alert("tu sam");
            lastDay = (firstDay + 30) % 7;
            for (let i = 0; i < 31; i++) {
                createDayElement(year, month, firstDay, i);

            }


        } else if ((month == 2 && year % 4 != 0) || (month == 2 && year % 4 == 0 && year % 400 != 0 && year % 100 == 0)) {
            //if (year % 4 == 0 && year % 400 != 0) firstDay = (firstDay + 1) % 7; //ovo se moze spojit s gornjim if uvijetom
            lastDay = (firstDay + 27) % 7;
            for (let i = 0; i < 28; i++) {
                createDayElement(year, month, firstDay, i);

            }

        } else if (month == 2 && year % 4 == 0 /*&& year % 400 == 0*/) {
            lastDay = (firstDay + 28) % 7;
            for (let i = 0; i < 29; i++) {
                createDayElement(year, month, firstDay, i);

            }
        }
        else {
            lastDay = (firstDay + 29) % 7;
            for (let i = 0; i < 30; i++) {
                createDayElement(year, month, firstDay, i);

            }
        }
    } else {
        if (month % 2 == 0) {
            //alert("tu sam");
            lastDay = (firstDay + 30) % 7;
            for (let i = 0; i < 31; i++) {
                createDayElement(year, month, firstDay, i);

            }

        } else {
            lastDay = (firstDay + 29) % 7;
            for (let i = 0; i < 30; i++) {
                createDayElement(year, month, firstDay, i);

            }

        }
    }

    //uzimanje podataka sa backenda
    let sendObj = { year: year, month: month }
    fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(sendObj)
    }).then(response => response.json()).then(data => {
        //console.log(data)
        for (let jot = 0; jot < data.length; jot++) {
            let dayTum = data[jot].datum.split("-"); //ovo sve treba jer se cudno datum zapise u posgresu
            let monat = dayTum[1];
            let jahre = dayTum[0];
            let samoDan = dayTum[2].split("T")[0];
            let tip = data[jot].tipbiljeske;

            //console.log(jahre + "\n" + monat + "\n" + (parseInt(samoDan) + 1) + " " + data[jot].sadrzaj)

            let selectDays = document.querySelectorAll(".day");
            selectDays.forEach(selectday => {
                let tekstP = selectday.querySelector(".num-of-day")

                if (jahre == year && monat == month && tekstP != null && tekstP.innerHTML == parseInt(samoDan) + 1) {
                    /*let sadr = document.createElement("p");
                    sadr.classList.add("text");
                    sadr.innerHTML = "Ima";
                    selectday.appendChild(sadr);*/
                    if (tip == "blagdan") {
                        let sadr = selectday.querySelector(".av-blagdan");
                        sadr.classList.add("text");
                        sadr.innerHTML = "Blagdan";
                        //selectday.appendChild(sadr);
                    } else {
                        let sadr = selectday.querySelector(".av-task");
                        sadr.classList.add("text");
                        sadr.innerHTML = "Obaveza";
                    }
                }
            })
        }
    });
    /////////////////////////////////////

    if (lastDay != 0) { //ovaj if dio dodaje dane iz buduceg mjeseca
        numOfPostDays = 7 - lastDay;
    }
    /*else {
        numOfPreDays = 7;
    }*/
    for (let i = 0; i < numOfPostDays; i++) {
        let dan = document.createElement("a");
        dan.classList.add("day");
        //dodaj atribut href
        let calendar = document.querySelector(".calendar");
        calendar.appendChild(dan);
    }
    //console.log(numOfPostDays);

    ///////////////////////////////////////

    //oznacavanje danasnjeg dana
    let allDays = document.querySelectorAll(".day");
    allDays.forEach(day => {
        let dayNumber = day.querySelector(".num-of-day");

        if (dayNumber != null && dayNumber.innerHTML == date.getDate() && selectedMonth == date.getMonth() + 1 && selectedYear == date.getFullYear()) {
            //day.classList.add("current-day");
            day.setAttribute("id", "current-day");
        }
    });
}

function updateButtons(month) { //oznacava koji mjesec je odabran
    let monthsButt = document.querySelectorAll(".months p");
    //alert(dayNumeration[month])
    monthsButt.forEach(button => {
        if (button.getAttribute("month") == selectedMonth) {
            button.classList.add("selected-button");
        } else {
            button.classList.remove("selected-button");
        }
    });
}

function changeYear(newYear) { //promjena godine za strelice
    //alert(newYear)
    selectedYear = newYear;
    let yearText = document.querySelector("#year-text");
    yearText.value = newYear;
    generateCalendar(newYear, selectedMonth);
}