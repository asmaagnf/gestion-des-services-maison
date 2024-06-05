const express = require("express");
const app = express();
const cors = require("cors");
const http = require('http');
const { Server } = require('socket.io');
const { ChatRoom, Message, users } = require('./models');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  socket.on('sendMessage', async (message) => {
    try {
      const newMessage = await Message.create(message);
      const populatedMessage = await Message.findOne({
        where: { id: newMessage.id },
        include: [{ model: users, as: 'sender', attributes: ['username'] }],
      });
      io.to(message.chatRoomId).emit('receiveMessage', populatedMessage);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const db = require("./models");
app.use('/uploads', express.static('uploads'));

// ROUTERS
const usersRouter = require('./routes/UsersRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const categoryRoutes = require('./routes/categoriesRoutes');
const SubcategoryRoutes = require('./routes/subcategoriesRoutes');
const reclamationRoutes = require('./routes/reclamationRoutes'); 
const commentRoutes = require("./routes/commentRoutes");
const demandeRoutes = require('./routes/demandeRoutes'); 
const messageRoutes = require('./routes/messageRoutes');

// Routes
app.use("/api/users", usersRouter);
app.use("/users", usersRouter);
app.use('/api', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', SubcategoryRoutes);
app.use('/api/reclamations', reclamationRoutes); 
app.use('/api/demande', demandeRoutes);
app.use("/api/comments", commentRoutes); 
app.use("/api/chat", messageRoutes);

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
    server.listen(3001, () => { // Use server.listen instead of app.listen
      console.log("server running on port 3001");
    });
  })
  .catch(error => {
    console.error('Error synchronizing the database:', error);
  });
