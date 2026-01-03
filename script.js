// ================= ACTIVE NAVBAR LINK =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    if (scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});


// ================= SKILLS PROGRESS =================
const skillsSection = document.querySelector("#skills");
const progressBars = document.querySelectorAll(".progress");
let animated = false;

window.addEventListener("scroll", () => {
  if (!skillsSection) return;
  const trigger = window.innerHeight * 0.8;
  if (skillsSection.getBoundingClientRect().top < trigger && !animated) {
    progressBars.forEach(bar => {
      bar.style.width = bar.dataset.progress + "%";
    });
    animated = true;
  }
});


// ================= PROJECT IMAGE SLIDER =================
document.querySelectorAll(".project-image-slider").forEach(slider => {
  const track = slider.querySelector(".image-track");
  const images = track.querySelectorAll("img");
  const prevBtn = slider.querySelector(".prev");
  const nextBtn = slider.querySelector(".next");

  let index = 0;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  nextBtn.addEventListener("click", e => {
    e.stopPropagation();
    index = (index + 1) % images.length;
    updateSlide();
  });

  prevBtn.addEventListener("click", e => {
    e.stopPropagation();
    index = (index - 1 + images.length) % images.length;
    updateSlide();
  });

  // Hover arrows (NORMAL MODE ONLY)
  slider.addEventListener("mouseenter", () => {
    slider.classList.add("show-arrows");
  });

  slider.addEventListener("mouseleave", () => {
    slider.classList.remove("show-arrows");
  });

  // Open fullscreen (CLONE)
  track.addEventListener("click", () => openFullscreen(slider, index));
});


// ================= FULLSCREEN (CLONE METHOD) =================
function openFullscreen(originalSlider, startIndex) {
  const overlay = document.createElement("div");
  overlay.className = "fullscreen-overlay";
  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");

  // clone slider
  const clone = originalSlider.cloneNode(true);
  clone.classList.add("fullscreen");
  clone.classList.add("show-arrows");
  overlay.appendChild(clone);

  const track = clone.querySelector(".image-track");
  const images = track.querySelectorAll("img");
  const prevBtn = clone.querySelector(".prev");
  const nextBtn = clone.querySelector(".next");

  let index = startIndex;

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  update();

  nextBtn.onclick = e => {
    e.stopPropagation();
    index = (index + 1) % images.length;
    update();
  };

  prevBtn.onclick = e => {
    e.stopPropagation();
    index = (index - 1 + images.length) % images.length;
    update();
  };

  overlay.addEventListener("click", close);
  document.addEventListener("keydown", esc);

  function esc(e) {
    if (e.key === "Escape") close();
  }

  function close() {
    overlay.remove();
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", esc);
  }
}
