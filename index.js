const express = require("express");
const cors = require("cors");
const { PrismaClient  } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;

// Basic route
app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.post("/refers", async (req, res) => {
  try {
    const { Name, FriendEmail, FriendName, Course } = req.body;
    if (!Name || !FriendEmail || !FriendName || !Course) {
      return res.status(400).json({ error: "Name and Course are required" });
    }
    const newReferral = await prisma.referalDataTable.create({
      data: {
        name: Name,
        friendEmail: FriendEmail,
        friendName: FriendName,
        course: Course,
      },
    });
    // console.log(Name, FriendEmail, FriendName, Course);
    res
      .status(201)
      .json({ message: "Data inserted successfully", data: newReferral });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});