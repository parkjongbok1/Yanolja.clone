$(function () {
  $("#intro")
    .delay(2800)
    .fadeOut(1000, function () {
      $("body").removeClass("before-load");
    });

  let lastScrollTop;
  let delta = 100;
  let didScroll;

  setInterval(function () {
    if (didScroll) {
      scrollHeaderEvent();
      didScroll = false;
    }
  }, 1000);

  function scrollHeaderEvent() {
    const headerHeight = $(".header").outerHeight();
    const windHeight = $(window).innerHeight();
    const scrollTop = $(window).scrollTop();

    if (Math.abs(lastScrollTop - scrollTop) < delta) {
      return;
    }

    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      $(".header").addClass("sticky");
    } else {
      if (scrollTop < $("body").innerHeight() - windHeight) {
        $(".header").removeClass("sticky");
      }
    }
    lastScrollTop = scrollTop;
  }

  function scrollAniEvent() {
    $(".ani").each(function () {
      const windHeight = $(window).innerHeight();
      const scrollTop = $(window).scrollTop();
      const viewportTop = scrollTop + windHeight;

      const elementOffset = $(this).offset().top;
      const elementOffsetBtm = elementOffset + $(this).outerHeight();

      if (viewportTop > elementOffsetBtm) {
        $(this).addClass("ani-in");
      } else {
        $(this).removeClass("ani-in");
      }
    });
  }

  scrollHeaderEvent();
  scrollAniEvent();

  // Scroll Event
  $(window).on("scroll", function () {
    scrollAniEvent();
    didScroll = true;
  });

  // Click Event
  $(".family-text").on("click", function () {
    $(this).find("i").toggleClass("turn");
    $(this).siblings(".family-list").stop().slideToggle(300);
  });

  $(".top-btn img").on("click", function () {
    $("html, body").stop().animate({ scrollTop: "0" }, 500);
    return false;
  });
});
