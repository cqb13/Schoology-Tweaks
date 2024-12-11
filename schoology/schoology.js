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
