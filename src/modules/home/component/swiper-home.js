import { Component } from "react";
import ReactSwiper from "reactjs-swiper";

export default class HomeSwiper extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const options = {
            preloadImages: true,
            autoplay: 1000,
            autoplayDisableOnInteraction: false
        };

        const items = [{
            image: '../img/1.jpg',
            title: '图片1',
            link: 'http://jd.com'
          }, {
            image: '../img/2.jpg',
            title: '图片2',
          }, {
            image: '../img/3.jpg',
            title: '图片3',
            link: 'http://jd.com'
          }, {
            image: '../img/goods1.png',
            title: '图片4',
          }];

        return (
            <ReactSwiper swiperOptions={options} showPagination items={items} className="swiper-example"/>
        )
    }
}