// ==========================================
// AcademiaConnect - Common JavaScript
// ==========================================

// Show success message
function showSuccess(message) {
    const box = document.getElementById("successMessage");

    if (box) {
        box.textContent = message;
        box.style.display = "block";

        setTimeout(() => {
            box.style.display = "none";
        }, 3000);
    }
}


// ==========================================
// Logout
// ==========================================

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


// ==========================================
// Get Logged-in User
// ==========================================

function getLoggedInUser() {
    const user = localStorage.getItem("loggedInUser");

    if (user) {
        try {
            return JSON.parse(user);
        } catch (error) {
            console.error("Invalid user data");
            return null;
        }
    }

    return null;
}


// ==========================================
// Protect Dashboard Pages
// ==========================================

function checkLogin() {
    const user = getLoggedInUser();

    if (!user) {
        window.location.href = "login.html";
        return null;
    }

    return user;
}


// ==========================================
// Save User
// ==========================================

function saveUser(user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
}


// ==========================================
// Skills Matching
// ==========================================

function calculateMatch(studentSkills, requiredSkills) {

    if (!studentSkills || !requiredSkills || requiredSkills.length === 0) {
        return 0;
    }

    let matched = 0;

    requiredSkills.forEach(skill => {
        const found = studentSkills.some(
            studentSkill =>
                studentSkill.toLowerCase() === skill.toLowerCase()
        );

        if (found) {
            matched++;
        }
    });

    return Math.round((matched / requiredSkills.length) * 100);
}


// ==========================================
// Skill Gap
// ==========================================

function getMissingSkills(studentSkills, requiredSkills) {

    if (!studentSkills || !requiredSkills) {
        return [];
    }

    return requiredSkills.filter(requiredSkill => {

        return !studentSkills.some(
            studentSkill =>
                studentSkill.toLowerCase() === requiredSkill.toLowerCase()
        );

    });
}


// ==========================================
// Save Internship
// ==========================================

function saveInternship(internship) {

    let internships =
        JSON.parse(localStorage.getItem("internships")) || [];

    internship.id = Date.now();

    internships.push(internship);

    localStorage.setItem(
        "internships",
        JSON.stringify(internships)
    );
}


// ==========================================
// Get Internships
// ==========================================

function getInternships() {

    return JSON.parse(
        localStorage.getItem("internships")
    ) || [];
}


// ==========================================
// Save Application
// ==========================================

function saveApplication(application) {

    let applications =
        JSON.parse(localStorage.getItem("applications")) || [];

    application.id = Date.now();

    applications.push(application);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );
}


// ==========================================
// Get Applications
// ==========================================

function getApplications() {

    return JSON.parse(
        localStorage.getItem("applications")
    ) || [];
}


// ==========================================
// Search Jobs
// ==========================================

function searchJobs(jobs, keyword) {

    if (!keyword) {
        return jobs;
    }

    keyword = keyword.toLowerCase();

    return jobs.filter(job => {

        return (
            job.title?.toLowerCase().includes(keyword) ||
            job.company?.toLowerCase().includes(keyword) ||
            job.location?.toLowerCase().includes(keyword)
        );

    });
}


// ==========================================
// Clear Demo Data
// ==========================================

function clearDemoData() {

    localStorage.removeItem("users");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("internships");
    localStorage.removeItem("applications");

    alert("Demo data cleared!");
    window.location.href = "index.html";
}

async function loadStudents() {
  try {
    const response = await fetch("http://localhost:5000/api/students");

    if (!response.ok) {
      throw new Error("Failed to fetch students");
    }

    const students = await response.json();

    const container = document.getElementById("students");

    if (!container) return;

    container.innerHTML = students.map(student => `
      <div>
        <h3>${student.name}</h3>
        <p>Branch: ${student.branch}</p>
        <p>Skills: ${student.skills.join(", ")}</p>
        <p>Year: ${student.year}</p>
      </div>
    `).join("");

  } catch (error) {
    console.error("Backend connection error:", error);
  }
}

loadStudents();
 