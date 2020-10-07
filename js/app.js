'use strict';
let keywordArray = [];
var Horns = function (index) {
  this.image_url = index.image_url;
  this.title = index.title;
  this.description = index.description;
  this.horns = index.horns;
  this.keyword = index.keyword;
}
//render all keywords in dom
var renderKeyword = function (value) {
  let $keyWordClone = $('#keyword').clone();
  $keyWordClone.attr('value', value);
  $keyWordClone.text(value);
  $('select').append($keyWordClone);
}
Horns.prototype.render = function () {
  let $hornsClone = $('#photo-template').clone();
  console.log($hornsClone.html());
  $('main').append($hornsClone);
  $hornsClone.find('h2').text(this.title);
  $hornsClone.find('img').attr('src', this.image_url);
  $hornsClone.find('p').text(this.description);
  $hornsClone.attr('id', this.title);
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
        let horns = new Horns(item)
        // console.log(horns);
        tempArray.push(horns.keyword);
        horns.render();
        // horns.renderKeyword();
      })
      tempArray.forEach(index =>{
        if(!keywordArray.includes(index)){
          keywordArray.push(index);
        }
      })
      console.log('KeywordArray',keywordArray);
      keywordArray.forEach(index =>{
        renderKeyword(index);
      })
    })
}
$(() => Horns.readJson())



array.forEach(element => {
  
});