const params = new URLSearchParams(window.location.search);
const index = params.get("index");
const notes = JSON.parse(localStorage.getItem("quickNotes")) || [];

const noteContent = document.getElementById("noteContent");
if (notes[index]) {
  noteContent.innerHTML = notes[index].text;
}

function execCmd(command) {
  document.execCommand(command, false, null);
}

function execCmdWithArg(command, arg) {
  document.execCommand(command, false, arg);
}

window.addEventListener("beforeunload", () => {
  notes[index].text = noteContent.innerHTML;
  localStorage.setItem("quickNotes", JSON.stringify(notes));
});
