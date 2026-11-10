/* Hero waves. The page works fully without this file.
   1. Lets the waves flow for a few seconds when the page opens, then rest.
      After that they move only while the pointer is over the hero (plain CSS).
   2. Moves the "lens" that brightens the wave lines near the pointer.
   Both are skipped when the visitor has asked for reduced motion. */
(function () {
  var hero = document.querySelector(".hero");
  if (!hero || !window.matchMedia) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  hero.classList.add("is-flowing");
  setTimeout(function () { hero.classList.remove("is-flowing"); }, 4500);

  var lens = hero.querySelector(".lens");
  var inner = hero.querySelector(".lens-inner");
  if (!lens || !inner) return;

  var x = 0, y = 0, targetX = 0, targetY = 0, frame = 0, placed = false, radius = 0;

  function measure() {
    var box = hero.getBoundingClientRect();
    inner.style.width = box.width + "px";
    inner.style.height = box.height + "px";
    radius = lens.offsetWidth / 2;
    return box;
  }

  function step() {
    x += (targetX - x) * 0.2;
    y += (targetY - y) * 0.2;
    var dx = (x - radius).toFixed(1), dy = (y - radius).toFixed(1);
    lens.style.transform = "translate3d(" + dx + "px," + dy + "px,0)";
    inner.style.transform = "translate3d(" + -dx + "px," + -dy + "px,0)";
    frame = Math.abs(targetX - x) + Math.abs(targetY - y) > 0.5
      ? requestAnimationFrame(step)
      : 0;
  }

  hero.addEventListener("pointermove", function (event) {
    if (event.pointerType === "touch") return;
    var box = hero.getBoundingClientRect();
    if (!placed) measure();
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
