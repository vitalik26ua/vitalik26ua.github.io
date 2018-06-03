$(function() {

  $("#twent").twentytwenty();


  $(".qr").click(function () {
    new QRCode(document.getElementById("qrcode"), this.dataset.url);
     $('#qrcode').show();
    return false;
  });

  $(document).click( function(event){
    if( $(event.target).closest("#qrcode").length ) return;
    $("#qrcode").hide();
    event.stopPropagation();
    $("#qrcode").empty()
  });

  $('header').after('<div class="mobile-menu d-lg-none">');
  $('.top-menu').clone().appendTo('.mobile-menu');
  $('.login_bar').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function() {
		$('.mobile-menu').stop().slideToggle();
		$('.burger').toggleClass("burger-on");
	});

});
