$(document).ready(function () {
	$('.progress .progress-bar').progressbar();

	if ($('#back-to-top').length) {
		var scrollTrigger = 100, // px
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('#back-to-top').addClass('show');
				} else {
					$('#back-to-top').removeClass('show');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('#back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}
});

$(window).load(function () {
	var container = document.querySelector('.masonry-box');
	var msnry = new Masonry( container, {
		itemSelector: '.masonry-item',
		columnWidth: '.masonry-item',                
	});  
});