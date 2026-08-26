/* HumanyxAI — demo mock interaction layer
   Simulates: voice preview, agent conversation states, transcript build, dial-out.
   Integration points for the real voice stack are marked // INTEGRATE: */

const VOICES = {
  sarah:  { name: "Sarah",  desc: "Warm · Sydney",        gender: "f", initial: "S" },
  emma:   { name: "Emma",   desc: "Bright · Brisbane",    gender: "f", initial: "E" },
  marcus: { name: "Marcus", desc: "Assured · Melbourne",  gender: "m", initial: "M" },
  james:  { name: "James",  desc: "Easy-going · Perth",   gender: "m", initial: "J" },
};

let currentVoice = "sarah";
let callState = "idle"; // idle | connecting | live
let t0 = null;
let timers = [];

// respect reduced-motion for JS-driven visuals (visualiser stays static)
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const SCRIPT = [
  { who: "agent",  delay: 1200,  text: "Good afternoon, thanks for calling HumanyxAI — this is {name}. How can I help you today?" },
  { who: "caller", delay: 4200,  text: "Hi — I'm calling about getting an AI receptionist for our plumbing business. We keep missing calls while we're on jobs." },
  { who: "agent",  delay: 5200,  text: "You're not alone — trades businesses typically miss around a third of their calls. I can answer every call, book jobs straight into your calendar, and text you a summary. Would you like to hear how that would work for your setup?" },
  { who: "caller", delay: 5600,  text: "Yeah, that sounds good. What happens if someone asks something it can't answer?" },
  { who: "agent",  delay: 5400,  text: "Fair question. If I'm ever unsure, I say so honestly, take a detailed message, and flag it for a human callback within the hour. I'd rather hand off gracefully than guess. Can I book you in for a 15-minute discovery call this week?" },
];

function fmt(ms) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
}

function addTranscriptRow(container, who, text, elapsed) {
  const row = document.createElement("div");
  row.className = "t-row " + who;
  row.innerHTML = `
    <span class="t-time">${fmt(elapsed)}</span>
    <span class="t-who">${who === "agent" ? VOICES[currentVoice].name : "Caller"}</span>
    <span class="t-text">${text}</span>`;
  container.appendChild(row);
  container.scrollTop = container.scrollHeight;
}

function setStatus(dotEl, labelEl, state, label) {
  dotEl.classList.toggle("live", state === "live");
  labelEl.textContent = label;
}

function initDemo(root) {
  const transcript = root.querySelector(".transcript");
  const emptyState = root.querySelector(".t-empty");
  const talkBtn = root.querySelector(".talk-btn");
  const talkLabel = root.querySelector(".talk-label");
  const statusDot = root.querySelector(".status-dot");
  const statusLabel = root.querySelector(".status-label");
  const viz = root.querySelector(".viz");
  const chName = root.querySelector(".ch-name");
  const chAvatar = root.querySelector(".ch-avatar");

  // voice selection
  root.querySelectorAll(".voice-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".vc-play")) return;
      root.querySelectorAll(".voice-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      currentVoice = card.dataset.voice;
      chName.textContent = VOICES[currentVoice].name;
      chAvatar.textContent = VOICES[currentVoice].initial;
      chAvatar.style.background = VOICES[currentVoice].gender === "f"
        ? "linear-gradient(135deg,#2d5bff,#6c8bff)"
        : "linear-gradient(135deg,#17161d,#4b4a55)";
    });
  });

  // voice preview
  root.querySelectorAll(".vc-play").forEach(btn => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".vc-play").forEach(b => b.classList.remove("playing"));
      btn.classList.add("playing");
      // INTEGRATE: play real voice sample (ElevenLabs preview URL per voice)
      setTimeout(() => btn.classList.remove("playing"), 2200);
    });
  });

  // build visualiser bars
  for (let i = 0; i < 7; i++) {
    const bar = document.createElement("span");
    viz.appendChild(bar);
  }

  // talk / end
  talkBtn.addEventListener("click", () => {
    if (callState !== "idle") { endCall(); return; }
    startCall();
  });

  function startCall() {
    callState = "connecting";
    talkBtn.classList.add("live");
    talkLabel.textContent = "Connecting…";
    setStatus(statusDot, statusLabel, "idle", "Connecting");

    timers.push(setTimeout(() => {
      callState = "live";
      t0 = Date.now();
      emptyState && emptyState.remove();
      transcript.querySelectorAll(".t-row").forEach(r => r.remove());
      talkLabel.textContent = "End conversation";
      setStatus(statusDot, statusLabel, "live", "Live — speaking");
      if (!REDUCED_MOTION) viz.classList.add("on");

      // INTEGRATE: open realtime voice session (WebRTC/WebSocket to your agent stack)
      SCRIPT.forEach(line => {
        timers.push(setTimeout(() => {
          if (callState !== "live") return;
          const text = line.text.replace("{name}", VOICES[currentVoice].name);
          addTranscriptRow(transcript, line.who, text, Date.now() - t0);
        }, line.delay));
      });

      timers.push(setTimeout(() => { if (callState === "live") endCall(); }, 6000 + 5600));
    }, 1400));
  }

  function endCall() {
    timers.forEach(clearTimeout);
    timers = [];
    callState = "idle";
    talkBtn.classList.remove("live");
    talkLabel.textContent = "Talk to " + VOICES[currentVoice].name;
    setStatus(statusDot, statusLabel, "idle", "Ready when you are");
    viz.classList.remove("on");
    // INTEGRATE: close realtime session, persist transcript + lead
  }
}

function initDial(root) {
  const form = root.querySelector(".dial-form");
  const success = root.querySelector(".dial-success");
  const numEl = root.querySelector(".ds-num");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input");
    if (!input.value.trim()) return;
    numEl.textContent = input.value.trim();
    form.style.display = "none";
    root.querySelector(".dial-note").style.display = "none";
    success.style.display = "block";
    // INTEGRATE: POST number to outbound-call endpoint (Twilio/Telnyx + 1Convo)
  });
}

document.querySelectorAll("[data-demo]").forEach(initDemo);
document.querySelectorAll("[data-dial]").forEach(initDial);
