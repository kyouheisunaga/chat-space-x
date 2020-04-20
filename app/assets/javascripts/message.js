$(function(){ 
  function buildHTML(message){
    console.log(`html ${JSON.stringify(message)}`)
    if ( message.image.url !== null ) {
      var html =
        `<div class="message">
          <div class="message__box">
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
          </div>
        </div>`
      return html;
    } else {
      var html =
       `<div class="message">
          <div class="message__box">
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
          </div>
        </div>`
      return html;
    }
  }

  $('#new_message').on('submit', function(e){
    console.log("hidouki")
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
      console.log("done")
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.submit-btn').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(e) {
      console.log(e)
      alert("メッセージ送信に失敗しました");
    })
  })
});