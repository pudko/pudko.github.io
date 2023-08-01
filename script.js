function highlightCurrentSection(event) {
  const className = window.location.hash.substring(1);
  var currentElement = document.getElementsByClassName(className);

  [
    "individualnytrening",
    "parkourworkshop",
    "kaskaderskekusky",
    "parkourshow",
    "skupinovytrening",
    "onlinecoaching",
    "relatedvideos",
  ].map((item) => {
    const el = document.getElementsByClassName(item);
    if (el == currentElement) {
      el[0].style.backgroundColor = "#3A3838";
    } else if (el[0] !== undefined) {
      el[0].style.backgroundColor = "transparent";
    }
  });
}

function LoadHandler(event) {
  var section = window.location.href;
  console.log(window.location.href);
  var sectionClean = section.substring(section.indexOf("#"));
  console.log(sectionClean);
  var offset = window.innerWidth > 1024 ? 85 : 148;

  $("html, body").animate(
    {
      scrollTop: $(sectionClean).offset().top - offset,
    },
    500,
    function () {
      window.location.hash = sectionClean;
    }
  );
}

window.addEventListener("hashchange", LoadHandler, false);
window.addEventListener("scroll", highlightCurrentSection, false);
window.addEventListener("load", carousel, false);
window.addEventListener(
  "scroll",
  function () {
    if (window.scrollY === 0) {
      const el = document.getElementsByClassName("individualnytrening");
      const el2 = document.getElementsByClassName("parkourworkshop");
      el2[0].style.backgroundColor = "transparent";
      el[0].style.backgroundColor = "#3A3838";
    }
  },
  false
);

function carousel(event) {
  $(document).ready(function () {
    $(".carousel-test").slick({
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 700,
          settings: {
            arrows: false,
          },
        },
      ],
    });
  });
}

var el = document.querySelector("#nav-icon3");
var nav = document.querySelector("nav");
var main = document.querySelector("body");
el.onclick = function () {
  el.classList.toggle("open");
  nav.classList.toggle("showed");
  main.classList.toggle("noneoverflow");
};

var el2 = document.querySelectorAll(".navsmall");
for (i = 0; i < el2.length; i++) {
  el2[i].onclick = function () {
    el.classList.remove("open");
    nav.classList.remove("showed");
    main.classList.remove("noneoverflow");
  };
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
document.querySelector(
  '#standard-select [value="' + urlParams.get("option") + '"]'
).selected = true;

function ready(fn) {
  if (document.readyState != "loading") {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", fn);
  } else {
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState != "loading") fn();
    });
  }
}
