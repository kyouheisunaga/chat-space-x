$(function(){ 
  function buildHTML(message){
      if ( message.image ) {
      var html =
        `<div class="message__box" data-message-id=${message.id}>
            <div class="message__box__user">
              <div class="message__box__user__name">
                ${message.user_name}
              </div>
              <div class="message__box__user__createday">
                ${message.created_at}
              </div>
            </div>
            <p class="message__box__comment">
              ${message.content}
            </p>
            <img class="message__box__image" src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message__box" data-message-id=${message.id}>
          <div class="message__box__user">
            <div class="message__box__user__name">
              ${message.user_name}
            </div>
            <div class="message__box__user__createday">
              ${message.created_at}
            </div>
          </div>
          <p class="message__box__comment">
            ${message.content}
          </p>
        </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(e) {
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    var last_message_id = $('.message__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function(e) {
      alert('error');
    })
  }
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 5000);
  }
});