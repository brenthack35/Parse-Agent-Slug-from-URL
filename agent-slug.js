// Parse Agent Slug from URL
function getParameterByName(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i'),
	results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Give the URL parameter variable a name
var agentSlug = getParameterByName('agent');

// Set the Cookie (agent slug)
if (agentSlug) {
  $.cookie('agent', agentSlug);
}

$(document).ready(function(){

    // Grab the Cookie (agent slug) and set the Medicareful URLs with the slug
    if ($.cookie('agent')) {
      if ($.cookie('agent') != 'medicareful') {
        $('a[href^="https://medicareful.com"], a[href^="http://medicareful.com"], a[href^="https://www.medicareful.com"], a[href^="http://www.medicareful.com"]').each(function(){
          this.href="https://medicareful.com/" + $.cookie("agent");
        });
      }
      updateURL();
    }

    $('.navbar .container').animate({opacity: 1}, 800);

    // Show Content Search on Click
    $('.fa-search').on('click', function() {
      $('.search-modal').modal('show');
    });

    // Scroll to top of search result when paging
    $('.search-modal').on('shown.bs.modal', function() {
      $('.modal-dialog').on('click', '.page-link', function(event) {
        setTimeout(function(){
          $('.modal-dialog').animate({
              scrollTop: 0
          }, 600);
          return false;
        }, 800 );
      });
    });
});

// append Cookie (agent slug) to end of URL
function updateURL() {
  if (history.pushState) {
      var newurl = window.location.origin + window.location.pathname;
      window.history.replaceState({path:newurl},'',newurl);
  }
}
