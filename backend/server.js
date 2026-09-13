
const express = require("express");

const app = express();

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

app.get("/api/students", (req, res) => {
  res.json(students);
});

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
app.get("/", (req, res) => {
  res.send("Academia Portal Backend is Running!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
