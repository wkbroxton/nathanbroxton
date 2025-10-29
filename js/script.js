document.addEventListener("DOMContentLoaded", () => {
  // --- INITIALIZE ALL SCRIPTS ---
  setupMobileNav();
  setupCursorFollower();
  setupReelViewer();
  setupContactRevealOnClick();
  setupSocialPostsGrid(); // <-- Call this BEFORE scroll reveal
  setupScrollReveal(); // <-- Call this AFTER grid is populated

  // --- CONDITIONALLY RUN POLAROID SCRIPT ---
  const workspace = document.getElementById("workspace");
  // Use the specific backdrop ID for polaroids
  const polaroidBackdrop = document.getElementById("backdrop");
  if (workspace && polaroidBackdrop) {
    setupPolaroidWorkspace(workspace, polaroidBackdrop);
  }
});

// --- SOCIAL POSTS DATA ---
const socialPostData = [
  {
    id: "sp1",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/tiktok-post-1.jpg",
    title: "Hilarious audition bloopers!",
    caption:
      "You won't believe what happened in this take! 😂 #acting #bloopers #comedy",
    link: "https://www.tiktok.com/@nathanbroxton/video/123456789",
  },
  {
    id: "sp2",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/instagram-post-1.jpg",
    title: "New Headshots are LIVE!",
    caption:
      "Big thanks to my amazing photographer! Feeling fresh for 2024. ✨ #headshots #actorlife #photoshoot",
    link: "https://www.instagram.com/nathanbroxton/p/ABCDEFG/",
  },
  {
    id: "sp3",
    platform: "youtube",
    platformLogo: "images/youtube-logo.svg",
    image: "images/youtube-post-1.jpg",
    title: "My first YouTube short film is out!",
    caption:
      "Spent months on this project. Hope you enjoy watching it as much as I loved making it! 🎬 #shortfilm #indiefilm #drama",
    link: "https://www.youtube.com/watch?v=XYZABC",
  },
  {
    id: "sp4",
    platform: "twitch",
    platformLogo: "images/twitch-logo.svg",
    image: "images/twitch-post-1.jpg",
    title: "Highlight Reel: Epic Game Win!",
    caption:
      "Last night's stream was wild! Managed to clutch this victory. GG! #gaming #twitchstreamer #epicwin",
    link: "https://www.twitch.tv/data_np/clip/ABCDEF",
  },
  {
    id: "sp5",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/tiktok-post-2.jpg",
    title: "Day in the life of an aspiring actor!",
    caption:
      "From self-tapes to callbacks, it's always an adventure! #dayinthelife #vlog #actorslife",
    link: "https://www.tiktok.com/@nathanbroxton/video/987654321",
  },
  {
    id: "sp6",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/instagram-post-2.jpg",
    title: "Behind the scenes on set!",
    caption:
      "Loving this crew! Can't wait for you all to see this project. 🎥 #filmset #onset #makingmovies",
    link: "https://www.instagram.com/nathanbroxton/p/HIJKLMN/",
  },
  {
    id: "sp7",
    platform: "youtube",
    platformLogo: "images/youtube-logo.svg",
    image: "images/youtube-post-2.jpg",
    title: "Q&A with Nathan Broxton!",
    caption:
      "Answering your most asked questions! What should I do next? #qa #youtuber #actorlife",
    link: "https://www.youtube.com/watch?v=PQRSTU",
  },
  {
    id: "sp8",
    platform: "twitch",
    platformLogo: "images/twitch-logo.svg",
    image: "images/twitch-post-2.jpg",
    title: "Chill stream with some indie games",
    caption:
      "Just relaxing and trying out some new indie titles. Join me next time! #indiegames #cozystream #twitch",
    link: "https://www.twitch.tv/data_np/videos/12345",
  },
  {
    id: "sp9",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/tiktok-post-3.jpg",
    title: "Quick acting tip: Emotion first!",
    caption:
      "Always connect to the emotion before the lines. #actingtips #tutorial #actor",
    link: "https://www.tiktok.com/@nathanbroxton/video/ABCDEF",
  },
  {
    id: "sp10",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/instagram-post-3.jpg",
    title: "Hiking adventure weekend!",
    caption:
      "Much needed break in nature. So refreshing! 🌲 #hiking #nature #weekendvibes",
    link: "https://www.instagram.com/nathanbroxton/p/VWXYZ/",
  },
  {
    id: "sp11",
    platform: "youtube",
    platformLogo: "images/youtube-logo.svg",
    image: "images/youtube-post-3.jpg",
    title: "Voiceover Demo Reel 2024!",
    caption:
      "My updated voiceover demo reel. Let me know what you think! 🎙️ #voiceactor #demoreel #vo",
    link: "https://www.youtube.com/watch?v=12345",
  },
  {
    id: "sp12",
    platform: "twitch",
    platformLogo: "images/twitch-logo.svg",
    image: "images/twitch-post-3.jpg",
    title: "Playing a classic RPG tonight!",
    caption:
      "Throwback stream to one of my favorite games. Pure nostalgia! #retrogaming #rpg #classicgames",
    link: "https://www.twitch.tv/data_np/clip/QWERTY",
  },
  {
    id: "sp13",
    platform: "tiktok",
    platformLogo: "images/tiktok-logo.svg",
    image: "images/tiktok-post-4.jpg",
    title: "POV: You're my scene partner",
    caption:
      "Get ready for some intense scene work! #pov #scene #actingchallenge",
    link: "https://www.tiktok.com/@nathanbroxton/video/7890123",
  },
  {
    id: "sp14",
    platform: "instagram",
    platformLogo: "images/instagram-logo.svg",
    image: "images/instagram-post-4.jpg",
    title: "Coffee and scripts kind of morning.",
    caption:
      "Prepping for a busy week of auditions! ☕️ #coffeelover #script #auditionprep",
    link: "https://www.instagram.com/nathanbroxton/p/ABC123/",
  },
  {
    id: "sp15",
    platform: "youtube",
    platformLogo: "images/youtube-logo.svg",
    image: "images/youtube-post-4.jpg",
    title: "Unboxing my new gaming setup!",
    caption:
      "Finally upgraded! Come see all the new gear. 🎮 #gamingpc #unboxing #tech",
    link: "https://www.youtube.com/watch?v=ZXCVBN",
  },
  {
    id: "sp16",
    platform: "twitch",
    platformLogo: "images/twitch-logo.svg",
    image: "images/twitch-post-4.jpg",
    title: "Charity stream success!",
    caption:
      "Huge thanks to everyone who donated! We raised so much for a great cause. ❤️ #charity #community #makingadifference",
    link: "https://www.twitch.tv/data_np/clip/ASDFGH",
  },
];

