import {homebtn, bookStayBtn, pastBookingsBtn, currentBookingsBtn, futureBookingsBtn,
homeContainer, bookingContainer, pastContainer, currentContainer, futureContainer, customer, rooms, bookings, dayjs} from './scripts.js'

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

  displayPastBookings() {
    bookings.getOnlyCustomer(customer.id, rooms.roomRepo)
    bookings.getPastBookings(date)
    console.log(bookings.pastCustomerBookings)
  }

}

export default dom;