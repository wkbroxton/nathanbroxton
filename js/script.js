document.addEventListener("DOMContentLoaded", () => {
  // --- INITIALIZE ALL SCRIPTS ---
  setupMobileNav();
  setupCursorFollower();
  setupScrollReveal();
  setupReelViewer();
  setupContactRevealOnClick();

  // --- CONDITIONALLY RUN POLAROID SCRIPT ---
  const workspace = document.getElementById("workspace");
  const backdrop = document.getElementById("backdrop");
  if (workspace && backdrop) {
    setupPolaroidWorkspace(workspace, backdrop);
  }
});

/**
 * 1. POLAROID WORKSPACE (Simplified Drag/DblClick Logic)
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
    { id: "hs8", src: "images/NATHAN-111.jpg", caption: "Serious Portrayal" },
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
  let isDragging = false; // Flag to differentiate click/drag
  let startX, startY; // Track starting position for threshold check
  let currentX, currentY; // Track current position during drag

  // --- Helper: Check for overlap ---
  function isOverlapping(rect1, rect2) {
    const buffer = -10;
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
      workspaceRect.width / 2 - 100 + (Math.random() - 0.5) * 50;
    const initialTop =
      workspaceRect.height / 2 - 135 + (Math.random() - 0.5) * 50;
    const startRotate = (Math.random() - 0.5) * 20;

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

  // --- Drag Functions (Simplified) ---
  function dragStart(e) {
    // Prevent starting a drag if the spotlight is already visible
    if (backdrop.classList.contains("visible")) return;

    activePolaroid = e.target.closest(".polaroid");
    if (!activePolaroid) return;

    // Record start position
    if (e.type === "touchstart") {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      // Don't preventDefault yet on touchstart, allow scrolling until drag confirmed
    } else {
      startX = e.clientX;
      startY = e.clientY;
      // e.preventDefault(); // <-- REMOVED THIS
    }

    isDragging = false; // Reset dragging flag

    currentZIndex++;
    activePolaroid.style.zIndex = currentZIndex;
    // Don't add 'dragging' class yet

    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", dragEnd);
    window.addEventListener("touchmove", drag, { passive: false }); // Keep passive false here
    window.addEventListener("touchend", dragEnd);
    window.addEventListener("touchcancel", dragEnd);
  }

  function drag(e) {
    if (!activePolaroid) return;

    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX;
      currentY = e.touches[0].clientY;
    } else {
      currentX = e.clientX;
      currentY = e.clientY;
    }

    // Check threshold *before* preventing default
    const moveThreshold = 5;
    if (
      !isDragging &&
      (Math.abs(currentX - startX) > moveThreshold ||
        Math.abs(currentY - startY) > moveThreshold)
    ) {
      isDragging = true;
      activePolaroid.classList.add("dragging"); // Add class when drag confirmed
      console.log("Drag confirmed"); // Debug
    }

    if (!isDragging) return; // Only proceed if dragging is confirmed

    // NOW prevent default (prevents scrolling etc. *during* drag)
    e.preventDefault();

    // Calculate delta from the *start* position to avoid drift
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    // Calculate new position based on the element's *initial* position at dragStart
    // This requires storing initial position if needed, or using relative movement carefully
    // Let's stick to relative movement from last frame for simplicity, but be aware of potential drift on slow systems
    // Reintroduce lastX/lastY for relative movement calculation
    if (typeof lastX === "undefined" || lastX === null) {
      // Initialize if first drag move
      lastX = startX;
      lastY = startY;
    }
    const relativeDeltaX = currentX - lastX;
    const relativeDeltaY = currentY - lastY;
    lastX = currentX;
    lastY = currentY;

    let newLeft = parseFloat(activePolaroid.style.left) + relativeDeltaX;
    let newTop = parseFloat(activePolaroid.style.top) + relativeDeltaY;

    // --- Boundary Check Logic ---
    const workspaceRect = workspace.getBoundingClientRect();
    const polaroidRect = activePolaroid.getBoundingClientRect(); // Get current rect dimensions
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
    const activeRectNow = activePolaroid.getBoundingClientRect(); // Get updated rect
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
        // Also clamp nudged position
        const otherPolaroidRect = other.getBoundingClientRect(); // Get nudged polaroid size
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
      activePolaroid = null;
    }

    // Reset dragging flag reliably AFTER listeners are removed
    isDragging = false;
    // Reset lastX/lastY used for relative drag calculations
    lastX = null;
    lastY = null;
    console.log("Drag end, isDragging reset:", isDragging); // Debug
  }

  // --- Spotlight Functions (Simplified - No setTimeout) ---
  function showSpotlight(e) {
    console.log("dblclick event fired. isDragging:", isDragging); // Debug

    // If isDragging is true (set during the drag function), ignore the dblclick
    if (isDragging) {
      console.log("isDragging is true, ignoring dblclick."); // Debug
      // Optionally reset isDragging here if dragEnd didn't catch it
      // isDragging = false;
      return;
    }

    const polaroid = e.currentTarget;
    // Also check if backdrop is already visible (means spotlight is active)
    if (
      !polaroid ||
      polaroid.classList.contains("spotlight") ||
      backdrop.classList.contains("visible")
    ) {
      console.log(
        "Spotlight prevent: No polaroid, already spotlighted, or backdrop visible"
      ); // Debug
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
      // Optionally bring to front
      // currentZIndex++;
      // spotlighted.style.zIndex = currentZIndex;
      console.log("Hiding spotlight for polaroid:", spotlighted.id); // Debug
    }
    // Reset isDragging flag just in case
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
  if (elementsToReveal.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
        // else { entry.target.classList.remove("is-visible"); } // Optional re-animate
      });
    },
    { threshold: 0.1 }
  );

  elementsToReveal.forEach((element) => observer.observe(element));
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
