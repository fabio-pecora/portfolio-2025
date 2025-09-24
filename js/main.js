(function () {
  const docEl = document.documentElement;

  // theme restore
  const stored = localStorage.getItem("theme");
  if (stored === "light") docEl.classList.add("light");

  // theme toggle
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      docEl.classList.toggle("light");
      localStorage.setItem(
        "theme",
        docEl.classList.contains("light") ? "light" : "dark"
      );
    });
  }

  // nav menu
  const navToggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");

  function openMenu() {
    if (!menu) return;
    menu.classList.add("open");
    navToggle?.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }

  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const isOpen = menu.classList.contains("open");
      isOpen ? closeMenu() : openMenu();
    });

    // close on link tap
    menu.addEventListener("click", (e) => {
      const t = e.target;
      if (t && t.closest && t.closest("a")) closeMenu();
    });

    // close on outside tap
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !navToggle.contains(e.target)) {
        closeMenu();
      }
    });

    // close on scroll and when resizing to desktop
    window.addEventListener("scroll", closeMenu, { passive: true });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });

    // close with Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  // footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // hero animated orbs
  const canvas = document.getElementById("orbs");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const orbs = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 10 + Math.random() * 40,
      vx: -0.5 + Math.random(),
      vy: -0.5 + Math.random(),
      alpha: 0.2 + Math.random() * 0.5
    }));
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbs) {
        ctx.beginPath();
        const g1 = ctx.createRadialGradient(o.x, o.y, 2, o.x, o.y, o.r);
        g1.addColorStop(0, `rgba(108,240,166,${o.alpha})`);
        g1.addColorStop(1, "rgba(108,240,166,0)");
        ctx.fillStyle = g1;
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        const g2 = ctx.createRadialGradient(o.x, o.y, 2, o.x, o.y, o.r * 1.2);
        g2.addColorStop(0, `rgba(18,127,254,${o.alpha})`);
        g2.addColorStop(1, "rgba(18,127,254,0)");
        ctx.fillStyle = g2;
        ctx.arc(o.x, o.y, o.r * 1.2, 0, Math.PI * 2);
        ctx.fill();

        o.x += o.vx; o.y += o.vy;
        if (o.x < 0 || o.x > w) o.vx *= -1;
        if (o.y < 0 || o.y > h) o.vy *= -1;
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // typewriter
  const tw = document.getElementById("typewriter");
  if (tw) {
    const lines = [
      "$ whoami",
      "I'm Fabio!",
      "$ passion",
      "coding, food, basketball, and music",
      "$ craft",
      "building websites that are elegant, secure, and responsive",
      "$ skills",
      "html css javascript typescript react node.js java spring python R c c++ c# git and more...",
      "$ focus",
      "software engineering and data science"
    ];
    let i = 0, j = 0;
    function tick() {
      if (i < lines.length) {
        const line = lines[i];
        if (j <= line.length) {
          tw.textContent =
            lines.slice(0, i).join("\n") +
            (i ? "\n" : "") +
            line.slice(0, j) +
            "▌";
          j++;
        } else {
          tw.textContent = lines.slice(0, i + 1).join("\n");
          i++; j = 0;
        }
      } else {
        i = 0; j = 0;
      }
      setTimeout(tick, 60);
    }
    tick();
  }

  // fake contact form
  const fake = document.getElementById("fakeSubmit");
  const status = document.getElementById("formStatus");
  if (fake && status) {
    fake.addEventListener("click", () => {
      fake.disabled = true;
      fake.textContent = "Sending...";
      setTimeout(() => {
        status.classList.remove("sr-only");
        status.textContent = "Thanks. Your message has been noted locally.";
        fake.textContent = "Sent";
      }, 600);
    });
  }
})();
