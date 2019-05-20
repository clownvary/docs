$(document).ready(function () {
  $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > ul > li").mousedown(function () {
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button > .dropdown__button-text").text($(this).find('a').text());
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__menu").toggle();
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button").removeClass("expand").addClass("collapse");
  });
  $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button").click(function () {
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button')> .dropdown__menu").toggle();
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button > [class*='icon-chevron-']").toggleClass('icon-chevron-up icon-chevron-down');
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__menu").is(":hidden") ?
      $(this).removeClass("expand").addClass("collapse") :
      $(this).removeClass("collapse").addClass("expand");
  });
  $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button").blur(function () {
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__menu").hide();
    $(".dropdown:not('.dropdown--lg'):not('.dropdown--gradient'):not('.dropdown--with-search'):not('.more-button') > .dropdown__button").removeClass("expand").addClass("collapse");
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(".dropdown.dropdown--gradient > .dropdown__button").click(function () {
    $(".dropdown.dropdown--gradient > .dropdown__menu").toggle();
    $(".dropdown.dropdown--gradient > .dropdown__button > [class*='icon-chevron-']").toggleClass('icon-chevron-up icon-chevron-down');
    $(".dropdown.dropdown--gradient > .dropdown__menu").is(":hidden") ?
      $(this).removeClass("expand").addClass("collapse") :
      $(this).removeClass("collapse").addClass("expand");
  });

  $(".dropdown.dropdown--gradient > ul > li").mousedown(function () {
    $(".dropdown.dropdown--gradient > .dropdown__button > .dropdown__button-text").text($(this).find('a').text());
    $(".dropdown.dropdown--gradient > .dropdown__menu").toggle();
    $(".dropdown.dropdown--gradient > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(".dropdown.dropdown--gradient > .dropdown__button").removeClass("expand").addClass("collapse");
  });

  $(".dropdown.dropdown--gradient > .dropdown__button").blur(function () {
    $(".dropdown.dropdown--gradient > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(".dropdown.dropdown--gradient > .dropdown__menu").hide();
    $(".dropdown.dropdown--gradient > .dropdown__button").removeClass("expand").addClass("collapse");
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").click(function () {
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").toggle();
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").is(":hidden") ?
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down") :
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    $(".dropdown.dropdown--with-search:not('.more-button') >.dropdown__menu").is(":hidden") ?
      $(this).removeClass("expand").addClass("collapse") :
      $(this).removeClass("collapse").addClass("expand");
  });

  $(".dropdown.dropdown--with-search:not('.more-button') > ul > li").mousedown(function () {
    if ($(this).find('a').text().length > 0) {
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > .dropdown__button-text").text($(this).find('a').text());
    }
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").hasClass("showalways") ? "" : $(".dropdown.dropdown--with-search > .dropdown__menu").hide();
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").toggle();
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").removeClass("expand").addClass("collapse");
  });

  $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").mouseenter(function () {
    $(this).addClass("enterbutton");
  });

  $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").mouseleave(function () {
    $(this).removeClass("enterbutton");
  });

  $(".dropdown.dropdown--with-search:not('.more-button') .input").mouseenter(function () {
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").addClass("showalways");
  });

  $(".dropdown.dropdown.dropdown--with-search:not('.more-button') .input").mouseleave(function () {
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").removeClass("showalways");
  });

  $(".dropdown.dropdown.dropdown--with-search:not('.more-button') .input").blur(function () {
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").hasClass("enterbutton") ? "" : $(".dropdown.dropdown--with-search > .dropdown__menu").hide();
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
    $(".dropdown.dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").removeClass("expand").addClass("collapse");
  });

  $(".dropdown.dropdown--with-search:not('.more-button') .input").keyup(function () {
    var value = $(this).val().toLowerCase();
    $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").children().each(function (index) {
      if (index > 1) {
        $(this).find('a').text().toLowerCase().indexOf(value) > -1 || value.length === 0 ? $(this).show() : $(this).hide();
      }
    });
  });

  $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").blur(function () {
    if ($(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").hasClass("showalways")) {
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").show();
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").removeClass("collapse").addClass("expand");
    } else {
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__menu").hide();
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
      $(".dropdown.dropdown--with-search:not('.more-button') > .dropdown__button").removeClass("expand").addClass("collapse");
    }
  });
});
/////////////////////////////////////////////////////////////////////////////////
$(".dropdown.dropdown--lg > ul > li").mousedown(function () {
  $(".dropdown.dropdown--lg > .dropdown__button > .dropdown__button-text").text($(this).find('a').text());
  $(".dropdown.dropdown--lg >.dropdown__menu").toggle();
  $(".dropdown.dropdown--lg > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
  $(".dropdown.dropdown--lg >.dropdown__button").removeClass("expand").addClass("collapse");
});
$(".dropdown.dropdown--lg >.dropdown__button").click(function () {
  $(".dropdown.dropdown--lg >.dropdown__menu").toggle();
  $(".dropdown.dropdown--lg > .dropdown__button > [class*='icon-chevron-']").toggleClass('icon-chevron-up icon-chevron-down');
  $(".dropdown.dropdown--lg > .dropdown__menu").is(":hidden") ?
    $(this).removeClass("expand").addClass("collapse") :
    $(this).removeClass("collapse").addClass("expand");
});
$(".dropdown.dropdown--lg > .dropdown__button").blur(function () {
  $(".dropdown.dropdown--lg > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
  $(".dropdown.dropdown--lg > .dropdown__menu").hide();
  $(".dropdown.dropdown--lg > .dropdown__button").removeClass("expand").addClass("collapse");
})
///////////////////////////////////////////////////////////////////////////////////

$(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > ul > li").mousedown(function () {
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) >.dropdown__menu").toggle();
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
});
$(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) >.dropdown__button").click(function () {
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) >.dropdown__menu").toggle();
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > .dropdown__button > [class*='icon-chevron-']").toggleClass('icon-chevron-up icon-chevron-down');
});
$(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > .dropdown__button").blur(function () {
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
  $(".dropdown.more-button:not('.dropdown--with-search'):not(.disabled) > .dropdown__menu").hide();
})
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".dropdown.dropdown--with-search.more-button > .dropdown__button").click(function () {
  $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").toggle();
  $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").is(":hidden") ?
    $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down") :
    $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
});

