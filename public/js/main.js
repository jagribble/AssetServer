function submit(){
  //get user data from input fields
  var title = $('#newtitle').val();
  var description = $('#newdescription').val();

  var socket = io.connect("https://cryptic-sea-98015.herokuapp.com/");
  socket.on('connect', function(){
    $.post('/insert', {title: title, description: description}, function(res){
      socket.emit('reminder',{'title': title, 'id': res._id, 'description': description});
      location.reload(true);  //reload the page from server (not cache)
    });
  });
}

function deleteitem(id,title){
  //$.post(url, data, callback)
  var socket = io.connect("https://cryptic-sea-98015.herokuapp.com/");
  socket.on('connect', function(){
    socket.emit('reminderDeleted', {'title':title,'id':'#'+id});

    $.post('/delete', {id: id}, function(){
      location.reload(true);
    });
  });

}

function update(id, done){
  //disable checkboxes
  var checkboxes = $('input[type=checkbox]');
  for (var i=0; i<checkboxes.length; i++){
    checkboxes[i].setAttribute("disabled", "disabled");
  }

  //$.post(url, data, callback)
  $.post('/update', {id: id, done: !done}, function(){
    location.reload(true);
  });
}
