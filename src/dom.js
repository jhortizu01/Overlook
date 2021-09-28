import {pastContainer, 
currentContainer, futureContainer, customer, rooms, 
bookings,  fetchData, customerNumber, 
roomPics} from './scripts.js'

let homeContainer = document.getElementById('homeContainer')
let bookingContainer = document.getElementById('bookingContainer')
let welcome = document.getElementById('welcome')
let totalSpent = document.getElementById('totalSpent')
let dayjs = require('dayjs')

let dom = {

  addClass(element, classItem) {
    element.classList.add(classItem);
  },

  removeClass(element, classItem) {
    element.classList.remove(classItem);
  },

  clearCards(container) {
    let removeElement = document.getElementById(container)
    while (removeElement.firstChild) {
      removeElement.removeChild(removeElement.firstChild);
    }
  },

  goHome() {
    dom.removeClass(homeContainer, 'hidden');
    dom.addClass(bookingContainer, 'hidden');
    dom.addClass(pastContainer, 'hidden');
    dom.addClass(currentContainer, 'hidden');
    dom.addClass(futureContainer, 'hidden');
  },

  goBooking() {
    dom.addClass(homeContainer, 'hidden');
    dom.removeClass(bookingContainer, 'hidden');
    dom.addClass(pastContainer, 'hidden');
    dom.addClass(currentContainer, 'hidden');
    dom.addClass(futureContainer, 'hidden');
  },

  goPast() {
    dom.addClass(homeContainer, 'hidden');
    dom.addClass(bookingContainer, 'hidden');
    dom.removeClass(pastContainer, 'hidden');
    dom.addClass(currentContainer, 'hidden');
    dom.addClass(futureContainer, 'hidden');
  },
  
  goCurrent() {
    dom.addClass(homeContainer, 'hidden');
    dom.addClass(bookingContainer, 'hidden');
    dom.addClass(pastContainer, 'hidden');
    dom.removeClass(currentContainer, 'hidden');
    dom.addClass(futureContainer, 'hidden');
  },

  goFuture() {
    dom.addClass(homeContainer, 'hidden');
    dom.addClass(bookingContainer, 'hidden');
    dom.addClass(pastContainer, 'hidden');
    dom.addClass(currentContainer, 'hidden');
    dom.removeClass(futureContainer, 'hidden');
  },

  displayName() {
    let welcomeBack = `Welcome back ${customer.name}.`
    welcome.innerText = welcomeBack
  },

  displayTotalSpent() {
  let cost = bookings.findTotalSpent(customer.id, rooms.roomRepo)
    totalSpent.innerText = `You have spent $${cost} since your first booking.`
  },

  displayPastBookings(){
    bookings.pastCustomerBookings.map(booking => {
      let pastCard = document.createElement('section')
      pastCard.cassList = 'past-card'
      let convertBidet = dom.converToYorN(booking.bidet)
      let cardContent = 
      `<section aria-label="booking from ${booking.date}" class="booking-card"> 
      ${dom.findRoomPic(booking.roomType)}
      <p class="past-stay-card-info" aria-label="date of stay">Date: ${booking.date}</p>
      <p class="past-stay-card-info" aria-label="room number">Room Number: ${booking.roomNumber}</p>
      <p class="past-stay-card-info" aria-label="room charges">Room Service Charges: ${booking.roomServiceCharges}</p>
      <p class="past-stay-card-info" aria-label="room type">Room Type: ${booking.roomType}</p>
      <p class="past-stay-card-info" aria-label="was there a bidet?">Bidet?: ${convertBidet}</p>
      <p class="past-stay-card-info" aria-label="bedsize">Bed Size: ${booking.bedSize}</p>
      <p class="past-stay-card-info" aria-label="number of beds">Number of Beds: ${booking.numBeds}</p>
      <p class="past-stay-card-info" aria-label="cost per night">Cost Per Night: ${booking.costPerNight}</p>
      </section>`
      pastContainer.innerHTML += cardContent
    })
  },

  displayCurrentBookings() {
    if(bookings.currentCustomerBookings.length > 0){
    bookings.currentCustomerBookings.map(booking => {
      let currentCard = document.createElement('section')
      let convertBidet = dom.converToYorN(booking.bidet)
      let cardContent = 
      `<section aria-label="booking from ${booking.date}" class="booking-card"> 
      ${dom.findRoomPic(booking.roomType)}
      <p class="past-stay-card-info" aria-label="date of stay">Date: ${booking.date}</p>
      <p class="past-stay-card-info" aria-label="room number">Room Number: ${booking.roomNumber}</p>
      <p class="past-stay-card-info" aria-label="room type">Room Type: ${booking.roomType}</p>
      <p class="past-stay-card-info" aria-label="is there a bidet?">Bidet: ${convertBidet}</p>
      <p class="past-stay-card-info" aria-label="bedsize">Bed Size: ${booking.bedSize}</p>
      <p class="past-stay-card-info" aria-label="number of beds">Number of Beds: ${booking.numBeds}</p>
      <p class="past-stay-card-info" aria-label="cost per night">Cost Per Night: ${booking.costPerNight}</p>
      </section>`

      currentContainer.innerHTML += cardContent
    })
  } else {
    dom.addClass(currentContainer, "no-rooms")
    let content = `<section><p class="no-room-text" aria-label="No Current Bookings"> No current bookings. <br> Book a trip today!</p></section>`
    currentContainer.innerHTML += content
  }
},

  displayFutureBookings() {
    if(bookings.futureCustomerBookings.length > 0){
      bookings.futureCustomerBookings.map(booking => {
        let currentCard = document.createElement('section')
        let convertBidet = dom.converToYorN(booking.bidet)
        let cardContent = 
        `<section aria-label="booking from ${booking.date}" class="booking-card"> 
        ${dom.findRoomPic(booking.roomType)}
        <p class="future-stay-card-info" aria-label="date of stay">Date: ${booking.date}</p>
        <p class="future-stay-card-info" aria-label="room number">Room Number: ${booking.roomNumber}</p>
        <p class="future-stay-card-info" aria-label="room type">Room Type: ${booking.roomType}</p>
        <p class="future-stay-card-info" aria-label="is there a bidet?">Bidet?: ${convertBidet}</p>
        <p class="future-stay-card-info" aria-label="bedsize">Bed Size: ${booking.bedSize}</p>
        <p class="future-stay-card-info" aria-label="number of beds">Number of Beds: ${booking.numBeds}</p>
        <p class="future-stay-card-info" aria-label="cost per night">Cost Per Night: ${booking.costPerNight}</p>
        </section>`
  
        futureContainer.innerHTML += cardContent
      })
    } else {
      dom.addClass(futureContainer, "no-rooms")
      let content = `<section><p class="no-room-text" aria-label="No Current Bookings"> No future bookings. <br> Book a trip today!</p></section>`
      futureContainer.innerHTML += content
    }
  },

  getUserPreferences() {
    dom.removeClass(availableRoomsContainer, "no-rooms-preferences")
    let chooseDate = document.getElementById('start').value
    let formattedChooseDate = dayjs(chooseDate).format('YYYY/MM/DD')
    let roomType = document.getElementById('roomType').value
    let bidet = document.getElementById('bidet').value
    let bidetBoolean = dom.convertToBoolean(bidet)
    let bedSize = document.getElementById('bedSize').value
    let bedNumString = document.getElementById('bedNum').value
    let bedNum = Number(bedNumString)
    let allChoices = []

    allChoices.push(roomType, bidetBoolean, bedSize, bedNum)

    let userPreferences = allChoices.filter(preference => {
      return preference != "no preference" && preference != 0
    })

    bookings.findRoomsByDate(formattedChooseDate, rooms.roomRepo)
    let filteredChoices = bookings.filterByPreferences(userPreferences)

    if(filteredChoices.length > 0) {
      filteredChoices.map(booking => {
        let convertBidet = dom.converToYorN(booking.bidet)
        let currentCard = document.createElement('section')
        let cardContent = 
        `<section aria-label="booking from ${booking.date}" class="booking-card-new" id=" ${booking.number}"> 
        ${dom.findRoomPic(booking.roomType)}
        <p class="available-room-card" aria-label="date of stay">Date: ${chooseDate}</p>
        <p class="available-room-card" aria-label="room number">Room Number: ${booking.number}</p>
        <p class="available-room-card" aria-label="room type">Room Type: ${booking.roomType}</p>
        <p class="available-room-card" aria-label="was there a bidet?">Bidet?: ${convertBidet}</p>
        <p class="available-room-card" aria-label="bedsize">Bed Size: ${booking.bedSize}</p>
        <p class="available-room-card" aria-label="number of beds">Number of Beds: ${booking.numBeds}</p>
        <p class="available-room-card" aria-label="cost per night">Cost Per Night: ${booking.costPerNight}</p>
        <button aria-label="book stay" class="book-new-stay" id="bookNewStay">Book Room!</button>
        </section>`

        availableRoomsContainer.innerHTML += cardContent
      })
    } else {
      dom.addClass(availableRoomsContainer, "no-rooms-preferences")
      let content = `<section><p class="no-room-text" aria-label="No Rooms"> No rooms available for your date or preferences. Stop being so picky and try again!</p></section>`
      availableRoomsContainer.innerHTML += content
    }
  }, 

  postValidation(data, e) {
    let targetBtn = e.target
    if(data.message.includes('successfully posted')){
      targetBtn.closest("button").innerText = "Room Booked!"
    } else {
      targetBtn.closest("button").innerText = "Did not work. Try again later"}
  },

  bookRoom(e) {
    let targetBtn = e.target
    let roomNum = Number(targetBtn.closest('.booking-card-new').id)
    let chooseDate = document.getElementById('start').value
    let formattedChooseDate = dayjs(chooseDate).format('YYYY/MM/DD')

    fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      body: JSON.stringify({
        "userID": customerNumber, 
        "date": formattedChooseDate, 
        "roomNumber": roomNum
      }), 
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => dom.postValidation(data,e))
      .then(data => fetchData(customerNumber))
      .catch(err => console.log(err))
  },

  convertToBoolean(value) {
    if(value === "true") {
      return true
    } else {
      return false
    }
  },

  converToYorN(value) {
    if(value === true) {
      return "Yes"
    } else {
      return "No"
    }
  },

  findRoomPic(roomType) {
    if(roomType === "single room") {
      return roomPics[0]
    } else if(roomType === "junior suite") {
      return roomPics[1]
    } else if(roomType === "suite") {
      return roomPics[2]
    } else if(roomType === "residential suite") {
      return roomPics[3]
    }
  }

}




export { dom } 