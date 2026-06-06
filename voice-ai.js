// ===============================
// 🎤 STABLE VOICE NAVIGATION AI (FINAL FIXED)
// ===============================

let recognition;
let running = false;

// ===============================
window.onload = () => {
  setTimeout(startAI, 800);
};

// ===============================
function startAI() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Please use Google Chrome");
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;

  running = true;

  speak("Voice AI ready");

  setupListeners();
  listen();
}

// ===============================
function setupListeners() {

  recognition.onresult = (event) => {
    const raw = event.results[0][0].transcript;
    const text = clean(raw);

    console.log("VOICE INPUT:", text);

    route(text);
  };

  recognition.onerror = (e) => {
    console.warn("Speech error:", e.error);
    speak("Try again");
  };

  recognition.onend = () => {
    if (running) {
      setTimeout(() => {
        try { recognition.start(); } catch (e) {}
      }, 500);
    }
  };
}

// ===============================
function listen() {
  try {
    recognition.start();
  } catch (e) {}
}

// ===============================
// 🧼 CLEAN INPUT
// ===============================
function clean(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ===============================
// 🧠 ROUTER (FIXED PRIORITY SYSTEM)
// ===============================
function route(text) {

  console.log("COMMAND:", text);

  // =================🔥 HIGHEST PRIORITY (ATTENDANCE ADD FIRST) =================

  if (text.includes("add student attendance")) {
    return go("add-attendance.html");
  }

  if (text.includes("add teacher attendance")) {
    return go("add-teacher-attendance.html");
  }

  if (text.includes("student attendance")) {
    return go("view-attendance.html");
  }

  if (text.includes("teacher attendance")) {
    return go("view-teacher-attendance.html");
  }

  // ================= STUDENTS =================

  if (text.includes("add student") && !text.includes("attendance")) {
    return go("add-student.html");
  }

  if (text.includes("view student") || text.includes("students list")) {
    return go("view-student.html");
  }

  // ================= TEACHERS =================

  if (text.includes("add teacher") && !text.includes("attendance")) {
    return go("add-teacher.html");
  }

  if (text.includes("view teacher") || text.includes("teachers list")) {
    return go("view-teachers.html");
  }

  // ================= HOME =================

  if (text.includes("home") || text.includes("dashboard") || text.includes("index")) {
    return go("index.html");
  }

  // ================= SMART FALLBACK =================

  const pages = [
    { key: "add student attendance", page: "add-attendance.html" },
    { key: "add teacher attendance", page: "add-teacher-attendance.html" },
    { key: "student attendance", page: "view-attendance.html" },
    { key: "teacher attendance", page: "view-teacher-attendance.html" },
    { key: "add student", page: "add-student.html" },
    { key: "add teacher", page: "add-teacher.html" },
    { key: "view student", page: "view-student.html" },
    { key: "view teacher", page: "view-teachers.html" },
    { key: "home", page: "index.html" }
  ];

  for (let i = 0; i < pages.length; i++) {
    if (text.includes(pages[i].key)) {
      return go(pages[i].page);
    }
  }

  speak("Command not recognized");
}

// ===============================
function go(page) {
  running = false;
  speak("Opening page");
  setTimeout(() => {
    window.location.href = page;
  }, 300);
}

// ===============================
function speak(msg) {
  const speech = new SpeechSynthesisUtterance(msg);
  speech.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}