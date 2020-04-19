$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
      var html =
        `<div class="message__box">
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
        `<div class="message__box">
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

  $('#message_content').on('submit', function(e){
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  })
});
