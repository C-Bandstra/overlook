import chai from 'chai';
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);
import dom from '../src/domUpdates.js'
import User from '../src/User'
import Manager from '../src/Manager'
require('jquery')

describe('Manager', function() {
  let userData;
  let roomData;
  let bookingData;
  let manager;

  afterEach(() => {
    chai.spy.restore(dom);
  });

  beforeEach(function() {
    chai.spy.on(dom, "displayAvailableRooms", () => {});
    chai.spy.on(dom, "displayManagerEarned", () => {});
    chai.spy.on(dom, "displayBookedPercentage", () => {});
    chai.spy.on(dom, "displayManagerName", () => {});

    let user1 = new User({id: 3, name: 'Jeff Turing'}, '2020/04/20');
    let user2 = new User({id: 9, name: 'Pam Something'}, '2020/04/20');
    let user3 = new User({id: 13, name: 'Hannah Lastname'}, '2020/04/20');

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
    manager = new Manager('Charlie Bandstra', {userData, bookingData, roomData, date: '2020/04/20'})
  })

  it('should have a name', function() {
    expect(manager.name).to.equal('Charlie Bandstra');
  })

  it('should know what day it is', function () {
    expect(manager.date).to.equal('2020/04/20')
  })

  it('should have access to a list of users', function() {
    expect(manager.users).to.equal(userData);
  })

  it('should have access to a list of all bookings', function() {
    expect(manager.bookings).to.equal(bookingData);
  })

  it('should have list of bookings for the current date', function() {
    expect(manager.todaysBookings.length).to.equal(4);
  })

  it('should have number available rooms', function () {
    expect(dom.displayAvailableRooms).to.have.been.called(1);
    expect(dom.displayAvailableRooms).to.have.been.called.with(5);
  })

  it('should be able to get the percentage of booked rooms', function () {
    expect(manager.getBookedPercentage()).to.equal(44);
    expect(dom.displayBookedPercentage).to.have.been.called(1);
    expect(dom.displayBookedPercentage).to.have.been.called.with(44);
  })

  it('should be able to get the managers current day revenue', function () {
    expect(manager.getTodayRevenue()).to.equal(1479);
    expect(dom.displayManagerEarned).to.have.been.called(1);
    expect(dom.displayManagerEarned).to.have.been.called.with(1479);
  })

  it('should be able to get the managers first name', function () {
    expect(manager.getFirstName()).to.equal('Charlie')
    expect(dom.displayManagerName).to.have.been.called(1);
    expect(dom.displayManagerName).to.have.been.called.with('Charlie')
  })

  it('should be able to search a user by their name', function() {
    expect(manager.searchUser('Pam Something')).to.deep.equal([userData[1]])
  })
})