document.addEventListener("DOMContentLoaded", () => {
  // --- INITIALIZE ALL SCRIPTS ---
  setupCleanUrls();
  setupMobileNav();
  setupCursorFollower();
  setupReelViewer();
  setupContactRevealOnClick();
  setupSocialPostsGrid(); // Must run BEFORE scroll reveal (adds .reveal-on-scroll cards)
  setupScrollReveal();

  // --- POLAROID WORKSPACE (headshots page only) ---
  const workspace = document.getElementById("workspace");
  const polaroidBackdrop = document.getElementById("backdrop");
  if (workspace && polaroidBackdrop) {
    setupPolaroidWorkspace(workspace, polaroidBackdrop);
  }
});

// --- SOCIAL POSTS DATA ---
// To add a post, copy one of these objects and fill in the fields.
// platform: "tiktok" | "instagram" | "youtube" | "twitch"
const socialPostData = [
  {
    id: "sp1",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/A day in the life.png",
    title: "A Day In The Life: Filming Season 1 of The Thundermans: Undercover",
    caption:
      "Here is what filming season 1 of The Thundermans: Undercover was like last year in Canada. I filmed this BTS almost exactly a year ago. #thundermans @Paramount+ @Nickelodeon #actorslife #teenactor",
    link: "https://www.tiktok.com/@nathanbroxton/video/7577189582765067551",
  },
  {
    id: "sp2",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/Catnip1.png",
    title: "Important Questions",
    caption: "Seriously. What is CatNip?",
    link: "https://www.instagram.com/p/DO4NNpLkis1/",
  },
  {
    id: "sp3",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/End of Summer 2025.png",
    title: "Summer 2025 Recap",
    caption: "Summer 2025 was EPIC!",
    link: "https://www.tiktok.com/@nathanbroxton/video/7545245876428623134",
  },
  {
    id: "sp4",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/Ready.png",
    title: "Ready for the World",
    caption: "If you stay ready...",
    link: "https://www.instagram.com/p/DNphfkSu8-Y/",
  },
];

/**
 * 1. CLEAN URLS
 * Keeps #home, #contact and index.html out of the address bar.
 * - Same-page anchor clicks smooth-scroll without adding a hash.
 * - Arriving from another page (e.g. index.html#contact) scrolls to the
 *   section, then rewrites the URL to the clean path.
 */
function setupCleanUrls() {
  const normalize = (path) => path.replace(/index\.html$/, "");
  const cleanPath = normalize(window.location.pathname);

  // Arriving with a hash: scroll to the section, then clean the URL.
  window.addEventListener("load", () => {
    if (!window.location.hash) return;
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && target.id !== "home") target.scrollIntoView();
    history.replaceState(null, "", cleanPath + window.location.search);
  });

  // Same-page anchor clicks. The scroll-down arrow is excluded because
  // setupContactRevealOnClick() already handles it.
  document
    .querySelectorAll('a[href*="#"]:not(.scroll-down-arrow)')
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        const url = new URL(link.href);
        if (normalize(url.pathname) !== cleanPath) return; // Another page: navigate normally

        e.preventDefault();
        const target = document.getElementById(url.hash.slice(1));
        if (target && target.id !== "home") {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        history.replaceState(null, "", cleanPath);
      });
    });
}

/**
 * 2. MOBILE NAVIGATION
 */
function setupMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("is-active");
    navLinks.classList.toggle("is-active");
  });

  // Close the menu after a link is tapped
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-active");
      navLinks.classList.remove("is-active");
    });
  });
}

/**
 * 3. CURSOR FOLLOWER
 */
function setupCursorFollower() {
  const cursorFollower = document.querySelector(".cursor-follower");
  if (!cursorFollower) return;

  window.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      cursorFollower.style.left = `${e.clientX}px`;
      cursorFollower.style.top = `${e.clientY}px`;
    });
  });
}

/**
 * 4. INTERACTIVE REEL VIEWER (reels page)
 */