/**
 * 1. POLAROID WORKSPACE (Simplified Double-Click Logic)
 */
function setupPolaroidWorkspace(workspace, backdrop) {
  const polaroidData = [
    // ... (Your polaroid data remains the same) ...
    { id: "hs1", src: "images/NATHAN-260.jpeg", caption: "Theatrical Look" },
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
    { id: "hs10", src: "images/NATHAN-227.jpg", caption: "Strickly Business" },
  ];

  let allPolaroids = [];
  let activePolaroid = null;
  let currentZIndex = 10;
  // let hasDragged = false; // We won't use this specific flag anymore
  let isDragging = false; // Track if actual dragging occurred
  let startX, startY, lastX, lastY;

  // --- Helper: Check for overlap ---
  function isOverlapping(rect1, rect2) {
    const buffer = -10; // Allow slight overlap before pushing
    return !(
      rect1.right < rect2.left - buffer ||
      rect1.left > rect2.right + buffer ||
      rect1.bottom < rect2.top - buffer ||
      rect1.top > rect2.bottom + buffer
    );
  }

  // --- Initialize Polaroids ---
  polaroidData.forEach((data, index) => {
    const polaroid = document.createElement("figure");
    polaroid.className = "polaroid";
    polaroid.id = data.id;
    polaroid.innerHTML = `
            <img src="${data.src}" alt="${data.caption}">
            <figcaption>${data.caption}</figcaption>
        `;

    const workspaceRect = workspace.getBoundingClientRect();
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

    // Event Listeners
    polaroid.addEventListener("mousedown", dragStart);
    polaroid.addEventListener("touchstart", dragStart, { passive: false });
    polaroid.addEventListener("dblclick", showSpotlight);
  });

  // --- Drag Functions ---
  function dragStart(e) {
    // Prevent starting drag if spotlight is active or no polaroid clicked
    if (backdrop.classList.contains("visible")) return;

    activePolaroid = e.target.closest(".polaroid");
    if (!activePolaroid) return;

    isDragging = false; // Reset dragging flag

    // Record start coordinates
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      lastX = startX;
      lastY = startY;
      // Don't preventDefault yet on touchstart
    } else {
      startX = e.clientX;
      startY = e.clientY;
      lastX = startX;
      lastY = startY;
      // e.preventDefault(); // REMOVED from here
    }

    currentZIndex++;
    activePolaroid.style.zIndex = currentZIndex;
    // Don't add 'dragging' class yet

    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchmove", drag, { passive: false });
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("touchcancel", dragEnd);
  }

  function drag(e) {
    if (!activePolaroid) return;

    let currentX, currentY;
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    } else {
      currentX = e.clientX;
      currentY = e.clientY;
    }

    // Check threshold *before* preventing default and setting isDragging
    const moveThreshold = 5;
    if (
      !isDragging &&
      (Math.abs(currentX - startX) > moveThreshold ||
        Math.abs(currentY - startY) > moveThreshold)
    ) {
      isDragging = true;
      activePolaroid.classList.add("dragging"); // Add class when drag confirmed
    }

    if (!isDragging) return; // Only proceed if dragging is confirmed

    // NOW prevent default (prevents scrolling etc. *during* drag)
    e.preventDefault();

    // Calculate change from last position for smooth relative movement
    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;
    lastX = currentX; // Update last position for next frame
    lastY = currentY;

    // Calculate new position
    let newLeft = parseFloat(activePolaroid.style.left) + deltaX;
    let newTop = parseFloat(activePolaroid.style.top) + deltaY;

    // --- Boundary Check Logic ---
    const polaroidRect = activePolaroid.getBoundingClientRect();
    const minLeft = 0;
    const maxLeft = workspace.offsetWidth - polaroidRect.width;
    const minTop = 0;
    const maxTop = workspace.offsetHeight - polaroidRect.height;
    newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft));
    newTop = Math.max(minTop, Math.min(newTop, maxTop));
    activePolaroid.style.left = `${newLeft}px`;
    activePolaroid.style.top = `${newTop}px`;
    // --- End Boundary Check ---

    // --- Nudge Logic ---
    const activeRectNow = activePolaroid.getBoundingClientRect();
    allPolaroids.forEach((other) => {
      if (other === activePolaroid) return;
      const otherRect = other.getBoundingClientRect();
      if (isOverlapping(activeRectNow, otherRect)) {
        other.classList.add("pushed");
        const dx =
          otherRect.left +
          otherRect.width / 2 -
          (activeRectNow.left + activeRectNow.width / 2);
        const dy =
          otherRect.top +
          otherRect.height / 2 -
          (activeRectNow.top + activeRectNow.height / 2);
        const pushStrength = 2;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        if (magnitude === 0) return;
        const pushX = (dx / magnitude) * pushStrength;
        const pushY = (dy / magnitude) * pushStrength;
        let nudgeLeft = parseFloat(other.style.left) + pushX;
        let nudgeTop = parseFloat(other.style.top) + pushY;
        const otherPolaroidRect = other.getBoundingClientRect();
        const otherMaxLeft = workspace.offsetWidth - otherPolaroidRect.width;
        const otherMaxTop = workspace.offsetHeight - otherPolaroidRect.height;
        nudgeLeft = Math.max(minLeft, Math.min(nudgeLeft, otherMaxLeft));
        nudgeTop = Math.max(minTop, Math.min(nudgeTop, otherMaxTop));
        other.style.left = `${nudgeLeft}px`;
        other.style.top = `${nudgeTop}px`;
      } else {
        other.classList.remove("pushed");
      }
    });
  }

  function dragEnd() {
    // Remove listeners first
    window.removeEventListener("mousemove", drag);
    window.removeEventListener("mouseup", dragEnd);
    window.removeEventListener("touchmove", drag);
    window.removeEventListener("touchend", dragEnd);
    window.removeEventListener("touchcancel", dragEnd);

    if (activePolaroid) {
      activePolaroid.classList.remove("dragging");
      allPolaroids.forEach((other) => other.classList.remove("pushed"));
      activePolaroid = null; // Clear the active polaroid
    }
    // Crucially, reset isDragging *after* listeners are removed
    // Use a small timeout to ensure this happens AFTER any potential dblclick check
    setTimeout(() => {
      isDragging = false;
      console.log("Drag end timeout: isDragging reset:", isDragging); // Debug
    }, 0); // Minimal timeout
  }

  // --- Spotlight Functions (Simplified Check) ---
  function showSpotlight(e) {
    console.log("dblclick event fired. isDragging:", isDragging); // Debug

    // If isDragging is true (meaning drag() was called and set it), ignore.
    if (isDragging) {
      console.log("isDragging is true, ignoring dblclick."); // Debug
      return;
    }

    const polaroid = e.currentTarget;
    // Also check if backdrop is already visible or element is missing/already spotlighted
    if (
      !polaroid ||
      polaroid.classList.contains("spotlight") ||
      backdrop.classList.contains("visible")
    ) {
      console.log("Spotlight prevent: Conditions not met."); // Debug
      return;
    }

    if (backdrop) {
      backdrop.classList.add("visible");
      polaroid.classList.add("spotlight");
      console.log("Showing spotlight for polaroid:", polaroid.id); // Debug
    } else {
      console.error("Backdrop element not found!"); // Debug
    }
  }

  function hideSpotlight() {
    if (backdrop) backdrop.classList.remove("visible");
    const spotlighted = document.querySelector(".polaroid.spotlight");
    if (spotlighted) {
      spotlighted.classList.remove("spotlight");
      console.log("Hiding spotlight for polaroid:", spotlighted.id); // Debug
    }
    // Reset isDragging flag just in case when closing spotlight explicitly
    isDragging = false;
  }

  // --- Final Event Listener ---
  if (backdrop) {
    backdrop.addEventListener("click", hideSpotlight);
  }
}

