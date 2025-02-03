# DealDive - React Native E-commerce App

A full-stack e-commerce solution with modern features like AR product visualization, seamless payments, and atomic design architecture. Inspired by Flipkart's functionality with enhanced user experiences.

![DealDive Demo](https://example.com/path-to-demo-gif.gif) <!-- Add actual demo GIF link -->

## Key Features

### Core Functionality

- 🛍️ Product Browsing & Search with AR Preview
- 🔐 Phone-based User Authentication
- 🛒 Real-time Cart Synchronization
- 💳 Razorpay Payment Gateway Integration
- 📱 Cross-platform (iOS & Android) Support
- 📊 Admin Dashboard with Analytics

### Enhanced Experiences

- Augmented Reality product visualization
- Order tracking with real-time updates
- Personalized product recommendations
- Offline-first cart functionality
- Secure JWT-based authentication

## Tech Stack

### Frontend

- **React Native** (Core framework)
- **Redux Toolkit** (State management)
- **React Navigation** (Routing)
- **React Native Reanimated** (Animations)
- **React Native Paper** (UI Components)
- **React Native AR** (Augmented Reality)

### Backend

- **Node.js/Express.js** (REST API)
- **MongoDB** (Database)
- **Mongoose** (ODM)
- **AdminJS** (Admin Dashboard)
- **Razorpay** (Payment Gateway)
- **JWT** (Authentication)

### Services

- **Render** (Backend Hosting)
- **MongoDB Atlas** (Cloud Database)
- **Firebase** (Optional for Analytics/Push)

## Project Structure

### Frontend (React Native)

```
src/
├── components/    # Atomic Design Components
│   ├── common/     # Basic UI Elements
│   ├── ui/         # Composite Components
│   └── layouts/    # Complex UI Sections
├── screens/       # App Screens
├── navigation/    # Routing Configuration
├── store/         # Redux Store
├── services/       # API Clients
└── utils/         # Helpers & Config
```

### Backend (Node.js)

```
backend/
├── models/        # MongoDB Schemas
├── routes/        # Express Routes
├── controllers/   # Business Logic
├── config/        # Environment Setup
├── middlewares/   # Auth & Validations
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas URI
- Razorpay API keys
- React Native development environment

### Installation

1. Clone the repository[frontend/backend]:

```bash
git clone https://github.com/kumarsatwik/dealdive.git
git clone https://github.com/kumarsatwik/dealdive-backend.git
```

2. Install dependencies:

```bash
# Frontend
cd dealdive && yarn install


# Backend
cd backend && yarn install
```

3. Environment Setup:

```bash
# Frontend .env
API_BASE_URL=your_backend_url
RAZORPAY_KEY_ID=your_razorpay_key

# Backend .env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## Running the App

### Development

```bash
# Start Metro
yarn start

# Android
yarn android

# iOS
yarn ios
```

### Production Build

```bash
# Android
cd android && ./gradlew assembleRelease

# iOS
cd ios && pod install && xcodebuild -workspace dealdive.xcworkspace -scheme dealdive -configuration Release
```

## Key Packages & Purpose

| Package                 | Purpose                       |
| ----------------------- | ----------------------------- |
| react-native-reanimated | Smooth animations & gestures  |
| react-navigation        | Native-like navigation        |
| react-native-paper      | Material Design components    |
| redux-toolkit           | State management              |
| axios                   | API communication             |
| react-native-viro       | AR product visualization      |
| razorpay-react-native   | Payment processing            |
| jwt-decode              | Authentication token handling |

## Demo

[![DealDive Demo Video](https://img.youtube.com/vi/YOUR_VIDEO_ID/0.jpg)](https://youtube.com/watch?v=YOUR_VIDEO_ID)

<!-- Add actual screenshots -->

| Home Screen   | AR View     | Checkout          |
| ------------- | ----------- | ----------------- |
| ![Home](link) | ![AR](link) | ![Checkout](link) |

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Open Pull Request

## License

MIT License - See [LICENSE](LICENSE) for details
