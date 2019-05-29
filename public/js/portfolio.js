window.onload = (function () {
  var container = document.querySelector('.masonry-box');
  var msnry = new Masonry( container, {
    itemSelector: '.masonry-item',
    columnWidth: '.masonry-item',
  });
});