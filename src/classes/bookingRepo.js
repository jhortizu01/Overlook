
let dayjs = require('dayjs')
// let today = new Date();
// let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate()

class BookingRepo {
  constructor(bookingData) {
    this.bookingRepo = bookingData
    this.allCustomerBookings = []
    this.pastCustomerBookings = []
    this.currentCustomerBookings = []
    this.futureCustomerBookings = []
    this.availableRooms = [];
    this.guestChoices = []
  }

  getOnlyCustomer(customerID, rooms) {
   let customerBooked = this.bookingRepo.filter(booking => {
      return booking.userID === customerID
    })

   customerBooked.map(booking => {
      rooms.forEach(room => {
        if(booking.roomNumber === room.number) {
          let combine = Object.assign(booking, room)
          delete combine.number
          this.allCustomerBookings.push(combine)
        }
      })
    })
   return this.allCustomerBookings
  }

  getPastBookings(todaysDate) {
    this.allCustomerBookings.forEach(booking => {
      if(dayjs(booking.date).isBefore(dayjs(todaysDate))) {
        this.pastCustomerBookings.push(booking)
      }
    })

   return this.pastCustomerBookings.sort((a, b) => new Date(b.date) - new Date(a.date)) 
   
  }

  getCurrentBookings(todaysDate) {
    this.allCustomerBookings.forEach(booking => {
      if(todaysDate === booking.date) {
        this.currentCustomerBookings.push(booking)
      }
    })
   return this.currentCustomerBookings
  }

  getFutureBookings(todaysDate) {
    this.allCustomerBookings.forEach(booking => {
      if(dayjs(booking.date).isAfter(dayjs(todaysDate))) {
        this.futureCustomerBookings.push(booking)
      }
    })
   return this.futureCustomerBookings
  }

  findTotalSpent(customerID, roomData) { 
    let totalCost = 0

    let checkBookingID = this.bookingRepo.filter(booking => {
      return booking.userID === customerID
    })

    roomData.map((room) => {
      checkBookingID.map(booking => {
        if(booking.roomNumber === room.number) {
          totalCost += room.costPerNight
        }
      })
    })

   return Number(totalCost.toFixed(2))
  }

  findRoomsByDate(userGeneratedDate, roomData) {
    let currentBookings = this.bookingRepo.filter(booking => {
      return booking.date === userGeneratedDate
    }).map(booking => booking.roomNumber)

    roomData.forEach(room => {
      if(!currentBookings.includes(room.number) && !this.availableRooms.includes(room)) {
        this.availableRooms.push(room) 
      }     
    })

   
    if(this.availableRooms.length > 1) {
      return this.availableRooms
    } else {
      return "So sorry, there are no rooms available for this date! Please choose a different date."
    }

  }

  filterByPreferences(guestPreferences) {
    this.guestChoices = []
    this.availableRooms.map(room => {
       let roomValues = Object.values(room).slice(1, 5)
      if(guestPreferences.every(element => roomValues.includes(element)) === true) {
        this.guestChoices.push(room)
      }
  })
  return this.guestChoices
}
  


}
  


export default BookingRepo;