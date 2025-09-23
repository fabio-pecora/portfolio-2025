
(function() {
  const docEl = document.documentElement;
  const stored = localStorage.getItem("theme");
  if (stored === "light") docEl.classList.add("light");

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      docEl.classList.toggle("light");
      localStorage.setItem("theme", docEl.classList.contains("light") ? "light" : "dark");
    });
  }

  const navToggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("menu");
  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Hero animated orbs
  const canvas = document.getElementById("orbs");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    const orbs = Array.from({length: 20}).map((_, i) => ({
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
        const grad = ctx.createRadialGradient(o.x, o.y, 2, o.x, o.y, o.r);
        grad.addColorStop(0, `rgba(108,240,166,${o.alpha})`);
        grad.addColorStop(1, "rgba(108,240,166,0)");
        ctx.fillStyle = grad;
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        const grad2 = ctx.createRadialGradient(o.x, o.y, 2, o.x, o.y, o.r * 1.2);
        grad2.addColorStop(0, `rgba(18,127,254,${o.alpha})`);
        grad2.addColorStop(1, "rgba(18,127,254,0)");
        ctx.fillStyle = grad2;
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

  // Typewriter for coding passion
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
          tw.textContent = lines.slice(0, i).join("\n") + (i ? "\n" : "") + line.slice(0, j) + "▌";
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

  // Fake contact form submission
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
