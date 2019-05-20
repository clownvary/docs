$(function() {
  $('.tag-input .badge').on('click', removeTag)
  $('.tag-input .icon-close-thin').on('click', removeTag)

  $('.tag-input').on('click', function(e) {
    var $target = $(e.currentTarget)
    var $tags = $target.find('.badge')
    var totalTagWidthLastRow = 0
    var rowNum = 1
    var addRow = false
    for (var i = 0; i < $tags.length; i++) {
      var tempWidth = totalTagWidthLastRow + $tags[i].clientWidth + 5
      if (tempWidth + 50 > $target.width()) {
        totalTagWidthLastRow = 0
      } else {
        totalTagWidthLastRow = tempWidth
      }
    }
    //TODO: Figure out dynamic vertical sizing
    if ($($target).find('input').length == 0) {
      var $tagInputField = $('<input type="text">')
      //$target.append($tagInputField);
      if (totalTagWidthLastRow + 140 < $target.width()) {
        $target.append($tagInputField)
        //$target.height($target.height() + 30);
      }
      $tagInputField.on('blur keydown', function(e) {
        if (e.type === 'keydown' && e.keyCode !== 13) {
          return
        }

        var content = $(this).val()
        $(this).remove()
        if (content != null && content.length > 0) {
          var items = content.split(',')
          for (var i = 0; i < items.length; i++) {
            var $item = $(
              '<span class="badge" data-original-title title>' +
                items[i] +
                '</span>',
            )
            //TODO:This needs to be removed after I figure out why the appended tags have no spaces
            //like the original ones
            $item.css('margin-right', '3px')

            $target.append($item)
            $item.addClass('badge')
            $item.on('click', removeTag)
          }
        }
      })
      $tagInputField.focus()
    }
  })

  function removeTag(e) {
    var $target = e.currentTarget
    var clickPos = $target.clientWidth - e.offsetX
    if (clickPos > 1 && clickPos < 10) {
      $($target).remove()
    }
    e.preventDefault()
  }
})
