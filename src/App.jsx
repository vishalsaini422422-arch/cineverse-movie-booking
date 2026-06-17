import { useState } from "react";
import "./App.css";

function App() {
  const movies = [
    { name: "Inception", price: 200 },
    { name: "Interstellar", price: 250 },
    { name: "Avatar", price: 180 },
    { name: "Oppenheimer", price: 300 },
    { name: "Joker", price: 220 },
    { name: "The Dark Knight", price: 280 },
  ];

  const seats = [
    "A1","A2","A3","A4",
    "B1","B2","B3","B4",
    "C1","C2","C3","C4",
    "D1","D2","D3","D4"
  ];

  const bookedSeats = ["A2", "B3", "C1"];

  const [user, setUser] = useState("");
  const [mobile, setMobile] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [history, setHistory] = useState([]);

  const toggleSeat = (seat) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const total = selectedSeats.length * selectedMovie.price;

  const confirmBooking = () => {
    if (selectedSeats.length === 0) {
      alert("Please select seats");
      return;
    }

    const ticketId =
      "CV" + Math.floor(10000 + Math.random() * 90000);

    const booking = {
      ticketId,
      movie: selectedMovie.name,
      seats: selectedSeats.join(", "),
      amount: total,
      mobile,
    };

    setHistory([...history, booking]);

    alert(
      `🎬 Booking Confirmed!

Ticket ID: ${ticketId}

Movie: ${selectedMovie.name}

Seats: ${selectedSeats.join(", ")}

Amount: ₹${total}

Ticket Sent To:
${mobile}`
    );

    setSelectedSeats([]);
  };

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>

        <div className="login-card">
          <h1 className="logo">🎬 CineVerse</h1>

          <h2 className="welcome">
            Welcome to Movie Booking Platform
          </h2>

          <p className="subtitle">
            Search movies, choose theatres and book seats instantly.
          </p>

          <input
            type="text"
            placeholder="Enter Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={() => {
              if (!user.trim()) {
                alert("Enter your name");
                return;
              }

              if (mobile.length < 10) {
                alert("Enter valid mobile number");
                return;
              }

              setLoggedIn(true);
            }}
          >
            Enter CineVerse 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <h2>🎬 CineVerse</h2>
        <span>
          Welcome, {user}
        </span>
      </nav>

      <div className="hero">
        <h1>Movie Ticket Booking System</h1>

        <input
          placeholder="Search Movie..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <div className="movie-grid">
        {movies
          .filter((m) =>
            m.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .map((movie) => (
            <div
              key={movie.name}
              className={`movie-card ${
                selectedMovie.name === movie.name
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setSelectedMovie(movie)
              }
            >
              <h3>{movie.name}</h3>
              <p>₹{movie.price}</p>
            </div>
          ))}
      </div>

      <div className="booking">
        <h2>{selectedMovie.name}</h2>

        <select>
          <option>PVR Mohali</option>
          <option>Cinepolis Chandigarh</option>
          <option>Wave Ludhiana</option>
        </select>

        <select>
          <option>10:00 AM</option>
          <option>1:00 PM</option>
          <option>4:00 PM</option>
          <option>8:00 PM</option>
        </select>

        <div className="screen">
          SCREEN
        </div>

        <div className="seat-grid">
          {seats.map((seat) => (
            <button
              key={seat}
              className={
                bookedSeats.includes(seat)
                  ? "booked"
                  : selectedSeats.includes(seat)
                  ? "selected"
                  : "seat"
              }
              onClick={() =>
                toggleSeat(seat)
              }
            >
              {seat}
            </button>
          ))}
        </div>

        <h3>
          Selected Seats:
          {" "}
          {selectedSeats.join(", ") ||
            "None"}
        </h3>

        <h3>
          Total Amount: ₹{total}
        </h3>

        <button
          className="confirm"
          onClick={confirmBooking}
        >
          Confirm Booking
        </button>
      </div>

      <div className="history">
        <h2>📜 Booking History</h2>

        {history.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="history-card"
            >
              <h3>{item.movie}</h3>

              <p>
                🎟 Ticket:
                {" "}
                {item.ticketId}
              </p>

              <p>
                📱 Mobile:
                {" "}
                {item.mobile}
              </p>

              <p>
                💺 Seats:
                {" "}
                {item.seats}
              </p>

              <p>
                💰 Amount:
                ₹{item.amount}
              </p>
            </div>
          ))
        )}
      </div>

      <div className="admin">
        <h2>📊 Admin Dashboard</h2>

        <p>
          Total Movies:
          {" "}
          {movies.length}
        </p>

        <p>
          Total Bookings:
          {" "}
          {history.length}
        </p>

        <p>
          Revenue: ₹
          {history.reduce(
            (sum, item) =>
              sum + item.amount,
            0
          )}
        </p>
      </div>
    </div>
  );
}

export default App;