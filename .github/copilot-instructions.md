# Copilot Instructions for Learning Management System

## Architecture Overview

This is a **MERN stack LMS (Learning Management System)** with client-server separation:

- **Client**: React 19 + Redux Toolkit + Tailwind CSS + Vite (hot module replacement enabled)
- **Server**: Express.js with MongoDB + JWT authentication + Cookie-based sessions
- **Data Flow**: Redux for client state → RTK Query API layer → Express backend → MongoDB

### Key Project Structure
```
client/               # React frontend (Vite, port 5173)
  src/
    pages/           # Login, Signup page components
    components/      # Navbar, reusable UI components
    features/        # Redux slices + RTK Query API definitions
    app/             # Redux store configuration
server/              # Express backend (port 3000)
  src/
    models/          # MongoDB schemas (User, Course planned)
    controllers/     # Route handlers
    routes/          # API endpoint definitions
    middlewares/     # Auth middleware
    mdconnection/    # MongoDB connection setup
```

## Critical Patterns & Conventions

### 1. **State Management: Redux + RTK Query**
- **Redux Slice** (`features/AuthSlice.js`): Manages authentication state (`isAuthenticated`, `user`)
  - Actions: `Userlogin()`, `Userlogout()`
- **RTK Query** (`features/api/authApi.js`): API calls with caching
  - `useLoginMutation()`, `useRegisterMutation()` hooks used in pages
  - **Important**: Register mutation has `onQueryStarted` hook that dispatches `Userlogin` action
  - Example: `const [register, {data, error, isLoading}] = useRegisterMutation()`

### 2. **Authentication Flow**
1. User submits credentials (email/password)
2. RTK Query mutation calls `/api/users/register` or `/api/users/login`
3. Server returns user object + JWT token
4. Token stored in HTTP-only cookie (handled by backend)
5. Redux state updated via `Userlogin` action
6. Navbar shows authenticated view when `user` state is truthy

**Server-side** (`controllers/userControllers.js`):
- Password hashing with bcrypt (salt rounds: 10)
- JWT expiration: 1 hour
- Cookie: `httpOnly: true`, cleared on logout

### 3. **Styling: Tailwind CSS + DaisyUI**
- Imported via `@tailwindcss/vite` plugin (v4)
- DaisyUI components used: dropdowns, avatars, buttons
- **Responsive breakpoint**: `md:` prefix for desktop views
- Example: `hidden md:block` = hidden on mobile, visible on desktop
- **Color scheme**: Gray/blue/purple gradients for form backgrounds

### 4. **Component Architecture**
- **Navbar** (`components/Navbar.jsx`): 
  - Fixed top navigation with responsive behavior
  - Desktop: Shows profile dropdown + dark mode toggle (DaisyUI)
  - Mobile: Shows hamburger menu (IoReorderThreeOutline icon)
  - **Current issue**: `handleSlideBar()` sets local `btn = true` (never triggers sidebar!)
- **Pages** (Login, Signup): Form handling with `react-hot-toast` notifications
  - Form state managed locally with `useState()`
  - Submit handler calls mutation, shows success/error toast

### 5. **Icon Library**
- `react-icons/io5`: IoReorderThreeOutline (hamburger menu)
- `react-icons/ci`: CiDark (dark mode icon)
- `lucide-react`: Available but not actively used yet

### 6. **Toast Notifications**
- Used globally: `import toast from "react-hot-toast"`
- Wrapped in App.jsx: `<ToastsContainer />`
- Pattern: `toast.success()`, `toast.error()`
- **Note**: Messages often hardcoded in UI, not from API response

## Development Workflow

### Client Setup
```bash
cd client
npm install
npm run dev          # Starts Vite dev server (http://localhost:5173)
npm run build        # Production build to dist/
npm run lint         # ESLint check
```

### Server Setup
```bash
cd server
npm install
npm start            # Runs app.js (http://localhost:3000)
```

### Environment Variables
- **Server** (`.env`): `PORT=3000`, `MONGO_URL`, `JWT_SECRET`
- **Client**: No .env currently used; API base URL hardcoded in `authApi.js`

## Important Implementation Details

### API Integration Pattern
```javascript
// In authApi.js - RTK Query endpoint
register: builder.mutation({
  query: (inputData) => ({
    url: "register",
    method: 'POST',
    body: inputData,
  }),
  // Side effect: dispatch Redux action on success
  async onQueryStarted(arg, {dispatch, queryFulfilled}) {
    const result = await queryFulfilled;
    dispatch(Userlogin({user: result.data.user}))
  }
})
```

### Form Submission Pattern
```javascript
// In pages (Login/Signup)
const handleSubmit = async(e) => {
  e.preventDefault();
  const userData = {email, password}; // or with username
  const [mutation, {isLoading}] = useMutation();
  await mutation(userData);
  toast.success("Success message");
}
```

### Known Issues & Limitations
1. **Navbar Mobile Menu**: `handleSlideBar()` updates local state (`btn`) without triggering state change or opening sidebar component - **needs React state + conditional rendering**
2. **User Auth Check**: `const user = false` hardcoded in Navbar - should read from Redux store
3. **Form Validation**: Minimal client-side validation; server validates required fields
4. **Auth Middleware Bug**: `req.Cookies` should be `req.cookies` (capital C typo in `/middlewares/AuthMiddleware.js`)
5. **Email Verification**: Not implemented; passwords not confirmed during signup
6. **Course Model**: Defined in UserSchema but Course model not yet created

## When Adding Features

### Adding a New API Endpoint
1. Create route in `server/src/routes/userRoutes.js`
2. Add controller in `server/src/controllers/userControllers.js`
3. Add RTK Query endpoint in `client/src/features/api/authApi.js`
4. Use the generated hook in React component (e.g., `useFetchCourseMutation()`)
5. Dispatch Redux actions if state should be persisted

### Adding a New Page
1. Create `.jsx` file in `client/src/pages/`
2. Add route in `App.jsx` (inside `<Routes>`)
3. Import and use RTK Query hooks for API calls
4. Wrap form submissions with toast notifications
5. Include `<Navbar />` at top if it's an authenticated page

### Mobile-First Responsive Changes
- Use `hidden md:flex` pattern (hidden by default, shown on desktop)
- Test breakpoints: Tailwind's `md:` = 768px
- Sidebar/offcanvas: Consider DaisyUI drawer component or manual state-controlled div

## Redux/RTK Query Reference
- **Store location**: `client/src/app/store.js`
- **Root reducer combines**: `authApi.reducer` + `authReducer`
- **Middleware**: `authApi.middleware` automatically added
- **Selectors**: Access state via hooks (no direct `useSelector` calls in current code)

## External Dependencies
- **Authentication**: bcrypt (server), jsonwebtoken (server)
- **Database**: MongoDB Atlas (connection in `.env`)
- **UI**: DaisyUI (TailwindCSS plugin) for pre-styled components
- **HTTP Client**: axios (installed but RTK Query's fetch used for auth)
- **Routing**: react-router-dom v7
