// Step 1: Array of Objects
let students = [
  { id: 1, name: "Ali", age: 20, grade: "A", course: "Web Development" },
  { id: 2, name: "Sara", age: 22, grade: "B", course: "AI" },
  { id: 3, name: "Bilal", age: 19, grade: "C", course: "Networking" }
];
console.log(typeof (students))

const cardContainer = document.getElementById("cardContainer");

// Step 2: Display Cards
function renderCards(data = students) {
  cardContainer.innerHTML = data.map(student => `
    <div class="bg-white p-5 rounded-lg shadow-md border hover:shadow-lg transition">
      <h3 class="text-xl font-bold text-purple-700">${student.name}</h3>
      <p><strong>Age:</strong> ${student.age}</p>
      <p><strong>Grade:</strong> ${student.grade}</p>
      <p><strong>Course:</strong> ${student.course}</p>
      <div class="flex justify-between mt-4">
        <button onclick="editStudent(${student.id})" class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
        <button onclick="deleteStudent(${student.id})" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  `).join("");
}
renderCards();

// Step 3: Add Student
document.getElementById("studentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const age = parseInt(document.getElementById("age").value);
  const grade = document.getElementById("grade").value;
  const course = document.getElementById("course").value;

  students.push({ id: Date.now(), name, age, grade, course });
  e.target.reset();
  renderCards();
});

// Step 4: Delete Student
function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  renderCards();
}

// Step 5: Edit Student
let editId = null;
const modal = document.getElementById("editModal");
const updateBtn = document.getElementById("updateBtn");
const cancelBtn = document.getElementById("cancelBtn");

function editStudent(id) {
  editId = id;
  const s = students.find(st => st.id === id);
  document.getElementById("editName").value = s.name;
  document.getElementById("editAge").value = s.age;
  document.getElementById("editGrade").value = s.grade;
  document.getElementById("editCourse").value = s.course;
  modal.classList.remove("hidden");
}

updateBtn.addEventListener("click", () => {
  const updated = {
    id: editId,
    name: document.getElementById("editName").value,
    age: parseInt(document.getElementById("editAge").value),
    grade: document.getElementById("editGrade").value,
    course: document.getElementById("editCourse").value
  };
  students = students.map(s => s.id === editId ? updated : s);
  modal.classList.add("hidden");
  renderCards();
});

cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

// Step 6: Search & Filter
function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const grade = document.getElementById("filterGrade").value;
  const course = document.getElementById("filterCourse").value;
  const ageFilter = document.getElementById("filterAge").value;

  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(keyword) &&
    (grade === "" || s.grade === grade) &&
    (course === "" || s.course === course)
  );

  if (ageFilter === "under20") filtered = filtered.filter(s => s.age < 20);
  else if (ageFilter === "20to22") filtered = filtered.filter(s => s.age >= 20 && s.age <= 22);
  else if (ageFilter === "above22") filtered = filtered.filter(s => s.age > 22);

  renderCards(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("filterGrade").addEventListener("change", applyFilters);
document.getElementById("filterCourse").addEventListener("change", applyFilters);
document.getElementById("filterAge").addEventListener("change", applyFilters);

document.getElementById("resetFilters").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("filterGrade").value = "";
  document.getElementById("filterCourse").value = "";
  document.getElementById("filterAge").value = "";
  renderCards();
});
