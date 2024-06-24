const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Check database connection
prisma
  .$connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Failed to connect to the database", err));

app.post("/signup", async (req, res) => {
  const { name, lastName, email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: user.id }, "your-secret-key");

  res.json({
    token,
    user,
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ userId: user.id }, "your-secret-key");

  res.json({
    token,
    user,
  });
});

app.post("/message", async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      receiverId,
    },
  });

  res.json(message);
});

app.get("/messages", async (req, res) => {
  const { user1Id, user2Id } = req.query;

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { AND: [{ senderId: user1Id }, { receiverId: user2Id }] },
        { AND: [{ senderId: user2Id }, { receiverId: user1Id }] },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  res.json(messages);
});

//update user bio
app.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { bio } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: id },
      data: { bio },
    });

    res.json(user);
  } catch (error) {
    console.error("Error updating user bio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch user bio
app.get("/user/:id/bio", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ bio: user.bio });
  } catch (error) {
    console.error("Error fetching user bio:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// fetch messages
app.get("/messages", async (req, res) => {
  const messages = await prisma.message.findMany();
  res.json(messages);
});

// create message
app.post("/messages", async (req, res) => {
  const { text, sender } = req.body;

  const newMessage = await prisma.message.create({
    data: {
      text,
      sender,
    },
  });

  res.json(newMessage);
});

app.listen(3000, () => console.log("Server is running on port 3000"));
