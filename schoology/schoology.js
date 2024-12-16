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

  if (/^\d+ unread messages$/.test(ariaLabel)) {
    const spanChild = div.querySelector("span");
    if (spanChild) {
      spanChild.remove();
      foundMessageCount = true;
    }
  }

  if (/^\d+ unread notifications$/.test(ariaLabel)) {
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
