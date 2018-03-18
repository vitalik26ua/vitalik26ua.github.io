$(function() {

	// Custom JS

});
$('.slide-one').owlCarousel({
    loop:true,
    margin:10,
    nav: true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:8
        }
    }
})

$(".slide-two").owlCarousel({
		loop:true, //Зацикливаем слайдер
		nav:true, //Отключил навигацию
		autoplay:true, //Автозапуск слайдера
		smartSpeed:2000, //Время движения слайда
		autoplayTimeout:4000, //Время смены слайда
    navigation: true,
		responsive:{ //Адаптация в зависимости от разрешения экрана
			0:{
				items:1
			}
		}
	});


$(".slide-tree").owlCarousel({
		loop:true, //Зацикливаем слайдер
    margin:10,
		autoplay:true, //Автозапуск слайдера
		smartSpeed:5000, //Время движения слайда
		autoplayTimeout:10000, //Время смены слайда
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        }
    }
	});

  $('.animated_video').click(function(){
      $('.video').css('display','block')
  })

  $('.all').click(function(){
      $('.window_pic').css('display','block')
  })

  $('.animated_video_close').click(function(){
      $('.video').css('display','none')
  })

  $(".burger-menu").click(function () {
	   			$(this).toggleClass("menu-on");
          $('.menu_show').toggleClass("menu_hide");
	});

  $(".menu_a").click(function () {
	   			$('.burger-menu').toggleClass("menu-on");
          $('.menu_show').toggleClass("menu_hide");
	});