# EduNet Backend API

A modern Node.js/Express.js backend API for the EduNet AI Connect platform.

## 🚀 Features

- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **JWT Authentication**
- **Socket.io** for real-time features
- **File upload** support
- **Email notifications**
- **Rate limiting**
- **CORS** enabled
- **Helmet** security headers
- **Morgan** logging

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database and app configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Custom middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── index.ts         # Server entry point
├── package.json
├── tsconfig.json
├── env.example
└── README.md
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   Then edit `.env` with your configuration.

3. **Install MongoDB** (if not already installed):
   - [MongoDB Installation Guide](https://docs.mongodb.com/manual/installation/)

4. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📋 Available Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

### Projects (Collaboration Board)
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project by ID
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Posts (Social Feed)
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post

### Communities
- `GET /api/communities` - Get all communities
- `POST /api/communities` - Create new community

### Health Check
- `GET /api/health` - Server health status

## 🔧 Environment Variables

Copy `env.example` to `.env` and configure:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/edunet

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Setup

1. **Install MongoDB** locally or use MongoDB Atlas
2. **Create database** named `edunet`
3. **Update MONGODB_URI** in your `.env` file

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register/Login** to get a token
2. **Include token** in Authorization header:
   ```
   Authorization: Bearer <your-token>
   ```

## 📡 WebSocket Support

Socket.io is configured for real-time features:
- Real-time messaging
- Live notifications
- Collaborative features

## 🧪 Testing

```bash
npm test
```

## 🚀 Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Set production environment variables**

3. **Start production server:**
   ```bash
   npm start
   ```

## 📝 TODO

- [ ] Implement authentication controllers
- [ ] Create database models
- [ ] Add validation middleware
- [ ] Implement file upload
- [ ] Add email notifications
- [ ] Set up testing framework
- [ ] Add API documentation
- [ ] Implement rate limiting
- [ ] Add logging system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License 