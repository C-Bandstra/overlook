import chai from 'chai';
const expect = chai.expect;
import User from '../src/User'
require('jquery')

describe('User', function() {
  let user;
  let bookings;
  let rooms;

  beforeEach(function() {

    user = new User({id: 3, name: 'Charlie Bandstra'}, '2020/04/20')
    bookings = [
      {
        "id": "5fwrgu4i7k55hl6t9",
        "userID": 3,
        "date": "2020/02/14",
        "roomNumber": 2,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 3,
        "date": "2020/02/05",
        "roomNumber": 4,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6sz",
        "userID": 9,
        "date": "2020/02/04",
        "roomNumber": 15,
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
        "userID": 13,
        "date": "2020/01/10",
        "roomNumber": 12,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t7",
        "userID": 20,
        "date": "2020/04/21",
        "roomNumber": 7,
        "roomServiceCharges": []
      }
    ];
  
    rooms = [
      {
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
        "number": 12,
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
      },
      {
        "number": 7,
        "roomType": "single room",
        "bidet": false,
        "bedSize": "queen",
        "numBeds": 2,
        "costPerNight": 231.46
      },
      {
        "number": 24,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
      {
        "number": 15,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
    ]
  })
  it('should have an id', function() {
    expect(user.id).to.equal(3);
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Charlie Bandstra');
  });

  it('should start with no future bookings', function () {
    expect(user.futureBookings.length).to.equal(0)
  })

  it('should have a unique username', function() {
    expect(user.username).to.equal('customer3')
  })

  it('should have a password', function() {
    expect(user.password).to.equal('overlook2020')
  })

  it('should be able to get users bookings', function() {
    expect(user.findBookings(bookings, rooms)).to.deep.equal([bookings[0], bookings[1]])
  })

  it('should be able to find booking rooms', function () {
    expect(user.findBookingsRoom(bookings, rooms)).to.deep.equal([rooms[1], rooms[3], rooms[8], rooms[7], rooms[4], rooms[6]])
  })

  it('should process bookings and push them into correct array', function() {
    user.processBookings(bookings, rooms)
    expect(user.pastBookings.length).to.equal(5)
    expect(user.futureBookings.length).to.equal(1)
  })
});
