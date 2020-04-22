import $ from 'jquery';
import moment from 'moment'
import './css/base.scss';
import dom from '../src/domUpdates.js';
import User from '../src/User.js';
import Manager from '../src/Manager.js';
import Hotel from './Hotel.js';
import fetcher from './fetch.js'

//FETCH

$(document).ready(fetchData());

let singleImg = "https://www.edenhotelamsterdam.com/media/images/EH---EDEN-HOTEL-AMSTERDAM---SINGLE---1.width-2560.jpg";
let juniorImg = 'https://www.paysbig.com/application/files/8615/6624/4585/junior-suite-hotel-room-potawatomi-hotel-casino.jpg';
let suiteImg = 'https://www.thegwenchicago.com/wp-content/uploads/2017/07/suites-new.jpg';
let resSuiteImg = 'https://magnoliahotels.com/denver/wp-content/uploads/sites/4/2019/10/Presidential-New-FP-2-1.jpg'

let data = {};

function fetchData() {
  Promise.all([fetcher.userData(), fetcher.roomData(), fetcher.bookingData()])
    .then(data => instantiate(data[0].users, data[1].rooms, data[2].bookings))
    .catch(err => console.log(err))
}

function instantiate(users, rooms, bookings) {
  data.date = createDate();
  data.userData = createData(users, User);
  data.roomData = rooms
  data.bookingData = bookings
  data.manager = new Manager('Charlie', data);
  data.date = createDate()
  data.hotel = new Hotel(data);
  console.log(data.userData)
  $('.username-input').val('customer3')
  $('.password-input').val('overlook2020')
  getImage(data.roomData);
}

function getImage(rooms) {
  rooms.forEach(room => {
    room.roomType === 'single room' ? room.image = singleImg : undefined;
    room.roomType === 'junior suite' ? room.image = juniorImg : undefined;
    room.roomType === 'suite' ? room.image = suiteImg : undefined;
    room.roomType === 'residential suite' ? room.image = resSuiteImg : undefined
  })
  return rooms
}

function createData(arr, file) {
  let data = arr.map(data => {
    return new file(data, createDate());
  });
  return data
}

function createDate() {
  return moment().format('YYYY/MM/DD')
}

//EVENTS

$('.sign-in-btn').on('click', () => logIn());

$('.sign-out-btn').on('click', () => location.reload());

$('.search-btn').on('click', function () {
  validateSearch()
  $('.filter-btn').removeAttr('disabled')
})

$('.filter-btn').on('click', function() {
  let type = $('.checkboxes input:checked')
  filterSearch(type);
})

$('.user-search-btn').on('click', function() {
  let userName = $('.guest-name').val();
  let user = data.manager.searchUser(userName);
  populateUser(user[0]);
  $('.customer-right').html('');
  let total = data.hotel.getUserSpent(user[0]);
  dom.displayCustomerSpent(total);
  dom.displayUser(user[0]);
})

$('body').on('click', function () {
  if ($(event.target).hasClass('delete-booking')) {
    let bookingID = parseInt(event.target.id)
    fetcher.deleteBooking(bookingID);
    event.target.closest('div').remove();
  }

  if ($(event.target).hasClass('submit-booking')) {
    let parent = event.target.closest('div');
    let dateValue = $('.date-pick').val();
    let date = dateValue.split('-').join('/');
    let roomNum = parseInt($('.customer-right').find(parent).attr('id'));
    let userBooking = {userID: data.user.id, date, roomNumber: roomNum}
    fetcher.postBooking(userBooking)
  }
});

function filterSearch(type) {
  let filtered = data.roomSearch.filter(room => room.roomType === type[0].value)
  dom.displaySearchedRooms(filtered);
}

function validateSearch() {
  let dateValue = $('.date-pick').val();
  let date = dateValue.split('-').join('/');
  if (Date.parse(data.date) <= Date.parse(date)) {
    let rooms = data.user.findBookingsRoom(data.hotel.searchRooms(date), data.roomData);
    data.roomSearch = rooms;
    dom.displaySearchedRooms(rooms);
  } else {
    console.log('Please select a future date to search for rooms')
  }
}

function logIn() {
  if (validate()) {
    let username = $('.username-input')[0].value;
    let user = data.userData.find(user => user.username === username);
    data.user = user;
    populateUser(user);
    user === undefined ? dom.showManangerProfile(data.manager, data.hotel) : dom.showCustomerProfile(user, data.hotel);
  }
}

function populateUser(user) {
  if (user !== undefined) {
    let bookings = user.findBookings(data.bookingData, data.roomData)
    let rooms = user.processBookings(bookings, data.roomData);
    rooms.futureRooms = getImage(rooms.futureRooms)
    user.getBookings(rooms);
  }
}

function validate() {
  if (!findUsername()) {
    alert("User ID was not found");
    return false
  } else if (!findPassword()) {
    alert("Incorrect Password");
    return false;
  } else {
    return true;
  }
}

function findUsername() {
  let usernameInput = $('.username-input');
  let match = data.userData.find(user => user.username === usernameInput[0].value);
  usernameInput[0].value !== 'manager' && match === undefined ? match = '' : match;
  return usernameInput[0].value === 'manager' || match.username;
}

function findPassword() {
  let passwordInput = $('.password-input');
  return data.userData.some(user => user.password === passwordInput[0].value);
}

