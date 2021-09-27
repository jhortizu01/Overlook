// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Rooms from './classes/rooms.js'
import Customer from './classes/customer.js'
import BookingRepo from './classes/bookingRepo.js'
import { fetchCustomers, fetchRooms, fetchBookings } from './apiCalls';
import { dom }from './dom.js'
import './images/blueroom.jpg'
import './images/green_room.jpg'
import './images/orange_room.jpg'
import './images/red_room.jpg'
import './images/yellow_room.png'
import './images/sad.png'
import './images/overlook.jpg'

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
export let dayjs = require('dayjs')
export let today = new Date();
export let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
export let todaysDate = dayjs(date).format('YYYY/MM/DD')
export let submitBtn = document.getElementById('submit')
export let availableRoomsContainer = document.getElementById('availableRoomsContainer')
export let bookingMessage = document.getElementById('bookingMessage')
export let submitCreds = document.getElementById('submitCreds')
export let everything = document.getElementById('everything')
export let loginPage = document.getElementById('loginPage')

export let roomPics = ["<img src='./images/blueroom.jpg' alt='vintage 1970s blue aestheticroom' class='card-image-current'>", 
"<img src='./images/green_room.jpg' alt='vintage 1970s blue aestheticroom' class='card-image-current'>",
"<img src='./images/orange_room.jpg' alt='vintage 1970s blue aestheticroom' class='card-image-current'>",
"<img src='./images/red_room.jpg' alt='vintage 1970s blue aestheticroom' class='card-image-current'>",
"<img src='./images/yellow_room.png' alt='vintage 1970s blue aestheticroom' class='card-image-current'>"
]

export let randomRoomPics = Math.floor(Math.random() * roomPics.length);

export let randomImg = document.getElementById('images')

export let customer, rooms, bookings, customerNumber

export const fetchData = (customerNumber) => {
  Promise.all([fetchCustomers(customerNumber), fetchRooms(), fetchBookings()])
    .then(data => parseData(data))
}

const parseData = (data) => {
  let customerData = data[0]
  let roomData = data[1]
  let bookingsData = data[2]

  instantiateClass(customerData, roomData, bookingsData)
}

const instantiateClass = (customerData, roomData, bookingsData) => {
  console.log(customerData)
  customer = new Customer(customerData)
  rooms = new Rooms(roomData)
  bookings = new BookingRepo(bookingsData.bookings)
  dom.displayName()
  dom.displayTotalSpent()
  bookings.getOnlyCustomer(customer.id, rooms.roomRepo)
  bookings.getPastBookings(date)
  bookings.getCurrentBookings(todaysDate)
  bookings.getFutureBookings(todaysDate)
}

const logInToPage = (e) => {
  e.preventDefault()
  let userGeneratedName = document.getElementById('userName').value
  let userGeneratedPassword = document.getElementById('password').value
  let wrongUsername = document.getElementById('wrongUsername')
  let wrongPassword = document.getElementById('wrongPassword')
  customerNumber = getCustomerNumber(userGeneratedName)
console.log('RANDOM PIC', randomRoomPics)
  if(customerNumber > 0 && customerNumber <= 50 && userGeneratedPassword === "overlook2021") {
    dom.removeClass(everything, "hidden")
    dom.addClass(loginPage, "hidden")
    fetchData(customerNumber)
  } else if(customerNumber > 50 || customerNumber === 0) {
    dom.removeClass(wrongUsername, "hidden")
  } 
  
  if(userGeneratedPassword != "overlook2021") {
    dom.removeClass(wrongPassword, "hidden")
  } 
}

const getCustomerNumber = (userGeneratedName) => {
  let getUserNumber = userGeneratedName.split("")
  
  let returnNumber = getUserNumber.filter(character => {
   return character === "1" ||
   character === "2" ||
   character === "3" ||
   character === "4" ||
   character === "5" ||
   character === "6" ||
   character === "7" ||
   character === "8" ||
   character === "9" ||
   character === "0"
  })

  return Number(returnNumber.join(""))
}

homeBtn.addEventListener('click', dom.goHome)
bookStayBtn.addEventListener('click', dom.goBooking)
pastBookingsBtn.addEventListener('click', () => {
  dom.goPast(),
  dom.clearCards('pastContainer')
  dom.displayPastBookings()
})


currentBookingsBtn.addEventListener('click', () => {
  dom.goCurrent()
  dom.clearCards('currentContainer')
  dom.displayCurrentBookings()
})

futureBookingsBtn.addEventListener('click', () => {
  dom.goFuture()
  dom.clearCards('futureContainer')
  dom.displayFutureBookings()
  dom.findRandom()
})

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  dom.clearCards('availableRoomsContainer')
  dom.getUserPreferences()
})

availableRoomsContainer.addEventListener('click', (e) => {
  dom.bookRoom(e)
})


submitCreds.addEventListener('click', (e) => {
  logInToPage(e)
})