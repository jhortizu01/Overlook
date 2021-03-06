import chai from 'chai';
import BookingRepo from '../src/classes/bookingRepo.js'
const expect = chai.expect;

describe('Bookings', () => {
  let rooms, booking

  beforeEach(() => {
    rooms = [{
      "number": 1,
      "roomType": "residential suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 358.4
    },
    {
      "number": 2,
      "roomType": "suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 477.38
    },
    {
      "number": 3,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "king",
      "numBeds": 1,
      "costPerNight": 491.14
    },
    {
      "number": 4,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 429.44
    },
    {
      "number": 5,
      "roomType": "single room",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 340.17
    },
    {
      "number": 6,
      "roomType": "junior suite",
      "bidet": true,
      "bedSize": "queen",
      "numBeds": 1,
      "costPerNight": 397.02
  }],

    booking = new BookingRepo(
      [{
          "id": "5fwrgu4i7k55hl6sz",
          "userID": 21,
          "date": "2020/01/16",
          "roomNumber": 1,
          "roomServiceCharges": []
      },
      {
          "id": "5fwrgu4i7k55hl6t5",
          "userID": 43,
          "date": "2020/02/16",
          "roomNumber": 2,
          "roomServiceCharges": []
      },
      {
          "id": "5fwrgu4i7k55hl6t6",
          "userID": 21,
          "date": "2020/02/16",
          "roomNumber": 3,
          "roomServiceCharges": []
      },
      {
          "id": "5fwrgu4i7k55hl6t7",
          "userID": 20,
          "date": "2020/02/16",
          "roomNumber": 4,
          "roomServiceCharges": []
      }])
  });

  it('should be a function', () => {
    expect(BookingRepo).to.be.a('function')
  });

  it('should display only rooms that are associated with the customerID', () => {
    expect(booking.getOnlyCustomer(21, rooms)).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 21,
        "date": "2020/01/16",
        "roomNumber": 1,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 21,
        "date": "2020/02/16",
        "roomNumber": 3,
        "roomServiceCharges": [],
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      }
    ])
  })

  it('should return customer past bookings', () => { 
    booking.getOnlyCustomer(21, rooms)
    expect(booking.getPastBookings("2020/02/01")).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 21,
        "date": "2020/01/16",
        "roomNumber": 1,
        "roomServiceCharges": [],
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      }
    ])
  })

  it('should return customer current bookings', () => { 
     booking.getOnlyCustomer(21, rooms)
      expect(booking.getCurrentBookings("2020/01/16")).to.deep.equal([
        {
          "id": "5fwrgu4i7k55hl6sz",
          "userID": 21,
          "date": "2020/01/16",
          "roomNumber": 1,
          "roomServiceCharges": [],
          "roomType": "residential suite",
          "bidet": true,
          "bedSize": "queen",
          "numBeds": 1,
          "costPerNight": 358.4
        }
    ])
  })

  it('should return customer future bookings', () => { 
    booking.getOnlyCustomer(21, rooms)
    expect(booking.getFutureBookings("2020/01/16")).to.deep.equal([
      {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 21,
        "date": "2020/02/16",
        "roomNumber": 3,
        "roomServiceCharges": [],
        "roomType": "single room",
        "bidet": false,
        "bedSize": "king",
        "numBeds": 1,
        "costPerNight": 491.14
      }
    ])
  })

  it('should calculate total cost spent on rooms', () => {
    expect(booking.findTotalSpent(21, rooms)).to.equal(849.54)
  });

  it('should be able to search through rooms by date', () => {
    expect(booking.findRoomsByDate("2020/02/16", rooms)).to.deep.equal([
      {
        "number": 1,
        "roomType": "residential suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 358.4
      },  
      {
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
      },
      {
        "number": 6,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      }
    ])
  });

  it('should be able to filter through available rooms by guest preferences', () => {
    booking.findRoomsByDate("2020/02/16", rooms)
    expect(booking.filterByPreferences(["queen", true, 2])).to.deep.equal(
      [{
        "number": 5,
        "roomType": "single room",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 340.17
    }])
  })
});
