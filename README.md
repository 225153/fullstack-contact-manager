# 📇 Full-Stack Contact Manager

A modern, secure address book application that allows users to manage their personal contacts with authentication and authorization.

## 🚀 Features

- 🔐 **JWT-based Authentication** - Secure user authentication with JSON Web Tokens
- 👤 **User Registration & Login** - Create account with validation and secure password hashing
- 📝 **CRUD Operations** - Create, Read, Update, and Delete contacts
- 🖼️ **Image Upload** - Upload and display contact profile pictures
- 🔒 **Rate Limiting** - Protection against brute force attacks and API abuse
- 👥 **Multi-User Support** - Isolated contact lists per user
- ⚡ **Real-time Validation** - Client and server-side form validation
- 🎨 **Responsive UI** - Clean interface with SweetAlert2 notifications
- 🛡️ **Authorization Guards** - Route protection and secure API endpoints

## 🛠️ Tech Stack

### Frontend

- **Angular 19** - Modern TypeScript framework
- **RxJS** - Reactive programming
- **TypeScript** - Type-safe development
- **SweetAlert2** - Beautiful alert notifications

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Bun** - Fast JavaScript runtime
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Security & Validation

- **JWT (jsonwebtoken)** - Token-based authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation
- **express-rate-limit** - Rate limiting middleware

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **Bun** runtime installed
- **MongoDB** (local instance or cloud)
- **Angular CLI** (`npm install -g @angular/cli`)

## 🔧 Installation

### 1. Clone the repository

```bash
git clone https://github.com/225153/fullstack-contact-manager.git
cd fullstack-contact-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (optional) or ensure MongoDB is running locally at `mongodb://127.0.0.1:27017/adressbook`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

## 🚀 Running the Application

### Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
mongod
```

### Start Backend Server

```bash
cd backend
bun server.js
```

Backend will run on `http://localhost:3000`

### Start Frontend Server

```bash
cd frontend
ng serve
```

Frontend will run on `http://localhost:4200`

## 📁 Project Structure

```
fullstack-contact-manager/
├── backend/
│   ├── connect/
│   │   └── connect.js          # Database connection
│   ├── middleware/
│   │   ├── auth.js             # JWT authentication middleware
│   │   ├── rateLimiter.js      # Rate limiting configuration
│   │   └── validation.js       # Input validation rules
│   ├── models/
│   │   ├── contact.js          # Contact schema
│   │   └── usermodel.js        # User schema
│   ├── routes/
│   │   ├── contact.routes.js   # Contact endpoints
│   │   └── user.route.js       # User endpoints
│   ├── uploads/                # Uploaded contact images
│   ├── server.js               # Main server file
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── guards/
    │   │   │   └── auth-guard.ts      # Route protection
    │   │   ├── interceptors/
    │   │   │   └── auth.interceptor.ts # HTTP interceptor
    │   │   ├── services/
    │   │   │   ├── user.ts            # User service
    │   │   │   └── contact.ts         # Contact service
    │   │   ├── home/
    │   │   │   ├── list/              # Contact list component
    │   │   │   ├── ajout/             # Add contact component
    │   │   │   └── update/            # Update contact component
    │   │   ├── login/                 # Login component
    │   │   ├── register/              # Register component
    │   │   └── notfound/              # 404 page
    │   └── ...
    └── package.json
```

## 🔑 API Endpoints

### Authentication

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/user/signup` | Register new user |
| POST   | `/user/signin` | Login user        |

### Contacts (Protected Routes - Require JWT)

| Method | Endpoint                           | Description               |
| ------ | ---------------------------------- | ------------------------- |
| POST   | `/contact/addcontact`              | Add new contact           |
| GET    | `/contact/getcontactsuser/:idUser` | Get all contacts for user |
| GET    | `/contact/getcontact/:id`          | Get single contact        |
| PUT    | `/contact/updatecontact/:id`       | Update contact            |
| DELETE | `/contact/deletecontact/:id`       | Delete contact            |

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure authentication with Bearer tokens
- **Rate Limiting**:
  - Login: 5 attempts per 15 minutes
  - Register: 3 attempts per hour
  - API: 100 requests per 15 minutes
- **Input Validation**: Server-side validation for all inputs
- **Authorization**: Users can only access their own contacts
- **Compound Unique Indexes**: Email and phone unique per user

## 📝 Validation Rules

### User Registration

- **Name/Lastname**: 3-20 alphanumeric characters (with underscores)
- **Email**: Valid email format
- **Password**: 6-20 characters, must contain uppercase, lowercase, and number

### Contact

- **Name**: Required
- **Lastname**: Required
- **Email**: Required, valid email format
- **Phone**: Required
- **Address**: Optional
- **Image**: Optional (max 10MB)

## 🎨 Features Overview

### User Management

- Secure registration with validation
- Login with JWT token generation
- Password encryption with bcrypt

### Contact Management

- Add contacts with image upload
- View all contacts in a responsive list
- Update contact information
- Delete contacts with confirmation
- Each user has isolated contact list

### UI/UX

- Clean, modern interface
- Form validation feedback
- Success/error notifications with SweetAlert2
- Responsive design
- Loading states

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

Created by [225153](https://github.com/225153)

## 🐛 Known Issues

None at the moment. Please report any bugs in the Issues section.

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made with ❤️ using Angular and Node.js
