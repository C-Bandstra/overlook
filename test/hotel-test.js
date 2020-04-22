import chai from 'chai';
const expect = chai.expect;
import User from '../src/User'
import Hotel from '../src/Hotel';
require('jquery')

describe('Hotel', function() {
  let userData;
  let bookingData;
  let roomData;
  let hotel;
  beforeEach(function() {
    let user1 = new User({id: 3, name: 'Charlie Bandstra'}, '2020/04/20');
    let user2 = new User({id: 9, name: 'Charlie Bandstra'}, '2020/04/20');
    let user3 = new User({id: 13, name: 'Charlie Bandstra'}, '2020/04/20');
    userData = [user1, user2, user3]
    bookingData = [
      {
        "id": "5fwrgu4i7k55hl6t9",
        "userID": 3,
        "date": "2020/04/20",
        "roomNumber": 2,
        "roomServiceCharges": []
      },
      {
        "id": "5fwrgu4i7k55hl6t8",
        "userID": 3,
        "date": "2020/04/20",
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
        "userID": 9,
        "date": "2020/04/20",
        "roomNumber": 6,
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
        "userID": 13,
        "date": "2020/04/20",
        "roomNumber": 7,
        "roomServiceCharges": []
      }
    ];
  
    roomData = [
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
        "costPerNight": 450.26
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
        "costPerNight": 400.26
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
        "number": 8,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
      {
        "number": 9,
        "roomType": "junior suite",
        "bidet": true,
        "bedSize": "queen",
        "numBeds": 1,
        "costPerNight": 397.02
      },
    ]
    userData.forEach(user => {
      user.pastBookings.push(bookingData[0])
      user.pastBookings.push(bookingData[1])
    })
    hotel = new Hotel({userData, bookingData, roomData, date: '2020/04/20'})
  })

  it('should have a list of users', function () {
    expect(hotel.users).to.equal(userData)
  })

  it('should have a current date', function () {
    expect(hotel.date).to.equal('2020/04/20')
  })

  it('should have room list', function () {
    expect(hotel.rooms).to.equal(roomData)
  })

  it('should start with all bookings', function () {
    expect(hotel.bookings).to.equal(bookingData)
  })

  it('should be able to search for rooms based on booking info', function () {
    expect(hotel.searchRooms(hotel.date)).to.deep.equal([bookingData[0], bookingData[1], bookingData[3], bookingData[5]])
  })

  it('should be able to get user total spent', function () {
    expect(hotel.getUserSpent(userData[0])).to.equal('850.52')
  })
  
  it('should be able to update user spent property', function () {
    hotel.getUserSpent(userData[0])
    expect(userData[0].spent).to.equal('850.52')
  })
})
