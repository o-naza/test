$(document).ready(function() {
let show_modal = 0;


  $(document).mouseleave(function(){
   if ($('.fancybox-content').length == 0 && show_modal == 0) {
      $.fancybox.open($("#modal-order"));
      $('#order-product').val('lamp-1');
      $('#product-name').text('');

      $('#modal_img').attr('src', 'img/gift_.jpg');
      $('#product-promo').fadeIn(500);
      show_modal = 1;
    }
  });

  $('#order-product').change(function(){
    $('#product-promo').hide();
    let order_id = $("#order-product").val();
    if(order_id == "lamp-1")
      $('#modal_img').attr('src', 'img/products/resized/9.jpg');
    else 
      if(order_id == "lamp-2")
        $('#modal_img').attr('src', 'img/products/resized/13.jpg');
      else 
        if(order_id == "lamp-3")
          $('#modal_img').attr('src', 'img/products/resized/11.jpg');
      else 
        if(order_id == "lamp-5")
          $('#modal_img').attr('src', 'img/products/resized/16.jpg');
        else
          $('#modal_img').attr('src', 'img/products/resized/1.jpg');

        $('#product-name').text($("#order-product :selected").text());
      })

  $('.card__button').click(function(){
    $('#product-promo').hide();
    let product = $(this).data('order');

    $.fancybox.open($("#modal-order"));
    $('#order-product').val(product);
    $('#product-name').text($("#order-product :selected").text());

    let order_id = $("#order-product").val();
    if(order_id == "lamp-1")
      $('#modal_img').attr('src', 'img/products/resized/9.jpg');
    else 
      if(order_id == "lamp-2")
        $('#modal_img').attr('src', 'img/products/resized/13.jpg');
      else 
        if(order_id == "lamp-3")
          $('#modal_img').attr('src', 'img/products/resized/11.jpg');
      else 
        if(order_id == "lamp-5")
          $('#modal_img').attr('src', 'img/products/resized/16.jpg');
        else
          $('#modal_img').attr('src', 'img/products/resized/1.jpg');
      })


  var swiper1 = new Swiper('.swiper-1', {
    navigation: {
      nextEl: '.swiper-button-next-1',
      prevEl: '.swiper-button-prev-1',
    },
    pagination: {
      el: '.swiper-pagination-1',
    },
    lazy: true,
  });



  $('.card-about__head').click(function(){
    $(this).next().find('p').slideToggle(500);
    $(this).find('.plus span:nth-child(2)').toggleClass('open');
  })



  $('a.smoothscroll').on('click', function(event) {

    event.preventDefault();
    var sc = $(this).attr("href"),
    dn = $(sc).offset().top;
    $('html, body').animate({scrollTop: dn}, 1000);
  });


  $('#nav-icon1').click(function(){
   $(this).toggleClass('open');
   $('.mobile_menu').slideToggle(500);
 });
  $('.mobile_menu a').click(function() {
    $('#nav-icon1').toggleClass('open');
    $('.mobile_menu').slideToggle(500);
  })

$('#open_form, .open_form').click( function(event){ // ??o?????? ???????? ??o ???????????? ?? id="go"
		event.preventDefault(); // ????????????a???? ????a????a?????????? ??o???? ??????????????a
		$('#overlay').fadeIn(400, // ????a??a??a ????a????o ??o??a??????a???? ???????????? ??o????o??????
		 	function(){ // ??o?????? ??????o???????????? ?????????????????????? a??????a??????
        $('#modal_form') 
					.css('display', 'block') // ????????a???? ?? ??o??a??????o??o o????a display: none;
					.animate({opacity: 1, top: '50%'}, 200); // ????a????o ????????a?????????? ????o????a????o?????? o????o??????????????o ??o ??????????a???????? ????????
        });
	});
/* ??a???????????? ??o??a??????o??o o????a, ?????? ??????a???? ??o ???? ??a??o?? ??o ?? o????a????o?? ??o?????????? */
	$('#modal_close, #overlay').click( function(){ // ??o?????? ???????? ??o ???????????????? ?????? ??o????o??????
		$('#modal_form')
			.animate({opacity: 0, top: '45%'}, 200,  // ????a????o ???????????? ????o????a????o?????? ??a 0 ?? o????o??????????????o ????????a???? o????o ??????????
				function(){ // ??o?????? a??????a??????
					$(this).css('display', 'none'); // ??????a???? ?????? display: none;
					$('#overlay').fadeOut(400); // ??????????a???? ??o????o??????
				}
       );
   });





  var lastId,
  topMenu = $("#menu"),
  topMenuHeight = topMenu.outerHeight()+50,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
  offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({ 
    scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

$(function(){
  function timer(settings){
    var config = {
      endDate: '2020-05-19 00:00',
      timeZone: 'Europe/Dublin',
      hours: $('.timer-hours'),
      minutes: $('.timer-minutes'),
      seconds: $('.timer-seconds'),
      newSubMessage: 'and should be back online in a few minutes...'
    };
    function prependZero(number){
      return number < 10 ? '0' + number : number;
    }
    $.extend(true, config, settings || {});
    var currentTime = moment();
    var endDate = moment.tz(config.endDate, config.timeZone);
    var diffTime = endDate.valueOf() - currentTime.valueOf();
    var duration = moment.duration(diffTime, 'milliseconds');
    var days = duration.days();
    var interval = 1000;
    var subMessage = $('.sub-message');
    var clock = $('.clock');
    if(diffTime < 0){
      endEvent(subMessage, config.newSubMessage, clock);
      return;
    }
    if(days > 0){
      $('#days').text(prependZero(days));
      $('.days').css('display', 'inline-block');
    }
    var intervalID = setInterval(function(){
      duration = moment.duration(duration - interval, 'milliseconds');
      var hours = duration.hours(),
      minutes = duration.minutes(),
      seconds = duration.seconds();
      days = duration.days();
      if(hours  <= 0 && minutes <= 0 && seconds  <= 0 && days <= 0){
        clearInterval(intervalID);
        endEvent(subMessage, config.newSubMessage, clock);
        window.location.reload();
      }
      if(days === 0){
        $('.days').hide();
      }
      $('#days').text(prependZero(days));
      config.hours.text(prependZero(hours));
      config.minutes.text(prependZero(minutes));
      config.seconds.text(prependZero(seconds));
    }, interval);
  }
  function endEvent($el, newText, hideEl){
    $el.text(newText);
    hideEl.hide();
  }
  timer();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
     lastId = id;
       // Set/remove active class
       menuItems
       .parent().removeClass("active")
       .end().filter("[href='#"+id+"']").parent().addClass("active");
     }                   
   });
});
