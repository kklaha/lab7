$(document).ready(function() {
    $('.slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        dots: false, 
        infinite: true,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('.slider').on('afterChange', function(event, slick, currentSlide) {
        const totalSlides = slick.slideCount;
        const slidesToShow = slick.options.slidesToShow;
        const totalPages = Math.ceil(totalSlides / slidesToShow);
        const currentPage = Math.floor(currentSlide / slidesToShow) + 1;
        $('#current-page').text(currentPage);
        $('#total-pages').text(totalPages);
    });
    $('.slider').slick('slickGoTo', 0); 
});
