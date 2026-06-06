// ===============================
// 🎤 STABLE VOICE NAVIGATION AI (FULL FIXED VERSION)
// ===============================

let recognition = null;
let running = false;
let isListening = false;

// ===============================
// START APP
// ===============================
window.onload = () => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(() => {
      setTimeout(startAI, 500);
    })
    .catch((err) => {
      console.error(err);
      alert("Microphone permission is required.");
    });
};

// ===============================
// INITIALIZE AI
// ===============================
function startAI() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Please use Google Chrome.");
    return;
  }

  recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  running = true;

  setupListeners();

  speak("Voice AI ready", () => {
    listen();
  });
}

// ===============================
// SETUP EVENTS
// ===============================
function setupListeners() {
  recognition.onstart = () => {
    isListening = true;
    console.log("🎤 Listening...");
  };

  recognition.onresult = (event) => {
    const raw = event.results[0][0].transcript;
    const text = clean(raw);

    console.log("VOICE INPUT:", text);

    route(text);
  };

  recognition.onerror = (event) => {
    console.warn("Speech Error:", event.error);

    isListening = false;

    if (
      event.error === "not-allowed" ||
      event.error === "service-not-allowed"
    ) {
      alert("Microphone access denied.");
      running = false;
      return;
    }

    if (running) {
      setTimeout(() => {
        listen();
      }, 1000);
    }
  };

  recognition.onend = () => {
    isListening = false;

    console.log("🎤 Recognition Ended");

    if (running) {
      setTimeout(() => {
        listen();
      }, 500);
    }
  };
}

// ===============================
// START LISTENING
// ===============================
function listen() {
  if (!running || isListening) return;

  try {
    recognition.start();
  } catch (err) {
    console.error("Recognition Start Error:", err);
  }
}

// ===============================
// CLEAN INPUT
// ===============================
function clean(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ===============================
// COMMAND ROUTER
// ===============================
function route(text) {
  console.log("COMMAND:", text);

  // ===============================
  // ATTENDANCE
  // ===============================

  if (
    text.includes("add") &&
    text.includes("student") &&
    text.includes("attendance")
  ) {
    return go("add-attendance.html");
  }

  if (
    text.includes("add") &&
    text.includes("teacher") &&
    text.includes("attendance")
  ) {
    return go("add-teacher-attendance.html");
  }

  if (
    text.includes("student") &&
    text.includes("attendance") &&
    !text.includes("add")
  ) {
    return go("view-attendance.html");
  }

  if (
    text.includes("teacher") &&
    text.includes("attendance") &&
    !text.includes("add")
  ) {
    return go("view-teacher-attendance.html");
  }

  // ===============================
  // STUDENTS
  // ===============================

  if (
    text.includes("add") &&
    text.includes("student") &&
    !text.includes("attendance")
  ) {
    return go("add-student.html");
  }

  if (
    text.includes("view student") ||
    text.includes("students list") ||
    text.includes("student list")
  ) {
    return go("view-student.html");
  }

  // ===============================
  // TEACHERS
  // ===============================

  if (
    text.includes("add") &&
    text.includes("teacher") &&
    !text.includes("attendance")
  ) {
    return go("add-teacher.html");
  }

  if (
    text.includes("view teacher") ||
    text.includes("teachers list") ||
    text.includes("teacher list")
  ) {
    return go("view-teachers.html");
  }

  // ===============================
  // HOME
  // ===============================

  if (
    text.includes("home") ||
    text.includes("dashboard") ||
    text.includes("index")
  ) {
    return go("index.html");
  }

  // ===============================
  // UNKNOWN COMMAND
  // ===============================

  speak("Command not recognized", () => {
    listen();
  });
}

// ===============================
// PAGE NAVIGATION
// ===============================
function go(page) {
  running = false;

  if (recognition && isListening) {
    try {
      recognition.stop();
    } catch (err) {
      console.error(err);
    }
  }

  speak("Opening page", () => {
    window.location.href = page;
  });
}

// ===============================
// TEXT TO SPEECH
// ===============================
function speak(message, callback = null) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(message);

  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onend = () => {
    if (typeof callback === "function") {
      callback();
    }
  };

  window.speechSynthesis.speak(utterance);
}
