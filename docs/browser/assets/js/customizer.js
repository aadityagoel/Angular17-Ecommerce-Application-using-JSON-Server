 // prettyPhoto
  $("a[rel^='prettyPhoto[gallery1]']").prettyPhoto(); 
  $("a[rel^='prettyPhoto[iframes]']").prettyPhoto(); 
  $("a[rel^='prettyPhoto']").prettyPhoto(); 

 
  $(document).ready(function() {
    $(window).on('scroll', handleScroll);
  
  });
      
  function handleScroll() {
    if ($(window).scrollTop() > 50) { // Adjust this value as needed
        $('nav').addClass('on-scroll');
    } else {
        $('nav').removeClass('on-scroll');
    }
  }