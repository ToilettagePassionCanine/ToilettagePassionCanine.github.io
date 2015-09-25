/* global $, google */
$(document).ready(function () {
  $('.scroll-smooth').click(function (event) {
    event.preventDefault()
    $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 700)
  })

  $('#slider-intro').bxSlider({
    speed: 250,
    nextSelector: '#n-intro',
    prevSelector: '#p-intro',
    nextText: '<i class="fa fa-chevron-right fa-n"></i>',
    prevText: '<i class="fa fa-chevron-left fa-p"></i>',
    auto: true,
    pager: false
  })

  $('#slider-imac').bxSlider({
    speed: 200,
    nextSelector: '#n-imac',
    prevSelector: '#p-imac',
    nextText: '<i class="fa fa-chevron-right fa-n"></i>',
    prevText: '<i class="fa fa-chevron-left fa-p"></i>',
    auto: true,
    pager: false
  })

  $('a.nivoz').nivoLightbox({
    effect: 'slideUp'
  })

  $('a.video').nivoLightbox({
    errorMessage: 'Désolé, cette image est introuvable. Veuillez réessayer plus tard.',
    effect: 'nonexisent'
  })

  $('form#ajax_form .submit').click(function () {
    $('#ajax_form .error').hide()

    var name = $('input#name').val().trim()
    if (!name) {
      $('input#name').focus().before('<div class="error">Veuillez entrer votre nom.</div>')
      return false
    }

    var email_test = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    var email = $('input#email').val().trim().toLowerCase()
    if (!email) {
      $('input#email').focus().before('<div class="error">Veuillez entrer votre adresse courriel.</div>')
      return false
    } else if (!email_test.test(email)) {
      $('input#email').select().before('<div class="error">Votre adresse courriel semble invalide.</div>')
      return false
    }

    var message = $('#message').val().trim()
    if (!message) {
      $('#message').focus().fadeIn('slow').before('<div class="error">Veuillez entrer votre message.</div>')
      return false
    }

    $.ajax({
      type: 'POST',
      url: 'email.php',
      data: $('form#ajax_form').serialize(),
      success: function () {
        $('form#ajax_form').slideUp('fast').before('<div id="success"></div>')
        $('#success').html('<h3>Merci!</h3><p>Nous avons bien reçu votre message et nous vous répondrons dès que possible.</p>').slideDown(9000)
      }
    })

    return false
  })

  var current_data = []

  $('.clear').each(function (i) {
    $(this).removeClass('clear').addClass('clear' + i)
    current_data.push($(this).val())

    $(this).focus(function () {
      if ($(this).val() === current_data[i]) {
        $(this).val('')
      }
    })

    $(this).blur(function () {
      var stored_data = current_data[i]
      if (!$(this).val()) {
        $(this).val(stored_data)
      }
    })
  })
})

function initialize () {
  var position = new google.maps.LatLng(45.2761865, -72.1343152)
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    zoom: 16,
    center: position,
    scrollwheel: false
  })
  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: 'Toilettage Passion Canine'
  })
  var infowindow = new google.maps.InfoWindow({
    content: "<h1>Toilettage Passion Canine</h1><p>Entrez par la clôture blanche et descendez les marches sous l'abri.</p>"
  })

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker)
  })
}

google.maps.event.addDomListener(window, 'load', initialize)
