class Hotel {
  constructor(info) {
    this.date = info.date;
    this.users = info.userData;
    this.rooms = info.roomData;
    this.bookings = info.bookingData;
  }

  searchRooms(date) {
    return this.bookings.filter(book => book.date === date);
  }

  getUserSpent(user) {
    let total = this.rooms.reduce((total, room) => {
      user.pastBookings.forEach(book => {
        room.number === book.roomNumber ? total += room.costPerNight : total;
      })
      return total
    }, 0);
    user.spent = total.toFixed(2);
    return total.toFixed(2)
  }
}

export default Hotel;