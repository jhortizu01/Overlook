// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Rooms from './classes/rooms.js'
import Customer from './classes/customer.js'
import BookingRepo from './classes/bookingRepo.js'
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls';
import dom from './dom.js'
import blueRoom from './images/blueroom.jpg'


export let dayjs = require('dayjs')
export let homeBtn = document.getElementById('home')
export let bookStayBtn = document.getElementById('bookStay')
export let pastBookingsBtn = document.getElementById('pastBookings')
export let currentBookingsBtn = document.getElementById('currentBookings')
export let futureBookingsBtn = document.getElementById('futureBookings')
export let homeContainer = document.getElementById('homeContainer')
export let bookingContainer = document.getElementById('bookingContainer')
export let pastContainer = document.getElementById('pastContainer')
export let currentContainer = document.getElementById('currentContainer')
export let futureContainer = document.getElementById('futureContainer')
export let welcome = document.getElementById('welcome')
export let totalSpent = document.getElementById('totalSpent')

let customerID = 6
export let customer, rooms, bookings 


window.addEventListener('load', (e) => {
  fetchData()
})

homeBtn.addEventListener('click', dom.goHome)
bookStayBtn.addEventListener('click', dom.goBooking)
pastBookingsBtn.addEventListener('click', dom.goPast)
currentBookingsBtn.addEventListener('click', dom.goCurrent)
futureBookingsBtn.addEventListener('click', dom.goFuture)
pastBookingsBtn.addEventListener('click', dom.displayPastBookings)

const fetchData = () => {
  Promise.all([fetchCustomers(customerID), fetchRooms(), fetchBookings()])
    .then(data => parseData(data))
}

const parseData = (data) => {
  let customerData = data[0]
  let roomData = data[1]
  let bookingsData = data[2]

  instantiateClass(customerData, roomData, bookingsData)
}

const instantiateClass = (customerData, roomData, bookingsData) => {
  customer = new Customer(customerData)
  rooms = new Rooms(roomData)
  bookings = new BookingRepo(bookingsData)
  dom.displayName()
  dom.displayTotalSpent()
}