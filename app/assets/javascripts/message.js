$(function(){ 
  function buildHTML(message){
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
});

$(function(){ 
  function buildHTML(message){
    if ( message.image ) {
        //data-idが反映されるようにしている
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
        //同様にdata-idが反映されるようにしている
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
      };
    }

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message__box:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
      if (messages.length !== 0) {
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});