/**
 * 2. MOBILE NAVIGATION
 */
function setupMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("is-active");
      navLinks.classList.toggle("is-active");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("is-active")) {
          navToggle.classList.remove("is-active");
          navLinks.classList.remove("is-active");
        }
      });
    });
  } else {
    console.error(
      "Mobile navigation elements (.nav-toggle or .nav-links) not found."
    );
  }
}

/**
 * 3. CURSOR FOLLOWER
 */
function setupCursorFollower() {
  const cursorFollower = document.querySelector(".cursor-follower");
  if (cursorFollower) {
    window.addEventListener("mousemove", (e) => {
      requestAnimationFrame(() => {
        cursorFollower.style.left = `${e.clientX}px`;
        cursorFollower.style.top = `${e.clientY}px`;
      });
    });
  }
}

/**
 * 4. APPEAR ON SCROLL
 */
function setupScrollReveal() {
  const elementsToReveal = document.querySelectorAll(".reveal-on-scroll");
  if (elementsToReveal.length === 0) {
    // console.log("No elements found with .reveal-on-scroll"); // Debug
    return;
  }
  // console.log(`Found ${elementsToReveal.length} elements to reveal.`); // Debug

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // console.log("Element intersecting:", entry.target.id || entry.target.tagName); // Debug
          entry.target.classList.add("is-visible");
          // Optional: Stop observing after reveal
          // observer.unobserve(entry.target);
        }
        // else { entry.target.classList.remove("is-visible"); } // Optional re-animate
      });
    },
    { threshold: 0.1 } // Trigger when 10% is visible
  );

  elementsToReveal.forEach((element) => {
    // console.log("Observing element:", element.id || element.tagName); // Debug
    observer.observe(element);
  });
}

