import $ from 'jquery';

let dom = {
  showManangerProfile(manager) {
    let loginPage = $('.login-page');
    let managerPage = $('.manager-page');
    loginPage.removeClass('active');
    loginPage.addClass('inactive');
    managerPage.removeClass('inactive');
    managerPage.addClass('active');
    manager.getFirstName()
    manager.getTodayRevenue()
  },

  showCustomerProfile(user, hotel) {
    let loginPage = $('.login-page');
    let customerPage = $('.customer-page');
    loginPage.removeClass('active');
    loginPage.addClass('inactive');
    customerPage.removeClass('inactive');
    customerPage.addClass('active');
    user.getFirstName(user);
    hotel.getUserSpent(user);
    dom.displayCustomerSpent(user.spent)
  },

  displayCustomerName(name) {
    $('.customer-greeting').text(`Hello, ${name}`)
  },

  displayCustomerSpent(spent) {
    console.log(spent)
    $('.spent-title').text(`You have spent $${spent} on rooms`)
  },

  displayBookedPercentage(percentage) {
    $('.percentage-booked').text(`${percentage}% of the rooms have been booked today`)
  },

  displayUserBookings(bookings, rooms) {
    bookings.forEach(book => {
      let room = rooms.find(room => room.number === book.roomNumber);
      $('.customer-right').append(`
      <div class="room-card">
      <section class="info-container">
        <img class="room-img" src=${room.image}>
        <form class="room-info">
          <li class="info">Room Type: ${room.roomType}</ul>
          <li class="info">Bed: ${room.bedSize}</ul>
          <li class="info">Bidet: ${room.bidet}</ul>
          <li class="info">Room Number: ${room.number}</ul>
        </form>
      </section>
      <button class="submit-booking">Book Now!</button>
    </div>`)
    })
  },

  displayUser(user) {
    $('.customer-container').html(``);
    $('.customer-container').append(`
    <div class="customer-info">
      <h3>${user.name}</h3>
      <h4>Money Spent: $${user.spent}</h4>
    </div>`);
    $('.customer-info').append(`<div class="booking-container"><h3>Bookings</h3></div>`)
    this.displayManagerBookings(user.futureBookings)
    this.displayManagerBookings(user.pastBookings)
  },

  displayManagerBookings(bookings) {
    bookings.forEach(book => {
      $('.booking-container').append(`
        <div class="booking-info">
          <p>Date: ${book.date}</p>
          <p>Room Number: ${book.roomNumber}</p>
          <button id="${book.id}" class="delete-booking">Delete</button>
        </div>
        
      `)
    })
  },

  displayManagerName(name) {
    $('.manager-greeting').text(`Hello, ${name}`)
  },

  displayManagerEarned(earned) {
    $('.earned-title').text(`You have earned $${earned} on rooms`)
  },

  displayAvailableRooms(num) {
    $('.available-rooms').text(`You have ${num} rooms available today`)
  },

  displaySearchedRooms(rooms) {
    $('.customer-container').html(``);
    $('.customer-container').append(`<div class="customer-right"></div>`);
    $('.customer-right').append(`<p>Search Results</p>`)
    rooms.forEach(room => {
      $('.customer-right').append(`
      <div id="${room.number}" class="room-card">
      <section class="info-container">
        <img class="room-img" src=${room.image}>
        <form class="room-info">
          <li class="info">Room Type: ${room.roomType}</ul>
          <li class="info">Bed: ${room.bedSize}</ul>
          <li class="info">Bidet: ${room.bidet}</ul>
          <li class="info">Room Number: ${room.number}</ul>
        </form>
        <button class="submit-booking">Book Now!</button>
      </section>
    </div>`)
    })
  }
}

export default dom;