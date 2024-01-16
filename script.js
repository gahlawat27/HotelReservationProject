document.addEventListener('DOMContentLoaded', function() {
  // Sample room data
  const roomsData = [
    { id: 1, type: 'Single', price: 100, image: 'hotel_image_1.jpg' },
    { id: 2, type: 'Double', price: 150, image: 'hotel_image_2.jpg' },
    { id: 3, type: 'Suite', price: 250, image: 'hotel_image_3.jpg' },
    // Add more room data as needed
  ];

  const searchForm = document.getElementById('search-form');
  const searchResults = document.getElementById('search-results');

  // Initialize Flatpickr for date inputs
  const checkinDateInput = document.getElementById('checkin-date');
  const checkoutDateInput = document.getElementById('checkout-date');

  const dateOptions = {
    dateFormat: 'Y-m-d', // Change the date format as needed
    minDate: 'today', // Restrict selection to today and future dates
    // Add any other desired options here
  };

  flatpickr(checkinDateInput, dateOptions);
  flatpickr(checkoutDateInput, dateOptions);

  // Function to update total amount in room card
  function updateTotalAmount(roomCard, checkinDate, checkoutDate, price) {
    const totalAmountElement = roomCard.querySelector('.total-amount');
    const totalAmount = calculateTotalAmount(checkinDate, checkoutDate, price);
    totalAmountElement.textContent = `Total Amount: $${totalAmount}`;
  }

  function displaySearchResults(rooms, checkinDate, checkoutDate, numGuests) {
    searchResults.innerHTML = '';

    if (rooms.length === 0) {
      searchResults.innerHTML = '<p>No rooms found. Please adjust your search criteria.</p>';
    } else {
      rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.classList.add('room-card');

        const image = document.createElement('img');
        image.src = room.image;
        image.alt = `Room ${room.id}`;
        roomCard.appendChild(image);

        const details = document.createElement('div');
        details.classList.add('room-details');

        const title = document.createElement('h3');
        title.textContent = `${room.type} Room`;
        details.appendChild(title);

        const price = document.createElement('p');
        price.textContent = `Price: $${room.price} per night`;
        details.appendChild(price);

        const totalAmount = document.createElement('p');
        totalAmount.classList.add('total-amount');
        details.appendChild(totalAmount);

        const bookButton = document.createElement('button');
        bookButton.textContent = 'Book Now';
        bookButton.addEventListener('click', function() {
          // Calculate total amount
          const totalAmount = calculateTotalAmount(checkinDate, checkoutDate, room.price);

          // Implement booking logic here, e.g., open a booking modal
          alert(`You have booked the ${room.type} room for ${checkinDate} to ${checkoutDate} for ${numGuests} guests. Total amount: $${totalAmount}.`);
        });

        details.appendChild(bookButton);
        roomCard.appendChild(details);
        searchResults.appendChild(roomCard);

        // Update total amount when dates change
        checkinDateInput.addEventListener('change', function() {
          updateTotalAmount(roomCard, checkinDateInput.value, checkoutDateInput.value, room.price);
        });

        checkoutDateInput.addEventListener('change', function() {
          updateTotalAmount(roomCard, checkinDateInput.value, checkoutDateInput.value, room.price);
        });

        // Initial update of total amount
        updateTotalAmount(roomCard, checkinDate, checkoutDate, room.price);
      });
    }
  }

  // Calculate total amount and update room card
  function calculateTotalAmount(checkinDate, checkoutDate, price) {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const checkin = new Date(checkinDate);
    const checkout = new Date(checkoutDate);
    const numDays = Math.round(Math.abs((checkout - checkin) / oneDay)) || 1; // Ensure minimum 1 day
    return price * numDays;
  }

  // Add initial display
  displaySearchResults(roomsData, checkinDateInput.value, checkoutDateInput.value, 1);
});
