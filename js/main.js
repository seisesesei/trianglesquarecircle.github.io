/* provide parent div id and class name
 * call function from html document when needed.
 */
function dragImages(theContainer, theClassName) {
  let listOfImages = document.getElementsByClassName(theClassName);
  let n = 0;
  for (const el of listOfImages) {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let iw = Math.round(window.innerWidth * 0.4);
    iw = iw < 300 ? 300 : iw;

    let nx = Math.round(getRandomFromRange(-1, 1) * 20) * 10;
    let ny = Math.round(getRandomFromRange(-1, 1) * 20) * 10;
    let x = w / 2 - iw / 2 + nx;
    let y = h / 2 - iw / 2 + ny;

    let s = `"${x}px"`;
    el.style.position = "absolute";
    el.style.width = iw + "px";
    el.style.top = y + "px";
    el.style.left = x + "px";
    el.id = "random-image-" + n++;
  }

  let container = document.querySelector("#" + theContainer);
  console.log(theContainer, container);

  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);

  let active = false;
  let origin = {};

  function dragStart(e) {
    if (e.target.classList.value.includes("drag-me")) {
      dragItem = e.target.id;

      if (!(dragItem in origin)) {
        origin[dragItem] = { x: 0, y: 0, cx: 0, cy: 0, ox: 0, oy: 0 };
      }

      let o = origin[dragItem];
      let b = e.type === "touchstart";

      o.x = b ? e.touches[0].clientX - o.ox : e.clientX - o.ox;
      o.y = b ? e.touches[0].clientY - o.oy : e.clientY - o.oy;

      active = true;
    }
  }

  function dragEnd(e) {
    let o = origin[dragItem];
    o.x = o.cx;
    o.y = o.cy;
    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();
      let o = origin[dragItem];
      let b = e.type === "touchmove";

      o.cx = b ? e.touches[0].clientX - o.x : e.clientX - o.x;
      o.cy = b ? e.touches[0].clientY - o.y : e.clientY - o.y;

      o.ox = o.cx;
      o.oy = o.cy;

      document.querySelector("#" + dragItem).style.transform =
        "translate3d(" + o.ox + "px, " + o.oy + "px, 0)";
    }
  }
}
/* Helper function to generate random numbers within a specified range */
function getRandomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}


document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(
      entries,
      observer
    ) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (
              typeof videoSource.tagName === "string" &&
              videoSource.tagName === "SOURCE"
            ) {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});



/*
 * Image Slider using the Splide library
 * https://splidejs.com/options/
 *
 */
function addSplideImageSliderFor(theSelector) {
  document.addEventListener("DOMContentLoaded", function() {
    new Splide("#" + theSelector, {
      type: "loop",
      gap: "0.0rem",
      start: 0,
      accessibility: false,
      perPage: 2,
      pagination: true,
      breakpoints: {
        1024: {
          perPage: 1,
        },
      },
    }).mount();
  });
}


// handle scroll in/out header  
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("menu").style.top = "0";
  } else {
    if(currentScrollPos>0 ) {
      document.getElementById("menu").style.top = "-2.75rem";
    }
  }
  prevScrollpos = currentScrollPos;
}
