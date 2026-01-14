# GigFlow

A full-stack mini freelance marketplace platform where users can post jobs (Gigs) and apply for them (Bids). Built with React, Node.js, Express, and MongoDB.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Decisions](#architecture-decisions)
- [Security Considerations](#security-considerations)

---

## Project Overview

GigFlow is a mini-freelance marketplace that enables:
- **Clients** to post job listings (Gigs) with title, description, and budget
- **Freelancers** to browse available gigs and submit bids with proposals and pricing
- **Hiring workflow** where clients can review bids and hire freelancers

The platform features fluid roles - any authenticated user can act as both a client (posting gigs) and a freelancer (bidding on gigs).

---

## Features

### Authentication
- Secure user registration and login
- JWT-based authentication with HttpOnly cookies
- Protected routes for authenticated operations
- Session persistence across page refreshes

### Gig Management
- Browse all open gigs with search functionality
- Create new job postings with title, description, and budget
- View detailed gig information
- Dashboard to manage posted gigs and submitted bids

### Bidding System
- Submit bids on open gigs with message and price
- Prevent duplicate bids (one bid per user per gig)
- Prevent owners from bidding on their own gigs
- Real-time bid updates via WebSocket

### Hiring Logic
- Gig owners can review all submitted bids
- Hire a freelancer with a single click
- Atomic updates ensure data consistency:
  - Gig status changes from `open` to `assigned`
  - Selected bid status becomes `hired`
  - All other bids are automatically `rejected`
- Race condition prevention using optimistic locking

### Real-Time Notifications
- Socket.IO integration for live updates
- Instant notification when hired
- Bid rejection notifications
- Live bid feed for gig owners

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 19 | UI library |
| Vite 7 | Build tool and dev server |
| Tailwind CSS 4 | Utility-first CSS framework |
| Redux Toolkit | State management |
| React Router 7 | Client-side routing |
| Axios | HTTP client |
| Socket.IO Client | Real-time communication |
| React Hot Toast | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM for MongoDB |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Socket.IO | Real-time events |
| cookie-parser | Cookie handling |

---

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local instance or MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/your-username/gigflow.git
cd gigflow
```

### Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

---

## Environment Variables

### Server (.env)
Create a `.env` file in the `server/` directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/gigflow
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/gigflow

# JWT secret key (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Server port
PORT=5000

# Client URL for CORS
CLIENT_URL=http://localhost:5173
```

### Client (.env)
Create a `.env` file in the `client/` directory (for production):

```env
VITE_API_URL=https://your-api-domain.com
```

---

## Architecture Decisions

### Authentication Strategy
- **HttpOnly Cookies**: JWT tokens are stored in HttpOnly cookies to prevent XSS attacks. The token cannot be accessed via JavaScript.
- **30-day expiration**: Tokens expire after 30 days for a balance between security and user convenience.
- **Password hashing**: bcrypt with salt rounds of 10 for secure password storage.

### State Management
- **Redux Toolkit**: Chosen for predictable state management with built-in async handling via createAsyncThunk.
- **Slice-based architecture**: Separate slices for auth, gigs, and bids for maintainability.

### Real-Time Updates
- **Socket.IO**: Enables real-time bid notifications and gig status updates.
- **Room-based messaging**: Users join rooms based on user ID and gig ID for targeted notifications.

### Race Condition Handling
The hiring logic implements optimistic locking to prevent race conditions:

```javascript
const updatedGig = await Gig.findOneAndUpdate(
  { 
    _id: gig._id, 
    status: 'open'  // Only update if still open
  },
  { 
    status: 'assigned',
    hiredFreelancerId: bid.freelancerId
  },
  { new: true }
);

if (!updatedGig) {
  // Another hire happened first - race condition handled
  return res.status(400).json({
    message: 'This gig has already been assigned'
  });
}
```

This ensures that even with concurrent hire requests, only one will succeed.

### Database Indexing
- **Text index** on Gig title and description for efficient search
- **Compound unique index** on Bid (gigId, freelancerId) to enforce one bid per user per gig at the database level

---

## Security Considerations

1. **HttpOnly Cookies**: Prevents XSS token theft
2. **CORS Configuration**: Restricts API access to trusted origins
3. **Password Hashing**: bcrypt prevents plaintext password storage
4. **Input Validation**: Mongoose schemas enforce data constraints
5. **Authentication Middleware**: Protected routes verify JWT before processing
6. **Owner Verification**: Only gig owners can view bids and hire freelancers
7. **SameSite Cookie Attribute**: Set to 'none' with secure flag for cross-site deployment

---

## License

This project is open source and available under the [MIT License](LICENSE).

---
