  $(document).ready(function(){
    $('ul.tabs').tabs();
  });

  $(document).ready(function(){
    $('ul.tabs').tabs('select_tab', 'tab_id');

        $('.button-collapse').sideNav({
       menuWidth: 300, // Default is 240
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
   }
   );

  });

$(document).ready(function(){
      $('.slider').slider({full_width: true});
    });

$('#textarea1').val('New Text');
  $('#textarea1').trigger('autoresize')

   $(document).ready(function() {
    $('select').material_select();
  });
     