function fetch_feed() {
  chrome.extension.sendRequest({'action' : 'fetch_feed', 'url' : 'http://idontfuckwithu.herokuapp.com/lyrics/stairway'}, 
    function(response) {
      display_stories(response);
    }
  );
}

function display_stories(feed_data) {
  $('#popup').html('<img src="images/icon.png" id="icon" /><br clear="all" />');
  $('#logo')[0].addEventListener('click', function() {
    open_item('http://genius.com/')
    window.close() } )

  var json = JSON.parse(jsonString);

  jQuery.each(json, function(index, element) {
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

    $('#popup').append(item);
  });
}

$(document).ready(function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://idontfuckwithu.herokuapp.com/lyrics/stairway", true);
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

        $('#popup').append(item);
      });
    }
  }
  xhr.send();

  //fetch_feed();
});
