import { sliderOpt } from 'src/app/shared/data';

export const introSlider = {
    ...sliderOpt,
    nav: false,
    loop: false,
}

export const brandSlider = {
    ...sliderOpt,
    nav: false,
    dots: false,
    margin: 30,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1200: {
            items: 6,
            nav: true
        }
    }
}

export const productSlider = {
    ...sliderOpt,
    nav: true,
    dots: false,
    margin: 30,
    loop: false,
    items: 2,
    autoHeight: false,
    responsive: {
        0: {
            items: 2,
            margin: 10
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 4
        }
    }
}

export const blogSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    items: 3,
    margin: 20,
    loop: false,
    autoHeight: true,
    autoplay: false,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        992: {
            items: 3,
            dots: true
        }
    }
}

export const instagramSlider = {
    ...sliderOpt,
    nav: false,
    dots: false,
    items: 2,
    margin: 20,
    loop: false,
    responsive: {
        576: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}