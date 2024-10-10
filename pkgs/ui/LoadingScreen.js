let lib;

export default {
  name: "Loading Screen",
  description:
    "Displays a graphical loader while the bootloader is loading other content",
  ver: 1, // Compatible with core v1
  type: "library",
  init: function (l) {
    lib = l;
  },
  data: {
    loader: function () {
      const x = new lib.html("div")
        .html(
          '<div class="logo">Galaxy<span class="small-label superscript">Alpha</span></div><span>powered by pluto</span>'
        )
        .class("loading-screen")
        .appendTo("body");

      return x;
    },
  },
};