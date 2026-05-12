document.addEventListener("DOMContentLoaded", () => {
  const marquees = document.querySelectorAll(".marquee");
  marquees.forEach((marquee) => {
    const originalHTML = marquee.innerHTML;
    marquee.innerHTML = originalHTML + originalHTML;
  });

  const container = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".slider-arrow.prev");
  const nextBtn = document.querySelector(".slider-arrow.next");
  const counter = document.querySelector(".slide-counter");

  let currentPage = 0;
  const MAX_VISIBLE = 3;
  const MIN_SLIDE_WIDTH = 320;

  function getVisibleCount() {
    const width = container.offsetWidth;
    const calc = Math.floor(width / MIN_SLIDE_WIDTH);
    return Math.max(1, Math.min(MAX_VISIBLE, calc));
  }

  function getTotalPages(visible) {
    return Math.max(1, Math.ceil(slides.length / visible));
  }

  function updateSlider() {
    const visible = getVisibleCount();
    container.style.setProperty("--items-per-view", visible);

    const gap = parseFloat(getComputedStyle(container).gap) || 0;
    const slideWidth = slides[0]?.offsetWidth || 0;

    const offset = currentPage * visible * (slideWidth + gap);
    container.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage >= getTotalPages(visible) - 1;
    counter.textContent = `${(currentPage + 1) * visible} / ${getTotalPages(visible) * visible}`;
  }

  function navigatePage(direction) {
    const visible = getVisibleCount();
    const newPage = currentPage + direction;
    if (newPage < 0 || newPage >= getTotalPages(visible)) return;
    currentPage = newPage;
    updateSlider();
  }

  prevBtn.addEventListener("click", () => navigatePage(-1));
  nextBtn.addEventListener("click", () => navigatePage(1));

  const resizeObserver = new ResizeObserver(() => {
    const visible = getVisibleCount();
    if (currentPage >= getTotalPages(visible)) {
      currentPage = getTotalPages(visible) - 1;
    }
    updateSlider();
  });
  resizeObserver.observe(container);

  updateSlider();

  const gridSlider = document.querySelector(".grid-slider");
  const gridLayout = document.querySelector(".grid-layout");
  const gridPages = document.querySelectorAll(".grid-page");
  const gridPrevBtn = document.querySelector(
    ".grid-slider-controls .slider-arrow.prev",
  );
  const gridNextBtn = document.querySelector(
    ".grid-slider-controls .slider-arrow.next",
  );
  const gridDots = document.querySelector(".grid-dots");
  let gridIndex = 0;

  function updateGrid() {
    if (!gridSlider || !gridLayout || !gridPages.length) return;

    const pageWidth = gridSlider.clientWidth;
    gridLayout.style.transform = `translateX(-${gridIndex * pageWidth}px)`;

    if (gridPrevBtn) gridPrevBtn.disabled = gridIndex === 0;
    if (gridNextBtn) gridNextBtn.disabled = gridIndex === gridPages.length - 1;

    gridDots?.querySelectorAll(".grid-dot").forEach((dot, idx) => {
      dot.classList.toggle("active", idx === gridIndex);
    });
  }

  function renderGridDots() {
    if (!gridDots || !gridPages.length) return;
    gridDots.innerHTML = "";
    gridPages.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "grid-dot";
      dot.setAttribute("aria-label", `Пункт ${idx + 1}`);
      if (idx === gridIndex) dot.classList.add("active");
      dot.addEventListener("click", () => {
        gridIndex = idx;
        updateGrid();
      });
      gridDots.append(dot);
    });
  }

  function refreshGridOnResize() {
    if (!gridSlider || !gridLayout) return;
    if (window.innerWidth <= 768) {
      updateGrid();
    } else {
      gridLayout.style.transform = "";
    }
  }

  if (gridSlider && gridLayout && gridPages.length) {
    renderGridDots();
    if (gridPrevBtn)
      gridPrevBtn.addEventListener("click", () => {
        if (gridIndex > 0) {
          gridIndex -= 1;
          updateGrid();
        }
      });
    if (gridNextBtn)
      gridNextBtn.addEventListener("click", () => {
        if (gridIndex < gridPages.length - 1) {
          gridIndex += 1;
          updateGrid();
        }
      });
    window.addEventListener("resize", refreshGridOnResize);
    refreshGridOnResize();
  }
});
