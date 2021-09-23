// I should be able to filter the list of available rooms by their roomType property

class BookingRepo {
  constructor(bookingData) {
    this.bookingRepo = bookingData
    this.availableRooms = [];
    this.guestChoices = []
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

   return totalCost
  }

  findRoomsByDate(userGeneratedDate, roomData) {
    let currentBookings = this.bookingRepo.filter(booking => {
      return booking.date === userGeneratedDate
    }).map(booking => booking.roomNumber)

    roomData.forEach(room => {
      if(!currentBookings.includes(room.number)) {
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
    this.availableRooms.forEach(room => {
      let roomValues = Object.values(room).slice(1, 5)

      guestPreferences.every(preference => {
        if(roomValues.includes(preference)) {
          this.guestChoices.push(room)
        }
      })
    })
    
    return this.guestChoices
  }
  


}
  


export default BookingRepo;