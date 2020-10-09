'use strict';
let templateId = '#photoTemplate';
let objectArray = [];
var Horns = function (index) {
  this.title = index.title;
  this.keyword = index.keyword;
  this.horns = index.horns;
  this.description = index.description;
  this.image_url = index.image_url;
  // objectArray.push(this);
}

Horns.prototype.toHtml = function () {
  let template = $(templateId).html();
  let html = Mustache.render(template, this);
  return html;
}
//render all keywords in dom
var renderKeyword = function (value) {
  let $keyWordClone = $('#keyword').clone();
  $keyWordClone.attr('value', value);
  $keyWordClone.text(value);
  $('select').append($keyWordClone);
}

Horns.readJson = () => {
  var jsonPage = ['page-1', 'page-2'];
  const ajaxsettings = {
    method: 'get',
    dataType: 'json',
  }
  jsonPage.forEach(index => {
    $(`#${index}`).on('click', function () {
      // var index = this.id;
      // console.log(index);
      $('section').hide();
      $('select').empty();
      $('select').append('<option id="keyword" value="val">All Keyword</option>');
      $.ajax(`data/${index}.json`, ajaxsettings)
        .then(data => {
          let keywordArray = [];
          let tempArray = [];
          data.forEach(item => {
            let horns = new Horns(item);
            $('main').append(horns.toHtml());
            tempArray.push(horns.keyword);
            // horns.render();
            // horns.renderKeyword();
          })
          tempArray.forEach(index => {
            if (!keywordArray.includes(index)) {
              keywordArray.push(index);
            }
          })
          tempArray = [];
          console.log(objectArray);
          console.log('KeywordArray', keywordArray);
          keywordArray.forEach(index => {
            renderKeyword(index);
          })
        })
    });
  });
}

Horns.filter = () => {
  $('select').on('change', function () {
    var valueCliked = $(this).val();
    // hiding all the content of the page
    $('section').hide();
    // redering/ showing all the data that have the same Keyword
    $(`section.${valueCliked}`).fadeIn();
    if (valueCliked === 'val') {
      $('section').fadeIn();
    }
  })
}


$(() => { Horns.readJson(); Horns.filter() })
