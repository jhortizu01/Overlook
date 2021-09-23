import {homebtn, bookStayBtn, pastBookingsBtn, currentBookingsBtn, futureBookingsBtn,
homeContainer, bookingContainer, pastContainer, currentContainer, futureContainer, customer, rooms, bookings, dayjs, roomArray, welcome, totalSpent } from './scripts.js'

let today = new Date();
let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()

let dom = {

  addClass(element, classItem) {
    element.classList.add(classItem);
  },

  removeClass(element, classItem) {
    element.classList.remove(classItem);
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
    console.log(bookings)
   console.log(bookings.findTotalSpent())

  },

  displayPastBookings() {
    bookings.getOnlyCustomer(customer.id, rooms.roomRepo)
    bookings.getPastBookings(date)
    console.log(bookings.pastCustomerBookings)
    console.log(customer.name)
    bookings.pastCustomerBookings.map(booking => {
      let pastCard = document.createElement('section')

      let cardContent = 
      `<section aria-label="booking from ${booking.date}" class="past-booking-card"> 
      <img src="./images/blueroom.jpg" alt="vintage 1970's blue aestheticroom">
      <p class="past-stay-card-info" aria-label="date of stay">Date: ${booking.date}</p>
      <p class="past-stay-card-info" aria-label="room number">Room Number:${booking.roomNumber}</p>
      <p class="past-stay-card-info" aria-label="room charges">Room Service Charges:${booking.roomServiceCharges}</p>
      <p class="past-stay-card-info" aria-label="room type">Room Type:${booking.roomType}</p>
      <p class="past-stay-card-info" aria-label="was there a bidet?">Bidet?: ${booking.bidet}</p>
      <p class="past-stay-card-info" aria-label="bedsize">Bed Size: ${booking.bedSize}</p>
      <p class="past-stay-card-info" aria-label="number of beds">Number of Beds: ${booking.numBeds}</p>
      <p class="past-stay-card-info" aria-label="cost per night">Cost Per Night:${booking.costPerNight}</p>
      </section>`

      pastContainer.innerHTML += cardContent
    })
  }

}

export default dom;