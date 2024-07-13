var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Toggle para ocultar/mostrar texto en las cards
$('.card').click(function() {
  $(this).find('.card-text').toggle();
});

// Animación de salto al pasar el mouse sobre los enlaces del navbar
$("#inicio, #QuienesSomos, #Destacados, #Contacto").hover(function() {
  $(this).css("transform", "translateY(-10px)");
}, function() {
  $(this).css("transform", "translateY(0)");
});

// Agregando sombra al texto del navbar al pasar el mouse
$("#inicio, #QuienesSomos, #Destacados, #Contacto").hover(function() {
  $(this).css('text-shadow', '2px 2px 4px rgba(0, 0, 0, 0.6)');
}, function() {
  $(this).css('text-shadow', 'none');
});

// Cambio de clase del navbar al hacer scroll
$(window).scroll(function() {
  if ($(this).scrollTop() > 400) {
    $("#menuNav").removeClass("navbar");
    $('#menuNav').addClass("bg-interno");
  } else {
    $("#menuNav").removeClass("bg-interno");
    $('#menuNav').addClass("navbar");
  }
});

// Envío de formulario con AJAX
$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var nombre = $('#text_id').val();
    var email = $('#email_id').val();
    var mensaje = $('#exampleFormControlTextarea1').val();

    fetch('/enviar-correo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre: nombre, email: email, mensaje: mensaje })
    })
    .then(response => response.json())
    .then(data => {
      $('#mensajeExito').removeClass('d-none').addClass('show');
      $('#mensajeError').addClass('d-none').removeClass('show');
      $('#text_id').val('');
      $('#email_id').val('');
      $('#exampleFormControlTextarea1').val('');
      setTimeout(() => {
        $('#mensajeExito').removeClass('show').addClass('d-none');
      }, 3000);
    })
    .catch(error => {
      $('#mensajeError').removeClass('d-none').addClass('show');
      $('#mensajeExito').addClass('d-none').removeClass('show');
    });
  });
});