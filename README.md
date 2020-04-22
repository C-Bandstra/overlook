# Overlook


## Contributors

**Charlie Bandstra

## Setup

To install, clone the repository and enter the following into the terminal to clone the dependencies:
```bash
npm install
```

To start the server run 
```bash
npm start
```

In your browser type
```bash
http://localhost:8080/
```

When logging in as a guest, the guest's total spendings as well as bookings with the hotel are displayed.  If a guest would like to book a future reservation they may do so by selecting the date and filtering for which room type they would like.  Upon clicking "Book Now!" the reservation added to the Hotel's database.

When logging in as a manager, the bookings for the current day will be displayed in the right column. The manager can search for a guest by their full name to view how much they have spent at the hotel as well as all of their bookings, and is able to cancel bookings in the future.

### Technologies Used
- jQuery
- Fetch
- OOP
- HTML Webpack Plugin


## Wins
* Creating a half way functioning app in less than a week
* Creating functionality for a user to search through booking data and display accordingly
* Creating a clean login screen

## Challenges
* Getting delete functionality to actually delete a posted booking was super tricky for me.
* Asynchronicity while using fetch made it difficult to console log with the webpack.
* Spies took me a little but to implement but I figured it out eventually

## Future Iterations
* Restyling the app to make it more pleasing to the eyeball
* Implementing more compatible code for cross-browser compatibility
* Refactoring wet dom methods
