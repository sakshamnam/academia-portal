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
// =========================
// SKILL ASSESSMENT
// =========================

const assessmentQuestions = [
  {
    id: 1,
    question: "Which language is mainly used to add interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: "JavaScript",
    skill: "JavaScript"
  },
  {
    id: 2,
    question: "Which language is used to structure web pages?",
    options: ["Python", "HTML", "C++", "SQL"],
    answer: "HTML",
    skill: "HTML"
  },
  {
    id: 3,
    question: "Which language is commonly used for Data Science and AI?",
    options: ["Python", "CSS", "HTML", "SQL"],
    answer: "Python",
    skill: "Python"
  },
  {
    id: 4,
    question: "Which technology is used to style web pages?",
    options: ["JavaScript", "CSS", "SQL", "Node.js"],
    answer: "CSS",
    skill: "CSS"
  },
  {
    id: 5,
    question: "Which language is used to query databases?",
    options: ["SQL", "HTML", "CSS", "React"],
    answer: "SQL",
    skill: "SQL"
  },
  {
    id: 6,
    question: "Which language is commonly used for high-performance programming?",
    options: ["C++", "HTML", "CSS", "SQL"],
    answer: "C++",
    skill: "C++"
  },
  {
    id: 7,
    question: "React is mainly used for building what?",
    options: [
      "Databases",
      "User interfaces",
      "Operating systems",
      "Networks"
    ],
    answer: "User interfaces",
    skill: "React"
  },
  {
    id: 8,
    question: "Node.js allows JavaScript to run mainly where?",
    options: [
      "On the server",
      "Only in HTML",
      "Only in CSS",
      "Only in databases"
    ],
    answer: "On the server",
    skill: "Node.js"
  }
];

// Get questions
app.get("/api/assessment/questions", (req, res) => {
  const questions = assessmentQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));

  res.json(questions);
});

// Submit assessment
app.post("/api/assessment/submit", (req, res) => {
  const { studentId, answers } = req.body;

  if (!studentId || !Array.isArray(answers)) {
    return res.status(400).json({
      message: "studentId and answers are required"
    });
  }

  const student = students.find(
    (student) => student.id === Number(studentId)
  );

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  let correct = 0;
  const detectedSkills = [];

  answers.forEach((item) => {
    const question = assessmentQuestions.find(
      (q) => q.id === Number(item.questionId)
    );

    if (!question) return;

    if (
      String(item.answer).toLowerCase() ===
      question.answer.toLowerCase()
    ) {
      correct++;

      if (!detectedSkills.includes(question.skill)) {
        detectedSkills.push(question.skill);
      }
    }
  });

  const total = assessmentQuestions.length;
  const score = Math.round((correct / total) * 100);

  // Add detected skills to student's profile
  student.skills = [
    ...new Set([...student.skills, ...detectedSkills])
  ];

  const jobReadiness = Math.min(
    100,
    Math.round(score * 0.7 + student.skills.length * 3)
  );

  res.json({
    message: "Assessment completed successfully",
    studentId: student.id,
    score,
    correct,
    total,
    detectedSkills,
    skills: student.skills,
    jobReadiness
  });
});
// Test route
app.get("/", (req, res) => {
  res.send("Academia Portal Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
