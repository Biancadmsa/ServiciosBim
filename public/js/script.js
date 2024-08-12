$(document).ready(function () {
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var nombre = $('#text_id').val();
    var email = $('#email_id').val();
    var mensaje = $('#exampleFormControlTextarea1').val();

    fetch('https://formspree.io/f/xblrlyjw', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
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


$('.card').click(function() {
  $(this).closest('.card').find('.card-text').toggle();
});
