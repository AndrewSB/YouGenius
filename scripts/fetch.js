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

var connectAndPrint = function(title) {
  console.log("connecting and printing.");

  title = title.split(" - YouTube")[0];
  console.log("title: " + title);
  $('#title')[0].innerHTML = title;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://idontfuckwithu.herokuapp.com/lyrics/" + title, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      // JSON.parse does not evaluate the attacker's scripts.
      var resp = JSON.parse(xhr.responseText);

      jQuery.each(resp, function(index, element) {
        var post = parse_post(element);
        var item = '';
        var class2 = '';

        item += '<div>'
        item += '<span class="tag">00:12:' + (index + Math.random()) + '</span>\
                 <div id="' + "id" + '" class="item">\
                  <span class="description">' + post + '...</span>\
                 </div>';
        item += '</div>';

        $('#lyrics').append(item);
      });
    }
  }
  xhr.send();
}

$(document).ready(function() {
  console.log("ready");
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tab){
    var title = tab[0].title;
    connectAndPrint(title);
   }
  );

  var formbutton = document.getElementById('title_button');
  formbutton.onclick = function() {
    console.log("refetch called");
    document.getElementById('lyrics').innerHTML = '';
    connectAndPrint(document.getElementById('title_textarea').value);
  }
});