// --- 1. CONFIG STRATEGY ---
const strategyChat = document.getElementById("strategyChat");
const strategySteps = [
  { title: "AI CONTENT GENERATION", icon: "fa-robot", body: "Custom AI agents trained on your unique brand voice to create aesthetic visuals and high-converting captions." },
  { title: "AUTONOMOUS SCHEDULING", icon: "fa-calendar-check", body: "A fully hands-off content calendar. Posts go live at peak hours for maximum organic reach." },
  { title: "SMART DM & REPLIES", icon: "fa-comments", body: "Instant AI engagement. We handle comments and inquiries 24/7 so you never miss a lead." },
  { title: "CLIENT RETENTION BOTS", icon: "fa-bell", body: "Automated follow-up systems that remind past customers to book again, increasing LTV." }
];

let sIndex = 0;
let strategyStarted = false;

function spawnStrategy() {
  if (sIndex >= strategySteps.length) return;
  const step = strategySteps[sIndex];
  const msg = document.createElement("div");
  msg.className = "strategy-message";
  msg.innerHTML = `<i class="fa-solid ${step.icon}"></i><div><span class="s-title">${step.title}</span><span class="s-body">${step.body}</span></div>`;
  strategyChat.appendChild(msg);
  setTimeout(() => msg.classList.add("animate"), 20);
  sIndex++;
  setTimeout(spawnStrategy, 600);
}

// --- 2. IG TYPING ANIMATION ---
const captionSpan = document.getElementById("typeCaption");
const captionText = "🚀 Automating your brand isn't about being 'robotic'—it's about being consistent. Let AI handle the grind while you handle the growth. ✨";
let typingStarted = false;

function typeCaption() {
  if (!captionSpan) return;
  let i = 0;
  const interval = setInterval(() => {
    captionSpan.textContent += captionText.charAt(i);
    i++;
    if (i >= captionText.length) clearInterval(interval);
  }, 40);
}

// --- 3. CALENDAR SYSTEM ---
function initCalendar() {
  const calGrid = document.getElementById("calGrid");
  if (!calGrid) return;
  calGrid.innerHTML = "";
  for (let i = 1; i <= 28; i++) {
    const day = document.createElement("div");
    day.className = "cal-day";
    day.innerHTML = `<span class="day-num">${i}</span>`;
    if (i % 7 === 1 || i % 7 === 3 || i % 7 === 5 || i % 7 === 0) {
      const post = document.createElement("div");
      post.className = "cal-post";
      post.innerHTML = `<i class="fa-solid fa-clock"></i>`;
      day.appendChild(post);
    }
    calGrid.appendChild(day);
  }
}

let calendarAnimated = false;
function animateCalendar() {
  if (calendarAnimated) return;
  calendarAnimated = true;
  document.querySelectorAll(".cal-post").forEach((p, idx) => {
    setTimeout(() => p.classList.add("active"), idx * 150);
  });
}

// --- 4. GROWTH METRICS (COUNTERS & BARS) ---
let growthAnimated = false;
function animateGrowth() {
  if (growthAnimated) return;
  growthAnimated = true;

  // Counters
  document.querySelectorAll(".metric-number").forEach(num => {
    const target = +num.getAttribute("data-target");
    const speed = target / 40;
    const update = () => {
      const val = +num.innerText;
      if (val < target) {
        num.innerText = Math.ceil(val + speed);
        setTimeout(update, 40);
      } else {
        num.innerText = target;
      }
    };
    update();
  });

  // Progress Bars
  document.querySelectorAll(".progress-fill").forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
}

// --- 5. SCROLL CONTROLLER ---
function handleScroll() {
  const trigger = window.innerHeight - 80;

  // Strategy
  const stratBox = document.getElementById("strategyStage");
  if (!strategyStarted && stratBox && stratBox.getBoundingClientRect().top < trigger) {
    strategyStarted = true;
    spawnStrategy();
  }

  // Instagram
  const ig = document.getElementById("igMockup");
  if (!typingStarted && ig && ig.getBoundingClientRect().top < trigger) {
    typingStarted = true;
    setTimeout(typeCaption, 400);
  }

  // Calendar
  const cal = document.getElementById("calendarSection");
  if (!calendarAnimated && cal && cal.getBoundingClientRect().top < trigger) {
    animateCalendar();
  }

  // Reminder (iPhone)
  const rem = document.getElementById("reminderSection");
  if (rem && rem.getBoundingClientRect().top < trigger) {
    rem.classList.add("active");
  }

  // Growth Section
  const growth = document.getElementById("growthSection");
  if (!growthAnimated && growth && growth.getBoundingClientRect().top < trigger) {
    animateGrowth();
  }

  // Reveal generic
  document.querySelectorAll(".scroll-appear").forEach(el => {
    if (el.getBoundingClientRect().top < trigger) el.classList.add("visible");
  });
}

// --- INITIALIZE ---
document.getElementById("strategyStage").addEventListener("click", () => {
  if (!strategyStarted) { strategyStarted = true; spawnStrategy(); }
});

document.addEventListener("DOMContentLoaded", () => {
  initCalendar();
  handleScroll();
});

window.addEventListener("scroll", handleScroll);