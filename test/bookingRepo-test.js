import chai from 'chai';
import BookingRepo from '../src/classes/bookingRepo.js'
const expect = chai.expect;

describe('Bookings', () => {

  it('should be a function', () => {
    expect(BookingRepo).to.be.a('function')
  });

  it('should calculate total cost spent on rooms', () => {
    let rooms = [{
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
        "date": "2020/04/22",
        "roomNumber": 1,
        "roomServiceCharges": []
    },
    {
        "id": "5fwrgu4i7k55hl6t5",
        "userID": 43,
        "date": "2020/01/24",
        "roomNumber": 24,
        "roomServiceCharges": []
    },
    {
        "id": "5fwrgu4i7k55hl6t6",
        "userID": 21,
        "date": "2020/01/10",
        "roomNumber": 2,
        "roomServiceCharges": []
    },
    {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 20,
        "date": "2020/02/16",
        "roomNumber": 7,
        "roomServiceCharges": []
    }])

    expect(booking.findTotalSpent(21, rooms)).to.equal(835.78)
  });

  it('should be able to search through rooms by date', () => {
    let rooms = [{
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
          "date": "2020/02/16",
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
      expect(booking.findRoomsByDate("2020/02/16", rooms)).to.deep.equal([
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
  })

  it('should be able to search through rooms by date', () => {
    let rooms = [{
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
  }],

    booking = new BookingRepo(
      [{
          "id": "5fwrgu4i7k55hl6sz",
          "userID": 21,
          "date": "2020/02/16",
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

      expect(booking.findRoomsByDate("2020/02/16", rooms)).to.equal("So sorry, there are no rooms available for this date! Please choose a different date.")
    })

    it('should be able to filter through available rooms by guest preferences', () => {
      let rooms = [{
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
  
      bookings = new BookingRepo(
        [{
            "id": "5fwrgu4i7k55hl6sz",
            "userID": 21,
            "date": "2020/02/16",
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

      bookings.findRoomsByDate("2020/02/16", rooms)

      expect(bookings.filterByPreferences(["single room", true])).to.deep.equal(
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
