const customLogo = document.querySelector(
  'div[data-sgy-sitenav="custom-header-logo"]',
);

if (customLogo) {
  customLogo.remove();
}

const allDivs = document.querySelectorAll("button[aria-label]");

let foundSearchIcon = false;
let foundMessageCount = false;
let foundNotificationCount = false;

for (const div of allDivs) {
  const ariaLabel = div.getAttribute("aria-label");
  if (ariaLabel == "Search") {
    div.remove();
    foundSearchIcon = true;
  }

  if (/^\d+ unread message$/.test(ariaLabel)) {
    const spanChild = div.querySelector("span");
    if (spanChild) {
      spanChild.remove();
      foundMessageCount = true;
    }
  }

  if (/^\d+ unread notification$/.test(ariaLabel)) {
    const spanChild = div.querySelector("span");
    if (spanChild) {
      spanChild.remove();
      foundNotificationCount = true;
    }
  }

  if (foundSearchIcon && foundMessageCount && foundNotificationCount) {
    break;
  }
}

const feedFooter = document.getElementById("home-feed-container");

if (feedFooter) {
  const link = document.createElement("a");
  link.href = "#header";
  link.className =
    "active sExtlink-processed sEdgeMore-processed st-feed-top-link";
  link.textContent = "Top";
  feedFooter.appendChild(link);
}

const nav = document.querySelector('nav[role="navigation"]');

const newUl = document.createElement("ul");
newUl.className = "_2trRU _2K08O fSqCh _1tpub countdown";

const timerHTML = `
  <li class="countdown-item">
    <span id="days">00</span>
    <span class="label">Days</span>
  </li>
  <li class="countdown-item">
    <span id="hours">00</span>
    <span class="label">Hours</span>
  </li>
  <li class="countdown-item">
    <span id="minutes">00</span>
    <span class="label">Minutes</span>
  </li>
  <li class="countdown-item">
    <span id="seconds">00</span>
    <span class="label">Seconds</span>
  </li>
`;

newUl.innerHTML = timerHTML;

const uls = nav.querySelectorAll("ul");

uls[0].insertAdjacentElement("afterend", newUl);

const targetDate = "2025-06-08 04:00:00+00:00";

async function startCountdown(endDate, daysID, hoursID, minutesID, secondsID) {
  async function updateCountdown() {
    const currentDate = new Date();
    const timeDifference = new Date(endDate) - currentDate;
    if (timeDifference <= 0) {
      document.getElementById(daysID).textContent = "00";
      document.getElementById(hoursID).textContent = "00";
      document.getElementById(minutesID).textContent = "00";
      document.getElementById(secondsID).textContent = "00";
      clearInterval(countdownInterval);
      return;
    }
    const daysRemaining = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutesRemaining = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
    );
    const secondsRemaining = Math.floor((timeDifference % (1000 * 60)) / 1000);
    document.getElementById(daysID).textContent = daysRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(hoursID).textContent = hoursRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(minutesID).textContent = minutesRemaining
      .toString()
      .padStart(2, "0");
    document.getElementById(secondsID).textContent = secondsRemaining
      .toString()
      .padStart(2, "0");
  }
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);
}

startCountdown(targetDate, "days", "hours", "minutes", "seconds");
