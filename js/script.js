$(document).ready(function() {
  function random4Digit(){
    return shuffle( "0123456789".split('') ).join('').substring(0,4);
  }

  function shuffle(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
      return o;
  }

  var number = random4Digit();
  console.log(number);

  var source   = $("#table-template").html();
  var template = Handlebars.compile(source);

  $('#user-input').on('keyup', function(e) {
    if (e.which == 13) {

      var userInput = $(this).val();
      var hasDuplicates= (/([1-9]).*?\1/).test(userInput);
      var fijas = 0;
      var picas = 0;

      if (userInput.length === 4 && !hasDuplicates) {

        $('span').removeClass('error');
        $('input').removeClass('input-error');
        
        for (var i = 0; i < userInput.length; i++) {
          var check = number.indexOf(userInput[i]);
          if (check == i) {
            fijas ++;
          } else if (check != "-1") {
            picas ++;
          }
        }

        var context = {number: userInput, picas: picas, fijas: fijas};
        var html    = template(context);

        if (fijas !== 4) {
          $('tbody').prepend(html)
          $(this).val('');
        } else {
          $('.no-show').show();
          $('.no-show').parent().addClass('center');
          $('#win').addClass('win');
        }

      } else {

        console.log('error')
        $('span').addClass('error');
        $('input').addClass('input-error');

      }

    }
  });

  $('.btn').on('click', function() {
    location.reload();
  });
});