'use strict';
let templateId = '#photoTemplate';
let keywordArray = [];
let objectArray = [];
var Horns = function (index) {
  this.title = index.title;
  this.keyword = index.keyword;
  this.horns = index.horns;
  this.description = index.description;
  this.image_url = index.image_url;
  objectArray.push(this);
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
  const ajaxsettings = {
    method: 'get',
    dataType: 'json',
  }
  $.ajax('data/page-1.json', ajaxsettings)
    .then(data => {
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
      console.log(objectArray);
      console.log('KeywordArray', keywordArray);
      keywordArray.forEach(index => {
        renderKeyword(index);
      })
    })
}

$('keyword').on("click ",function(){
  Horns.readJson().remove();
})

$(() => Horns.readJson())
