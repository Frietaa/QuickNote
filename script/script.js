const noteText = document.getElementById("note-text");
const noteTags = document.getElementById("note-tags");
const submitButton = document.getElementById("submit-note");
const noteList = document.getElementById("note-list");
const toggleDark = document.getElementById("toggle-dark");
const searchInput = document.getElementById("search-input");

let notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const saveNotes = () => {
  localStorage.setItem("quickNotes", JSON.stringify(notes));
};

const renderNotes = () => {
  noteList.innerHTML = "";
  [...notes]
    .sort((a, b) => b.pinned - a.pinned)
    .forEach((note, index) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
      noteCard.setAttribute("data-index", index);
      noteCard.onclick = () => {
        window.location.href = `note.html?index=${index}`;
      };

      const noteTextDiv = document.createElement("div");
      noteTextDiv.textContent = note.text;
      noteCard.appendChild(noteTextDiv);

      if (note.tags) {
        const tagDiv = document.createElement("div");
        tagDiv.classList.add("note-tags");
        tagDiv.textContent = note.tags;
        noteCard.appendChild(tagDiv);
      }

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-note");
      deleteBtn.textContent = "🗑";
      deleteBtn.onclick = (e) => {
        e.stopPropagation();
        notes.splice(index, 1);
        saveNotes();
        renderNotes();
      };

      const pinBtn = document.createElement("button");
      pinBtn.classList.add("pin-note");
      pinBtn.textContent = note.pinned ? "📌" : "📍";
      pinBtn.onclick = (e) => {
        e.stopPropagation();
        note.pinned = !note.pinned;
        saveNotes();
        renderNotes();
      };

      noteCard.appendChild(pinBtn);
      noteCard.appendChild(deleteBtn);
      noteList.appendChild(noteCard);
    });
};

const addNote = (text, tags) => {
  const newNote = { text, tags, pinned: false };
  notes.unshift(newNote);
  saveNotes();
  renderNotes();
};

const filterNotes = (keyword) => {
  const cards = document.querySelectorAll(".note-card");
  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.style.display = text.includes(keyword.toLowerCase())
      ? "block"
      : "none";
  });
};

submitButton.addEventListener("click", () => {
  const text = noteText.value.trim();
  const tags = noteTags.value.trim();
  if (text !== "") {
    addNote(text, tags);
    noteText.value = "";
    noteTags.value = "";
  }
});

toggleDark.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

searchInput.addEventListener("input", (e) => {
  filterNotes(e.target.value);
});

renderNotes();
