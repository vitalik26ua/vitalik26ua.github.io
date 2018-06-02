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

});
