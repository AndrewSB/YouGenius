$(document).ready(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", // update below with document.getElementsByTagName("title")[0].innerHTML
           "https://idontfuckwithu.herokuapp.com/lyrics/" + "stairway", 
           true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);

      jQuery.each(resp, function(index, element) {
        var post = parse_post(element);
        var item = '';
        var class2 = '';

        item += '<div>'
        item += '<span class="tag">' + "tag" + '</span>\
              <a href="' + "url" + '">\
                <div id="' + "id" + '" class="item">\
                  <img src="' + "img" + '" width="107" height="60" />\
                  <h4>' + "title" + '</h4>\
                  <span class="description">' + post + '...</span>\
                </div>\
              </a>';
        item += '</div>';

        $('#watch-header').prepend(item);
      });
    }
  }
  xhr.send();
});
