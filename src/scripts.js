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

let homeBtn = document.getElementById('home')
let bookStayBtn = document.getElementById('bookStay')
let pastBookingsBtn = document.getElementById('pastBookings')
let currentBookingsBtn = document.getElementById('currentBookings')
let futureBookingsBtn = document.getElementById('futureBookings')
let dayjs = require('dayjs')
let today = new Date();
let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()
let todaysDate = dayjs(date).format('YYYY/MM/DD')
let submitBtn = document.getElementById('submit')

export let pastContainer = document.getElementById('pastContainer')
export let currentContainer = document.getElementById('currentContainer')
export let futureContainer = document.getElementById('futureContainer')
export let availableRoomsContainer = document.getElementById('availableRoomsContainer')
export let submitCreds = document.getElementById('submitCreds')
export let everything = document.getElementById('everything')
export let loginPage = document.getElementById('loginPage')
export let roomPics = ["<img src='./images/blueroom.jpg' alt='vintage 1970s blue aesthetic room' class='card-image-current'>", 
"<img src='./images/green_room.jpg' alt='vintage 1970s green aesthetic room' class='card-image-current'>",
"<img src='./images/red_room.jpg' alt='vintage 1970s red aesthetic room' class='card-image-current'>",
"<img src='./images/yellow_room.png' alt='vintage 1970s yellow aesthetic room' class='card-image-current'>"
]

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