$(".dropdown.dropdown--with-search.more-button > ul > li").mousedown(function () {
  $(".dropdown.dropdown--with-search.more-button > .dropdown__button").hasClass("showalways") ? "" : $(".dropdown.dropdown--with-search > .dropdown__menu").hide();
  $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").toggle();
  $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
});

$(".dropdown.dropdown--with-search.more-button > .dropdown__button").mouseenter(function () {
  $(this).addClass("enterbutton");
});

$(".dropdown.dropdown--with-search.more-button > .dropdown__button").mouseleave(function () {
  $(this).removeClass("enterbutton");
});

$(".dropdown.dropdown--with-search.more-button .input").mouseenter(function () {
  $(".dropdown.dropdown--with-search > .dropdown__menu").addClass("showalways");
});

$(".dropdown.dropdown.dropdown--with-search.more-button .input").mouseleave(function () {
  $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").removeClass("showalways");
});

$(".dropdown.dropdown.dropdown--with-search.more-button .input").blur(function () {
  $(".dropdown.dropdown--with-search.more-button > .dropdown__button").hasClass("enterbutton") ? "" : $(".dropdown.dropdown--with-search > .dropdown__menu").hide();
  $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
});

$(".dropdown.dropdown--with-search.more-button .input").keyup(function () {
  var value = $(this).val().toLowerCase();
  $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").children().each(function (index) {
    if (index > 1) {
      $(this).find('a').text().toLowerCase().indexOf(value) > -1 || value.length === 0 ? $(this).show() : $(this).hide();
    }
  });
});

$(".dropdown.dropdown--with-search.more-button > .dropdown__button").blur(function () {
  if ($(".dropdown.dropdown--with-search.more-button > .dropdown__menu").hasClass("showalways")) {
    $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").show();
    $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-down").addClass("icon-chevron-up");
  } else {
    $(".dropdown.dropdown--with-search.more-button > .dropdown__menu").hide();
    $(".dropdown.dropdown--with-search.more-button > .dropdown__button > [class*='icon-chevron-']").removeClass("icon-chevron-up").addClass("icon-chevron-down");
  }
});
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////upload file/////////////////////////////////////////
$("#file-upload input[type='file']").on("change", function(){
    var filePath=$(this).val();
    if(filePath.length > 0){
      var arr=filePath.split('\\');
      var fileName=arr[arr.length-1];
      $(".file-upload__text").val(fileName);
    } else {
      $(".file-upload__text").val("No file chosen");
    }
})

$(document).on({
    dragleave:function(e){
        e.preventDefault();
    },
    drop:function(e){
        e.preventDefault();
    },
    dragenter:function(e){
        e.preventDefault();
    },
    dragover:function(e){
        e.preventDefault();
    }
});

function cancelSelete(){
  if(window.confirm("you sure remove the selected file?")){
    $("#area  input[type='file']").val("");
    $("#area .file-upload__text").val("No file chosen");
    $("#area .file-error").text("");
    $(".file-preview").html("");
  }
}

function selectImage(e){
    e.preventDefault();
    var fileList;
    if(e.dataTransfer){
      fileList = e.dataTransfer.files
    }else if(e.target){
      fileList = e.target.files;
    }

    if (fileList.length == 0) {
        $("#area .file-upload__text").val("No file chosen")
        $(".file-preview").html("");
    }else if (fileList[0].type.indexOf('image') === -1) {
        $("#area .file-upload__text").val("No file chosen")
        $("#area .file-error").text("Invalid file type");
        $(".file-preview").html("");
    }else{
        var img = window.URL.createObjectURL(fileList[0]);
        var filename = fileList[0].name;
        var filesize = Math.floor((fileList[0].size) / 1024);
        if (filesize > 3000) {
            $("#area .file-error").text("Invalid file size");
            $("#area .file-upload__text").val("No file chosen")
            $(".file-preview").html("");
        }else{
            $("#area .file-upload__text").val(filename);
            $("#area .file-error").text("");
            var str = "<img width='10%' height='20%' src='" + img + "'><span class='icon-delete' onclick='cancelSelete()'/>";
            $(".file-preview").html(str);
        }
    }
}

$("#area input[type='file']").on("change", this.selectImage);
// var box = document.getElementById('area');
document.addEventListener("drop",this.selectImage,false);
