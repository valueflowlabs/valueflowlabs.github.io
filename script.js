/* Lets the hero waves flow for a few seconds when the page opens, then rest.
   After that they move only while the pointer is over the hero (plain CSS).
   The page works fully without this file. */
(function () {
  var hero = document.querySelector(".hero");
  if (!hero || !window.matchMedia) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  hero.classList.add("is-flowing");
  setTimeout(function () { hero.classList.remove("is-flowing"); }, 4500);
})();
