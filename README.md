# LMS (Learning Management System)

A comprehensive Learning Management System built with React for the frontend and Express.js with MongoDB for the backend. This platform enables users to create, manage, and purchase online courses with video lectures, secure payments, and user authentication.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Project Structure](#project-structure)
- [Technologies & Dependencies](#technologies--dependencies)
- [Environment Variables](#environment-variables)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [API Routes](#api-routes)
- [Configuration Properties](#configuration-properties)
- [Features](#features)

---

## Project Overview

This LMS project is a full-stack application that allows:
- User registration and authentication
- Course creation and management
- Video lecture uploads and streaming
- Course purchases with payment integration
- User dashboard and course progress tracking
- Admin panel for course management
- Rate limiting and security measures

---

## Project Structure

```
LMS1/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Page components
│   │   ├── features/         # Redux features/slices
│   │   ├── app/              # App layout components
│   │   ├── admin/            # Admin panel pages
│   │   ├── students/         # Student-specific components
│   │   ├── assets/           # Static assets
│   │   ├── App.jsx           # Main app component
│   │   ├── index.css         # Global styles
│   │   └── main.jsx          # Entry point
│   ├── public/               # Public static files
│   ├── package.json
│   ├── vite.config.js        # Vite configuration
│   └── eslint.config.js      # ESLint configuration
│
└── server/                    # Express Backend
    ├── src/
    │   ├── controllers/      # Route controllers
    │   ├── models/           # MongoDB schemas
    │   ├── routes/           # API routes
    │   ├── middlewares/      # Custom middlewares
    │   ├── mdconnection/     # Database connection
    │   └── RateLimiting/     # Rate limiting configuration
    ├── utils/                # Utility functions
    ├── uploads/              # File uploads storage
    ├── app.js                # Main server file
    └── package.json
```

---

## Technologies & Dependencies

### Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^19.1.1 | UI library |
| `react-dom` | ^19.1.1 | React DOM rendering |
| `react-router-dom` | ^7.9.1 | Client-side routing |
| `@reduxjs/toolkit` | ^2.9.0 | State management |
| `react-redux` | ^9.2.0 | Redux bindings for React |
| `axios` | ^1.13.2 | HTTP client |
| `tailwindcss` | ^4.1.13 | Utility-first CSS framework |
| `@tailwindcss/vite` | ^4.1.13 | Tailwind integration with Vite |
| `lucide-react` | ^0.554.0 | Icon library |
| `react-icons` | ^5.5.0 | Icon pack |
| `react-player` | ^3.4.0 | Video player component |
| `react-hot-toast` | ^0.3.0 | Toast notifications |

### Frontend Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^7.1.6 | Build tool and dev server |
| `@vitejs/plugin-react` | ^5.0.2 | React plugin for Vite |
| `eslint` | ^9.35.0 | Code linting |
| `daisyui` | ^5.5.5 | Tailwind component library |

### Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.1.0 | Web framework |
| `mongoose` | ^8.18.1 | MongoDB ODM |
| `dotenv` | ^17.2.2 | Environment variable management |
| `cors` | ^2.8.5 | Cross-origin resource sharing |
| `cookie-parser` | ^1.4.7 | Cookie parsing middleware |
| `jsonwebtoken` | ^9.0.2 | JWT authentication |
| `bcrypt` | ^6.0.0 | Password hashing |
| `multer` | ^2.0.2 | File upload middleware |
| `express-rate-limit` | ^8.5.2 | Rate limiting middleware |
| `cloudinary` | ^2.8.0 | Cloud storage for media |
| `razorpay` | ^2.9.6 | Payment gateway |
| `uuid` | ^13.0.0 | Unique ID generation |

---

## Environment Variables

### Server Environment Variables (`.env` file in `/server`)

```
# Port Configuration
PORT=5000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/lms

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Cloudinary Configuration (for video storage)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Razorpay Configuration (Indian payment gateway)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Stripe Configuration (International payment gateway - if used)
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL (for payment redirects)
FRONTEND_URL=http://localhost:5173
```

### Client Environment Variables (`.env` file in `/client`)

```
# Razorpay Configuration
VITE_RAZORPAY_KEY=your_razorpay_public_key
```

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud database)
- Git

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory and add all required environment variables (see Environment Variables section)

4. Start the server:
   ```bash
   npm start
   ```
   or for development with auto-reload:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the client directory and add Razorpay public key

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Running the Project

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm start
```
Server runs on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

---

## API Routes

### User Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile

### Course Routes (`/api/course`)
- `GET /` - Get all courses
- `GET /:id` - Get course details
- `POST /` - Create new course (admin only)
- `PUT /:id` - Update course (admin only)
- `DELETE /:id` - Delete course (admin only)

### Lecture Routes (`/api/lecture`)
- `GET /:courseId` - Get lectures for a course
- `POST /` - Create new lecture
- `PUT /:id` - Update lecture
- `DELETE /:id` - Delete lecture

### Video Upload Routes (`/api/video-upload`)
- `POST /` - Upload video to Cloudinary
- `GET /:videoId` - Get video details

### Payment Routes (`/api/payment`)
- `POST /create-order` - Create Razorpay order
- `POST /verify-payment` - Verify payment
- `POST /purchase-course` - Purchase course (Stripe)

---

## Configuration Properties

### CORS Configuration

**Server (`app.js`):**
```javascript
CORS Origin: http://localhost:5173
Credentials: true
```

This allows requests from the frontend to the backend with credentials support.

### Rate Limiting Configuration

**Applied to:** All API routes

- **Window**: 1 minute
- **Max Requests**: 100 requests per IP per minute
- **Response**: 429 status code with custom error message

### JWT Configuration

- **Expiration**: 7 days
- **Algorithm**: HS256 (HMAC SHA-256)
- **Secret Key**: Stored in `process.env.JWT_SECRET`

### Multer File Upload Configuration

**Used for:**
- Video uploads to Cloudinary
- Document uploads

**Storage:** Files are uploaded to Cloudinary cloud storage, temporary uploads stored in `/uploads` folder

### Vite Configuration

**Frontend (`vite.config.js`):**
```javascript
Plugins:
- React plugin for JSX support
- Tailwind CSS plugin for styling
```

### ESLint Configuration

**Rules:**
- ECMAScript 2020 compatibility
- React Hooks rules enabled
- React Refresh support
- Browser globals support
- Custom rule: No unused variables (except uppercase/underscore prefixed)

---

## Features

### User Management
- User registration with email and password
- Secure login with JWT authentication
- Password hashing with bcrypt
- User profile management
- Cookie-based session management

### Course Management
- Create and manage courses
- Add multiple lectures to courses
- Course metadata (title, description, instructor, etc.)
- Course pricing and availability

### Video Management
- Upload videos to Cloudinary
- Stream videos with react-player
- Video organization by lecture

### Payment Processing
- **Razorpay Integration** - Indian payment gateway
- **Stripe Integration** - International payment gateway
- Secure payment verification with HMAC signatures
- Order creation and tracking
- Course purchase history

### Security Features
- JWT-based authentication
- Rate limiting (100 requests/minute per IP)
- CORS protection
- Password hashing with bcrypt
- Secure payment verification

### UI/UX Features
- Responsive design with Tailwind CSS
- DaisyUI component library
- Icon libraries (Lucide React, React Icons)
- Toast notifications for user feedback
- Video player integration
- Admin dashboard
- Student dashboard

### State Management
- Redux Toolkit for global state
- Redux hooks for component integration
- Centralized data management

---

## Database Models

### User Model
```
- Email (unique)
- Password (hashed)
- First Name
- Last Name
- Role (student/instructor/admin)
- Profile Picture
- Bio
- Created At
- Updated At
```

### Course Model
```
- Title
- Description
- Instructor
- Category
- Price
- Thumbnail
- Duration
- Level
- Students Count
- Created At
- Updated At
```

### Lecture Model
```
- Title
- Description
- Video URL
- Course ID
- Order/Sequence
- Duration
- Created At
- Updated At
```

### Purchase Course Model
```
- User ID
- Course ID
- Purchase Date
- Amount Paid
- Status
- Payment ID
- Created At
```

---

## Error Handling

### Rate Limiting Error (429)
```json
{
  "success": false,
  "message": "Too many login attempts. Please try again after 15 minutes."
}
```

### Authentication Error (401)
- Invalid or missing JWT token
- Token expiration

### Validation Error (400)
- Missing required fields
- Invalid data format

### Server Error (500)
- Database connection issues
- Payment processing errors
- File upload errors

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## Support

For support, email support@lms.com or create an issue in the repository.

---

## Additional Notes

- Ensure MongoDB is running before starting the server
- Update environment variables with your actual API keys and credentials
- The frontend expects the backend to run on `http://localhost:5000`
- All sensitive information should be stored in environment variables, never commit `.env` files
- Rate limiting is applied to all routes for security

---

**Last Updated:** June 2026
