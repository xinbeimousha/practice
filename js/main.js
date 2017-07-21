class Slide {
    //基本属性
    constructor(id, cycle = 3000) {
        this.container = document.getElementById(id);
        this.items = this.container.querySelectorAll('.slide-list__item,.slide-list__item--selected');
        this.cycle = cycle;
        this.slideHandles = [];

        let controller = this.container.querySelector('.slide-list__control');

        if (controller) {
            let buttons = document.querySelectorAll('.slide-list__control-button,.slide-list__control-button--selected');
            controller.addEventListener('mouseover', evt => {
                //获取当前下标
                var idx = Array.from(buttons).indexOf(evt.target);
                if (idx >= 0) {
                    this.slideTo(idx);
                    this.stop();
                }
            })

            controller.addEventListener('mouseout', evt => {
                this.start();
            })
            //改变按钮zhuangt
            this.addSlideListener(function(idx) {
                let selected = document.querySelector('.slide-list__control-button--selected');
                if (selected) {
                    selected.className = 'slide-list__control-button';
                    buttons[idx].className = 'slide-list__control-button--selected';
                }
            })
        }

    }
    //获取当前显示的图片
    getSelectedItem() {
        let selected = this.container.querySelector('.slide-list__item--selected');
        return selected;
    }
    //获取当前显示图片的下标
    getSelectedItemIndex() {
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }
    //指定图片跳转
    slideTo(idx) {
        let selected = this.getSelectedItem();
        if (selected) {
            selected.className = 'slide-list__item'

        }
        let item = this.items[idx]
        if (item) {
            this.items[idx].className = 'slide-list__item--selected';
        }

        this.slideHandles.forEach(handle => {
            handle(idx);
        })
    }
    //下一页
    slideNext() {
        //获取当前图片的索引
        let currentIdx = this.getSelectedItemIndex();
        let nextIdx = (currentIdx + 1) % this.items.length;
        this.slideTo(nextIdx);
    }
    //上一页
    slidePrevious() {
        let currentIdx = this.getSelectedItemIndex();
        let preIdx = (this.items.length + currentIdx - 1) % this.items.length;
        this.slideTo(preIdx);
    }
    //添加slide监听事件
    addSlideListener(handle) {
        this.slideHandles.push(handle)
    }
    //启动轮播事件
    start() {
        //先清空setInterval
        this.stop();
        this.slideTimer = setInterval(() => {
            this.slideNext();
        }, this.cycle);
    }
    //暂停轮播事件
    stop() {
        clearInterval(this.slideTimer);
    }
}
////
let slide = new Slide('my-slider');
slide.start();
//setInterval(slide.slideNext.bind(slide),3000);