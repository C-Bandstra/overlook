import dom from '../src/domUpdates.js';

class User {
  constructor(data, date) {
    this.id = data.id;
    this.name = data.name;
    this.date = date;
    this.pastBookings = [];
    this.futureBookings = [];
    this.username = `customer${this.id}`
    this.password = `overlook2020`
  }

  findBookings(bookings) {
    let userBookings = bookings.filter(booking => booking.userID === this.id)
    return userBookings
  }

  findBookingsRoom(bookings, rooms) {
    return bookings.map(book => {
      return rooms.find(room => room.number === book.roomNumber)
    })
  }

  getFirstName() {
    let names = this.name.split(' ')
    dom.displayCustomerName(names[0]);
    return names[0];
  }

  processBookings(bookings, rooms) {
    bookings.forEach(booking => {
      let today = Date.parse(this.date);
      let bookingDate = Date.parse(booking.date);
      today - bookingDate > 0 ? this.pastBookings.push(booking) : this.futureBookings.push(booking);
    })
    let pastRooms = this.findBookingsRoom(this.pastBookings, rooms);
    let futureRooms = this.findBookingsRoom(this.futureBookings, rooms);
    return {pastRooms, futureRooms}
  }

  getBookings(obj) {
    dom.displayUserBookings(this.futureBookings, obj.futureRooms)
    dom.displayUserBookings(this.pastBookings, obj.pastRooms)
    return this.bookings
  }
}

export default User;