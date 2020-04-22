import dom from '../src/domUpdates.js';

class Manager {
  constructor(name, info) {
    this.name = name;
    this.date = info.date;
    this.users = info.userData;
    this.bookings = info.bookingData;
    this.rooms = info.roomData;
    this.todaysBookings = this.findTodaysBookings();
    this.availableRooms = this.getAvailableRooms();
    this.username = 'manager'
    this.password = 'overlook2020'
  }

  getFirstName() {
    let names = this.name.split(' ')
    dom.displayManagerName(names[0]);
    return names[0];
  }

  findTodaysBookings() {
    return this.bookings.filter(booking => booking.date === this.date);
  }

  getBookedPercentage() {
    let decimal = this.todaysBookings.length / this.rooms.length;
    let percentage = Math.round(decimal * 100)
    dom.displayBookedPercentage(Number(percentage.toFixed(2)))
    return percentage
  }

  getAvailableRooms() {
    let available = this.rooms.length - this.todaysBookings.length
    dom.displayAvailableRooms(available);
    return available
  }

  getTodayRevenue() {
    this.getBookedPercentage() 
    let total = this.todaysBookings.reduce((acc , book) => {
      acc += this.rooms.find(room => book.roomNumber === room.number).costPerNight;
      return acc
    }, 0)
    dom.displayManagerEarned(Number(total.toFixed(2)));
    return total
  }

  searchUser(name) {
    return this.users.filter(user => user.name == name);
  }
}

export default Manager;