/**
 * 5. INTERACTIVE REEL VIEWER
 */
function setupReelViewer() {
  const mainPlayer = document.getElementById("main-reel-player");
  const thumbnails = document.querySelectorAll(".reel-thumbnail");
  if (!mainPlayer || thumbnails.length === 0) return;

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const videoSrc = thumb.getAttribute("data-src");
      const videoTitle = thumb.getAttribute("data-title");
      mainPlayer.setAttribute("src", videoSrc);
      mainPlayer.setAttribute("title", videoTitle);
      thumbnails.forEach((t) => t.classList.remove("is-active"));
      thumb.classList.add("is-active");
    });
  });
}

/**
 * 6. REVEAL CONTACT SECTION ON ARROW CLICK
 */
function setupContactRevealOnClick() {
  const scrollArrow = document.querySelector(
    ".hero-section .scroll-down-arrow"
  );
  const contactSection = document.getElementById("contact");
  if (!scrollArrow || !contactSection) return;

  scrollArrow.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("Arrow clicked!");

    if (contactSection.classList.contains("initially-hidden")) {
      console.log("Contact hidden, revealing...");
      contactSection.classList.remove("initially-hidden");
      setTimeout(() => {
        console.log("Scrolling to contact...");
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      console.log("Contact visible, scrolling...");
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

/**
 * 7. SOCIAL HUB SWITCHER (For media.html social embeds/links)
 */
function setupSocialSwitcher() {
  const socialNav = document.querySelector(".social-nav"); // Check if it exists first
  if (!socialNav) return; // Exit if not on media page with this element

  const socialButtons = socialNav.querySelectorAll(".social-button");
  const socialFeeds = document.querySelectorAll(".social-feed"); // Assuming these are siblings or nearby

  if (socialButtons.length === 0 || socialFeeds.length === 0) return;

  socialNav.addEventListener("click", (event) => {
    const clickedButton = event.target.closest(".social-button");
    if (!clickedButton) return;

    const platform = clickedButton.dataset.platform;
    const targetFeed = document.getElementById(`feed-${platform}`); // Use specific ID
    if (!targetFeed) return;

    socialButtons.forEach((button) => button.classList.remove("active"));
    socialFeeds.forEach((feed) => feed.classList.remove("active"));

    clickedButton.classList.add("active");
    targetFeed.classList.add("active");

    console.log(`Switched to ${platform}`); // Debug
  });
}

/**
 * 8. SOCIAL POSTS GRID (Dynamically generates cards and handles spotlight)
 */
function setupSocialPostsGrid() {
  const container = document.querySelector(".social-grid-container");
  // Use specific ID for social post backdrop
  const spotlightBackdrop = document.getElementById("social-post-backdrop");
  const spotlight = document.getElementById("social-post-spotlight");

  if (!container || !spotlightBackdrop || !spotlight) {
    // console.log("Social Posts Grid elements not found, skipping setup."); // Debug
    return; // Exit if elements aren't found
  }

  // Get spotlight inner elements only if spotlight exists
  const spotlightPlatformLogo = spotlight.querySelector(
    ".spotlight-platform-logo"
  );
  const spotlightPostTitle = spotlight.querySelector(".spotlight-post-title");
  const spotlightImage = spotlight.querySelector(".spotlight-image");
  const spotlightCaption = spotlight.querySelector(".spotlight-caption");
  const spotlightLink = spotlight.querySelector(".spotlight-link");

  // Inject SVG definitions for Instagram gradients if not already present
  const svgDefs = `
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
  // Check if defs already exist to avoid duplicates
  if (!document.getElementById("svg-gradient-defs")) {
    const defsContainer = document.createElement("div");
    defsContainer.id = "svg-gradient-defs";
    defsContainer.style.height = "0"; // Ensure it doesn't affect layout
    defsContainer.style.width = "0";
    defsContainer.innerHTML = svgDefs;
    document.body.insertAdjacentElement("afterbegin", defsContainer); // Add to beginning of body
  }

  // Function to get platform-specific SVG icon
  function getPlatformSVG(platform) {
    const svgMap = {
      tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.46-2.9-1.6-1.92-2.3-4.44-2.04-6.95.04-1.6.57-3.18 1.4-4.5.95-1.44 2.3-2.5 3.87-3.04.4-.13.8-.24 1.21-.31.08-2.04.01-4.08.01-6.11.02-1.91-.12-3.83.11-5.71.05-.4.1-.8.18-1.19Zm-2.9 8.05c-.44.42-.8 1.03-1.07 1.66-.02.05-.04.1-.07.15-.38 1.04-.6 2.15-.6 3.28.01 1.4.31 2.8.87 4.08.77 1.74 2.45 2.97 4.3 3.01 1.76.04 3.47-.87 4.38-2.42.59-1.03.87-2.22.87-3.44.01-3.46-.02-6.93-.01-10.39-.24-.03-.48-.06-.72-.09-.59-.06-1.18-.16-1.76-.29-1.13-.26-2.18-.7-3.08-1.35-.38-.27-.72-.6-1.03-.97-.04-.05-.07-.1-.11-.15-.08-.1-.17-.19-.25-.29-.09-.11-.18-.23-.27-.34-.1-.12-.2-.24-.29-.37-.08-.1-.17-.2-.25-.3-.08-.1-.16-.2-.24-.3-.08-.1-.16-.2-.24-.3-.07-.09-.14-.18-.21-.28-.07-.08-.13-.17-.2-.26-.18-.23-.36-.47-.53-.71-.05-.07-.11-.14-.16-.21-.05-.07-.1-.14-.16-.21-.05-.06-.11-.13-.16-.2-.05-.07-.1-.14-.15-.21-.13-.19-.26-.39-.38-.59-.06-.1-.12-.2-.18-.29-.01-.02-.02-.03-.03-.05-.06-.1-.12-.2-.17-.3-.02-.04-.04-.07-.05-.11-.07-.11-.13-.23-.19-.34-.02-.03-.04-.06-.05-.09-.07-.12-.13-.25-.19-.37-.01-.02-.02-.04-.03-.06-.01-.02-.02-.03-.03-.05-.02-.04-.04-.08-.06-.12-.01-.02-.02-.03-.03-.05-.06-.12-.11-.25-.16-.38-.01-.01-.02-.03-.02-.04-.06-.13-.11-.26-.16-.4-.01-.03-.02-.05-.03-.08-.05-.12-.1-.24-.15-.37-.02-.05-.04-.1-.06-.15-.05-.12-.09-.25-.13-.38-.02-.05-.03-.11-.05-.16-.04-.13-.08-.26-.12-.39-.02-.06-.04-.12-.05-.19-.04-.13-.08-.26-.11-.4-.01-.02-.02-.04-.03-.07-.04-.13-.07-.26-.1-.4-.01-.04-.02-.07-.03-.11-.03-.13-.06-.26-.09-.39-.01-.04-.02-.08-.03-.12-.03-.13-.05-.26-.08-.39-.01-.04-.01-.08-.02-.12-.02-.13-.04-.26-.06-.39-.01-.04-.01-.08-.01-.13z"></path></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="url(#instagramGradientSmall)"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.272.058 2.163.248 2.943.557.78.308 1.457.717 2.126 1.387.67.67 1.08 1.347 1.387 2.126.31.78.498 1.67.557 2.943.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.272-.248 2.163-.557 2.943-.308.78-.717 1.457-1.387 2.126-.67.67-1.347 1.08-2.126 1.387-.78.31-1.67.498-2.943.557-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.272-.058-2.163-.248-2.943-.557-.78-.308-1.457-.717-2.126-1.387-.67-.67-1.08-1.347-1.387-2.126-.31-.78-.498-1.67-.557-2.943-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.058-1.272.248-2.163.557-2.943.308-.78.717-1.457 1.387-2.126.67-.67 1.347-1.08 2.126-1.387.78-.31 1.67-.498 2.943.557C8.416 2.175 8.796 2.163 12 2.163Zm0 1.626c-3.115 0-3.485.01-4.717.067-1.168.053-1.89.232-2.47.447-.593.22-1.065.517-1.558.99-.487.477-.784.953-.99 1.558-.216.58-.395 1.302-.447 2.47-.058 1.23-.067 1.6-.067 4.717s.01 3.486.067 4.717c.053 1.168.232 1.89.447 2.47.22.593.517 1.065.99 1.558.477.487.953.784 1.558.99.58.216 1.302.395 2.47.447 1.23.058 1.6.067 4.717.067s3.486-.01 4.717-.067c1.168-.053 1.89-.232 2.47-.447.593-.22 1.065-.517 1.558-.99.487-.477.784-.953.99-1.558.216-.58.395-1.302.447-2.47.058-1.23.067-1.6.067-4.717s-.01-3.486-.067-4.717c-.053-1.168-.232-1.89-.447-2.47-.22-.593-.517-1.065-.99-1.558-.477-.487-.953-.784-1.558-.99-.58-.216-1.302-.395-2.47-.447-1.23-.058-1.6-.067-4.717-.067Zm0 3.818c-1.78 0-3.23 1.45-3.23 3.23s1.45 3.23 3.23 3.23 3.23-1.45 3.23-3.23-1.45-3.23-3.23-3.23Zm0 5.257c-.986 0-1.787-.79-1.787-1.787s.801-1.787 1.787-1.787 1.787.801 1.787 1.787-.801 1.787-1.787 1.787Zm5.98-5.88c-.537 0-.97.433-.97.97s.433.97.97.97.97-.433.97-.97-.433-.97-.97-.97Z"></path></svg>`,
      youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C11.2,5.16 12.81,5 15,5L15.84,5.06C16.44,5.06 17.13,5.09 17.93,5.16C18.73,5.22 19.36,5.31 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z"></path></svg>`,
      twitch: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0h1.714v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"></path></svg>`,
    };
    return svgMap[platform] || ""; // Return empty string if platform not found
  }

  // Populate the grid
  socialPostData.forEach((post) => {
    const card = document.createElement("div");
    // Ensure reveal-on-scroll is added IF setupScrollReveal function exists
    card.classList.add("social-post-card");
    if (typeof setupScrollReveal === "function") {
      card.classList.add("reveal-on-scroll");
    }
    card.dataset.id = post.id; // Store ID for spotlight lookup

    card.innerHTML = `
      <img src="${post.image}" alt="${
      post.title
    }" class="social-post-card-image">
      <div class="social-post-card-content">
          <div class="card-platform-icon ${post.platform}-icon">
              ${getPlatformSVG(post.platform)}
          </div>
          <h3>${post.title}</h3>
          <p>${post.caption}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // Re-run scroll reveal setup if elements were added dynamically
  if (typeof setupScrollReveal === "function") {
    // Find newly added elements and observe them
    const newElementsToReveal = container.querySelectorAll(
      ".reveal-on-scroll:not(.is-visible)"
    ); // Only observe new ones not yet visible
    const observer = new IntersectionObserver( // Re-use observer logic from setupScrollReveal
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // Optional: Stop observing after reveal to save resources
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    newElementsToReveal.forEach((element) => observer.observe(element));
  }

  // Handle opening the spotlight
  container.addEventListener("click", (event) => {
    const clickedCard = event.target.closest(".social-post-card");
    if (!clickedCard) return;

    const postId = clickedCard.dataset.id;
    const post = socialPostData.find((p) => p.id === postId);

    // Check if all spotlight elements exist before proceeding
    if (
      post &&
      spotlightPlatformLogo &&
      spotlightPostTitle &&
      spotlightImage &&
      spotlightCaption &&
      spotlightLink
    ) {
      spotlightPlatformLogo.src = post.platformLogo;
      spotlightPlatformLogo.alt = `${post.platform} Logo`;
      spotlightPostTitle.textContent = post.title;
      spotlightImage.src = post.image;
      spotlightImage.alt = post.title;
      spotlightCaption.textContent = post.caption;
      spotlightLink.href = post.link;

      if (spotlightBackdrop) spotlightBackdrop.classList.add("visible"); // Use 'visible' for backdrop
      spotlight.classList.add("active"); // Use 'active' for spotlight container
      document.body.style.overflow = "hidden"; // Prevent scrolling body
    } else {
      console.error(
        "Could not find post data or spotlight elements for ID:",
        postId
      );
    }
  });

  // Handle closing the spotlight
  function closeSocialSpotlight() {
    if (spotlightBackdrop) spotlightBackdrop.classList.remove("visible");
    if (spotlight) spotlight.classList.remove("active");
    document.body.style.overflow = ""; // Restore body scrolling
  }

  if (spotlightBackdrop) {
    spotlightBackdrop.addEventListener("click", closeSocialSpotlight);
  }

  // Optional: Close spotlight with ESC key
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      spotlight &&
      spotlight.classList.contains("active")
    ) {
      closeSocialSpotlight();
    }
  });
}
