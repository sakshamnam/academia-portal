const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let students = [
  {
    id: 1,
    name: "Rahul",
    branch: "CSE",
    skills: ["C++", "JavaScript"],
    year: 1
  },
  {
    id: 2,
    name: "Priya",
    branch: "CSE",
    skills: ["Python", "HTML"],
    year: 1
  }
];

// GET all students
app.get("/api/students", (req, res) => {
  res.json(students);
});

// GET single student
app.get("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  res.json(student);
});

// POST new student
app.post("/api/students", (req, res) => {
  const { name, branch, skills, year } = req.body;

  if (!name || !branch || !skills || !year) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    branch,
    skills,
    year
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

// PUT update student
app.put("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const student = students.find((student) => student.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const { name, branch, skills, year } = req.body;

  student.name = name || student.name;
  student.branch = branch || student.branch;
  student.skills = skills || student.skills;
  student.year = year || student.year;

  res.json(student);
});

// DELETE student
app.delete("/api/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = students.findIndex((student) => student.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.json({
    message: "Student deleted successfully",
    student: deletedStudent
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Academia Portal Backend is Running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