function setupReelViewer() {
  const mainPlayer = document.getElementById("main-reel-player");
  const thumbnails = document.querySelectorAll(".reel-thumbnail");
  if (!mainPlayer || thumbnails.length === 0) return;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      mainPlayer.setAttribute("src", thumb.getAttribute("data-src"));
      mainPlayer.setAttribute("title", thumb.getAttribute("data-title"));
      thumbnails.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

/**
 * 5. SCROLL-DOWN ARROW -> CONTACT SECTION (homepage)
 */
function setupContactRevealOnClick() {
  const scrollArrow = document.querySelector(
    ".hero-section .scroll-down-arrow",
  );
  const contactSection = document.getElementById("contact");
  if (!scrollArrow || !contactSection) return;

  scrollArrow.addEventListener("click", (event) => {
    event.preventDefault();

    const scrollToContact = () =>
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

    if (contactSection.classList.contains("initially-hidden")) {
      contactSection.classList.remove("initially-hidden");
      setTimeout(scrollToContact, 100);
    } else {
      scrollToContact();
    }
  });
}

/**
 * 6. APPEAR ON SCROLL
 * Observes every .reveal-on-scroll element, including social post cards,
 * which is why setupSocialPostsGrid() must run first.
 */
function setupScrollReveal() {
  const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");
  if (elementsToReveal.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  elementsToReveal.forEach((element) => observer.observe(element));
}

/**
 * 7. SOCIAL POSTS GRID (media page)
 * Builds the post cards and handles the spotlight popup.
 */
function setupSocialPostsGrid() {
  const container = document.querySelector(".social-grid-container");
  const spotlightBackdrop = document.getElementById("social-post-backdrop");
  const spotlight = document.getElementById("social-post-spotlight");
  if (!container || !spotlightBackdrop || !spotlight) return;

  const spotlightPlatformLogo = spotlight.querySelector(
    ".spotlight-platform-logo",
  );
  const spotlightPostTitle = spotlight.querySelector(".spotlight-post-title");
  const spotlightImage = spotlight.querySelector(".spotlight-image");
  const spotlightCaption = spotlight.querySelector(".spotlight-caption");
  const spotlightLink = spotlight.querySelector(".spotlight-link");

  // Instagram gradient definitions (used by the Instagram icon's fill)
  if (!document.getElementById("svg-gradient-defs")) {
    const defsContainer = document.createElement("div");
    defsContainer.id = "svg-gradient-defs";
    defsContainer.style.height = "0";
    defsContainer.style.width = "0";
    defsContainer.innerHTML = `
      <svg width="0" height="0" style="position:absolute;z-index:-1000">
        <defs>
          <linearGradient id="instagramGradientSmall" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f09433"/>
            <stop offset="25%" style="stop-color:#e6683c"/>
            <stop offset="50%" style="stop-color:#dc2743"/>
            <stop offset="75%" style="stop-color:#cc2366"/>
            <stop offset="100%" style="stop-color:#bc1888"/>
          </linearGradient>
          <linearGradient id="instagramGradientBig" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#f09433"/>
            <stop offset="25%" style="stop-color:#e6683c"/>
            <stop offset="50%" style="stop-color:#dc2743"/>
            <stop offset="75%" style="stop-color:#cc2366"/>
            <stop offset="100%" style="stop-color:#bc1888"/>
          </linearGradient>
        </defs>
      </svg>
    `;
    document.body.insertAdjacentElement("afterbegin", defsContainer);
  }

  const platformIcons = {
    tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.46-2.9-1.6-1.92-2.3-4.44-2.04-6.95.04-1.6.57-3.18 1.4-4.5.95-1.44 2.3-2.5 3.87-3.04.4-.13.8-.24 1.21-.31.08-2.04.01-4.08.01-6.11.02-1.91-.12-3.83.11-5.71.05-.4.1-.8.18-1.19Zm-2.9 8.05c-.44.42-.8 1.03-1.07 1.66-.02.05-.04.1-.07.15-.38 1.04-.6 2.15-.6 3.28.01 1.4.31 2.8.87 4.08.77 1.74 2.45 2.97 4.3 3.01 1.76.04 3.47-.87 4.38-2.42.59-1.03.87-2.22.87-3.44.01-3.46-.02-6.93-.01-10.39-.24-.03-.48-.06-.72-.09-.59-.06-1.18-.16-1.76-.29-1.13-.26-2.18-.7-3.08-1.35-.38-.27-.72-.6-1.03-.97-.04-.05-.07-.1-.11-.15-.08-.1-.17-.19-.25-.29-.09-.11-.18-.23-.27-.34-.1-.12-.2-.24-.29-.37-.08-.1-.17-.2-.25-.3-.08-.1-.16-.2-.24-.3-.08-.1-.16-.2-.24-.3-.07-.09-.14-.18-.21-.28-.07-.08-.13-.17-.2-.26-.18-.23-.36-.47-.53-.71-.05-.07-.11-.14-.16-.21-.05-.07-.1-.14-.16-.21-.05-.06-.11-.13-.16-.2-.05-.07-.1-.14-.15-.21-.13-.19-.26-.39-.38-.59-.06-.1-.12-.2-.18-.29-.01-.02-.02-.03-.03-.05-.06-.1-.12-.2-.17-.3-.02-.04-.04-.07-.05-.11-.07-.11-.13-.23-.19-.34-.02-.03-.04-.06-.05-.09-.07-.12-.13-.25-.19-.37-.01-.02-.02-.04-.03-.06-.01-.02-.02-.03-.03-.05-.02-.04-.04-.08-.06-.12-.01-.02-.02-.03-.03-.05-.06-.12-.11-.25-.16-.38-.01-.01-.02-.03-.02-.04-.06-.13-.11-.26-.16-.4-.01-.03-.02-.05-.03-.08-.05-.12-.1-.24-.15-.37-.02-.05-.04-.1-.06-.15-.05-.12-.09-.25-.13-.38-.02-.05-.03-.11-.05-.16-.04-.13-.08-.26-.12-.39-.02-.06-.04-.12-.05-.19-.04-.13-.08-.26-.11-.4-.01-.02-.02-.04-.03-.07-.04-.13-.07-.26-.1-.4-.01-.04-.02-.07-.03-.11-.03-.13-.06-.26-.09-.39-.01-.04-.02-.08-.03-.12-.03-.13-.05-.26-.08-.39-.01-.04-.01-.08-.02-.12-.02-.13-.04-.26-.06-.39-.01-.04-.01-.08-.01-.13z"></path></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="url(#instagramGradientSmall)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.272.058 2.163.248 2.943.557.78.308 1.457.717 2.126 1.387.67.67 1.08 1.347 1.387 2.126.31.78.498 1.67.557 2.943.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.272-.248 2.163-.557 2.943-.308.78-.717 1.457-1.387 2.126-.67.67-1.347 1.08-2.126 1.387-.78.31-1.67.498-2.943.557-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.272-.058-2.163-.248-2.943-.557-.78-.308-1.457-.717-2.126-1.387-.67-.67-1.08-1.347-1.387-2.126-.31-.78-.498-1.67-.557-2.943-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.272.248-2.163.557-2.943.308-.78.717-1.457 1.387-2.126.67-.67 1.347-1.08 2.126-1.387.78-.31 1.67-.498 2.943.557C8.416 2.175 8.796 2.163 12 2.163Zm0 1.626c-3.115 0-3.485.01-4.717.067-1.168.053-1.89.232-2.47.447-.593.22-1.065.517-1.558.99-.487.477-.784.953-.99 1.558-.216.58-.395 1.302-.447 2.47-.058 1.23-.067 1.6-.067 4.717s.01 3.486.067 4.717c.053 1.168.232 1.89.447 2.47.22.593.517 1.065.99 1.558.477.487.953.784 1.558.99.58.216 1.302.395 2.47.447 1.23.058 1.6.067 4.717.067s3.486-.01 4.717-.067c1.168-.053 1.89-.232 2.47-.447.593-.22 1.065-.517 1.558-.99.487-.477.784-.953.99-1.558.216-.58.395-1.302.447-2.47.058-1.23.067-1.6.067-4.717s-.01-3.486-.067-4.717c-.053-1.168-.232-1.89-.447-2.47-.22-.593-.517-1.065-.99-1.558-.477-.487-.953-.784-1.558-.99-.58-.216-1.302-.395-2.47-.447-1.23-.058-1.6-.067-4.717-.067Zm0 3.818c-1.78 0-3.23 1.45-3.23 3.23s1.45 3.23 3.23 3.23 3.23-1.45 3.23-3.23-1.45-3.23-3.23-3.23Zm0 5.257c-.986 0-1.787-.79-1.787-1.787s.801-1.787 1.787-1.787 1.787.801 1.787 1.787-.801 1.787-1.787 1.787Zm5.98-5.88c-.537 0-.97.433-.97.97s.433.97.97.97.97-.433.97-.97-.433-.97-.97-.97Z"></path></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C11.2,5.16 12.81,5 15,5L15.84,5.06C16.44,5.06 17.13,5.09 17.93,5.16C18.73,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path></svg>`,
    twitch: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0h1.714v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"></path></svg>`,
  };

  // Build the cards
  socialPostData.forEach((post) => {
    const card = document.createElement("div");
    card.classList.add("social-post-card", "reveal-on-scroll");
    card.dataset.id = post.id;
    card.innerHTML = `
      <img src="${post.image}" alt="${post.title}" class="social-post-card-image">
      <div class="social-post-card-content">
        <div class="card-platform-icon ${post.platform}-icon">
          ${platformIcons[post.platform] || ""}
        </div>
        <h3>${post.title}</h3>
        <p>${post.caption}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // Open the spotlight
  container.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".social-post-card");
    if (!clickedCard) return;

    const post = socialPostData.find((p) => p.id === clickedCard.dataset.id);
    if (
      !post ||
      !spotlightPlatformLogo ||
      !spotlightPostTitle ||
      !spotlightImage ||
      !spotlightCaption ||
      !spotlightLink
    ) {
      return;
    }

    spotlightPlatformLogo.src = post.platformLogo;
    spotlightPlatformLogo.alt = `${post.platform} logo`;
    spotlightPostTitle.textContent = post.title;
    spotlightImage.src = post.image;
    spotlightImage.alt = post.title;
    spotlightCaption.textContent = post.caption;
    spotlightLink.href = post.link;

    spotlightBackdrop.classList.add("visible");
    spotlight.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close the spotlight
  function closeSocialSpotlight() {
    spotlightBackdrop.classList.remove("visible");
    spotlight.classList.remove("active");
    document.body.style.overflow = "";
  }

  spotlightBackdrop.addEventListener("click", closeSocialSpotlight);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && spotlight.classList.contains("active")) {
      closeSocialSpotlight();
    }
  });
}

/**
 * 8. POLAROID WORKSPACE (headshots page)
 * Drag to move, double-click to spotlight, click backdrop to close.
 */
function setupPolaroidWorkspace(workspace, backdrop) {
  const polaroidData = [
    { id: "hs1", src: "images/NATHAN-260.jpeg", caption: "Your Next Casting" },
    {
      id: "hs2",
      src: "images/NATHAN BROXTON - Commercial Colorful.JPG",
      caption: "Commercial Smile",
    },
    { id: "hs3", src: "images/NATHAN-289.jpg", caption: "Dramatic Scene" },
    {
      id: "hs4",
      src: "images/NATHAN-253-Edit.jpg",
      caption: "Serious Portrayal",
    },
    {
      id: "hs5",
      src: "images/Nathan-Broxton-2024-6-scaled.jpeg",
      caption: "Character Study",
    },
    {
      id: "hs6",
      src: "images/Nathan-Broxton-Headshot-2024-2-scaled-e1734927051247.jpg",
      caption: "Genuine Smile",
    },
    { id: "hs7", src: "images/NATHAN-107.jpg", caption: "Contemplating" },
    { id: "hs8", src: "images/NATHAN-111.jpg", caption: "Enjoying Life" },
    {
      id: "hs9",
      src: "images/NATHAN-276.jpg",
      caption: "Million Dollar Smile",
    },
    { id: "hs10", src: "images/NATHAN-227.jpg", caption: "Strictly Business" },
  ];

  const allPolaroids = [];
  let activePolaroid = null;
  let currentZIndex = 10;
  let isDragging = false;
  let startX, startY, lastX, lastY;

  const MOVE_THRESHOLD = 5; // px of movement before a press counts as a drag
  const PUSH_STRENGTH = 2;

  function isOverlapping(rect1, rect2) {
    const buffer = -10; // Allow slight overlap before pushing
    return !(
      rect1.right < rect2.left - buffer ||
      rect1.left > rect2.right + buffer ||
      rect1.bottom < rect2.top - buffer ||
      rect1.top > rect2.bottom + buffer
    );
  }

  function getPoint(e) {
    return e.touches
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
  }

  // --- Create the polaroids ---
  const workspaceRect = workspace.getBoundingClientRect();
  polaroidData.forEach((data, index) => {
    const polaroid = document.createElement("figure");
    polaroid.className = "polaroid";
    polaroid.id = data.id;
    polaroid.innerHTML = `
      <img src="${data.src}" alt="${data.caption}">
      <figcaption>${data.caption}</figcaption>
    `;

    const initialLeft =
      workspaceRect.width / 2 - 100 + (Math.random() - 0.5) * 40;
    const initialTop =
      workspaceRect.height / 2 - 135 + (Math.random() - 0.5) * 40;
    const startRotate = (Math.random() - 0.5) * 15;

    polaroid.style.left = `${initialLeft}px`;
    polaroid.style.top = `${initialTop}px`;
    polaroid.style.transform = `rotate(${startRotate}deg)`;
    polaroid.style.zIndex = index + 1;

    workspace.appendChild(polaroid);
    allPolaroids.push(polaroid);

    polaroid.addEventListener("mousedown", dragStart);
    polaroid.addEventListener("touchstart", dragStart, { passive: false });
    polaroid.addEventListener("dblclick", showSpotlight);
  });

  // --- Dragging ---
  function dragStart(e) {
    if (backdrop.classList.contains("visible")) return;

    activePolaroid = e.target.closest(".polaroid");
    if (!activePolaroid) return;

    isDragging = false;
    const { x, y } = getPoint(e);
    startX = lastX = x;
    startY = lastY = y;

    currentZIndex++;
    activePolaroid.style.zIndex = currentZIndex;

    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchmove", drag, { passive: false });
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("touchcancel", dragEnd);
  }

  function drag(e) {
    if (!activePolaroid) return;

    const { x: currentX, y: currentY } = getPoint(e);

    if (
      !isDragging &&
      (Math.abs(currentX - startX) > MOVE_THRESHOLD ||
        Math.abs(currentY - startY) > MOVE_THRESHOLD)
    ) {
      isDragging = true;
      activePolaroid.classList.add("dragging");
    }
    if (!isDragging) return;

    e.preventDefault(); // Stop page scrolling while dragging

    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;
    lastX = currentX;
    lastY = currentY;

    // Move, keeping the polaroid inside the workspace
    const polaroidRect = activePolaroid.getBoundingClientRect();
    const maxLeft = workspace.offsetWidth - polaroidRect.width;
    const maxTop = workspace.offsetHeight - polaroidRect.height;
    const newLeft = Math.max(
      0,
      Math.min(parseFloat(activePolaroid.style.left) + deltaX, maxLeft),
    );
    const newTop = Math.max(
      0,
      Math.min(parseFloat(activePolaroid.style.top) + deltaY, maxTop),
    );
    activePolaroid.style.left = `${newLeft}px`;
    activePolaroid.style.top = `${newTop}px`;

    // Nudge any polaroids we bump into
    const activeRect = activePolaroid.getBoundingClientRect();
    allPolaroids.forEach((other) => {
      if (other === activePolaroid) return;
      const otherRect = other.getBoundingClientRect();

      if (!isOverlapping(activeRect, otherRect)) {
        other.classList.remove("pushed");
        return;
      }

      other.classList.add("pushed");
      const dx =
        otherRect.left +
        otherRect.width / 2 -
        (activeRect.left + activeRect.width / 2);
      const dy =
        otherRect.top +
        otherRect.height / 2 -
        (activeRect.top + activeRect.height / 2);
      const magnitude = Math.sqrt(dx * dx + dy * dy);
      if (magnitude === 0) return;

      const otherMaxLeft = workspace.offsetWidth - otherRect.width;
      const otherMaxTop = workspace.offsetHeight - otherRect.height;
      const nudgeLeft = Math.max(
        0,
        Math.min(
          parseFloat(other.style.left) + (dx / magnitude) * PUSH_STRENGTH,
          otherMaxLeft,
        ),
      );
      const nudgeTop = Math.max(
        0,
        Math.min(
          parseFloat(other.style.top) + (dy / magnitude) * PUSH_STRENGTH,
          otherMaxTop,
        ),
      );
      other.style.left = `${nudgeLeft}px`;
      other.style.top = `${nudgeTop}px`;
    });
  }

  function dragEnd() {
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mouseup", dragEnd);
    window.removeEventListener("touchmove", drag);
    window.removeEventListener("touchend", dragEnd);
    window.removeEventListener("touchcancel", dragEnd);

    if (activePolaroid) {
      activePolaroid.classList.remove("dragging");
      allPolaroids.forEach((other) => other.classList.remove("pushed"));
      activePolaroid = null;
    }

    // Reset after the current event so a drag doesn't trigger the dblclick spotlight
    setTimeout(() => {
      isDragging = false;
    }, 0);
  }

  // --- Spotlight ---
  function showSpotlight(e) {
    if (isDragging) return;

    const polaroid = e.currentTarget;
    if (
      !polaroid ||
      polaroid.classList.contains("spotlight") ||
      backdrop.classList.contains("visible")
    ) {
      return;
    }

    backdrop.classList.add("visible");
    polaroid.classList.add("spotlight");
  }

  function hideSpotlight() {
    backdrop.classList.remove("visible");
    const spotlighted = document.querySelector(".polaroid.spotlight");
    if (spotlighted) spotlighted.classList.remove("spotlight");
    isDragging = false;
  }

  backdrop.addEventListener("click", hideSpotlight);
}
