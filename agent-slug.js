// Parse User Slug from URL
function getParameterByName(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i'),
	results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Give the URL parameter variable a name
var userSlug = getParameterByName('user');

// Set the Cookie (user slug)
if (userSlug) {
  $.cookie('user', userSlug);
}

$(document).ready(function(){

    // Grab the Cookie (user slug) and set URLs with the slug
    if ($.cookie('user')) {
      if ($.cookie('user') != 'mydomain') {
        $('a[href^="https://mydomain.com"], a[href^="http://mydomain.com"], a[href^="https://www.mydomain.com"], a[href^="http://www.mydomain.com"]').each(function(){
          this.href="https://mydomain.com/" + $.cookie("user");
        });
      }
      updateURL();
    }

// append Cookie (user slug) to end of URL
function updateURL() {
  if (history.pushState) {
      var newurl = window.location.origin + window.location.pathname;
      window.history.replaceState({path:newurl},'',newurl);
  }
}
