/* Hero glow: a soft light that follows the cursor inside the blue panel.
   Decorative only. Ignores touch input and when the visitor has asked
   their system for reduced motion. The page works fully without this file. */
(function () {
  var hero = document.querySelector(".hero");
  var spot = document.querySelector(".hero-spot");
  if (!hero || !spot || !window.matchMedia) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  var x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, placed = false;

  function step() {
    x += (targetX - x) * 0.14;
    y += (targetY - y) * 0.14;
    spot.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0)";
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5
      ? requestAnimationFrame(step)
      : 0;
  }

  hero.addEventListener("pointermove", function (event) {
    if (event.pointerType === "touch" || reducedMotion.matches) return;
    var box = hero.getBoundingClientRect();
    targetX = event.clientX - box.left;
    targetY = event.clientY - box.top;
    if (!placed) { x = targetX; y = targetY; placed = true; }
    hero.classList.add("is-lit");
    if (!frame) frame = requestAnimationFrame(step);
  }, { passive: true });

  hero.addEventListener("pointerleave", function () {
    hero.classList.remove("is-lit");
    placed = false;
  });
})();
