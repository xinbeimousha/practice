class Slide{
	//基本属性
	constructor(id){
		this.container = document.getElementById(id);
		this.items = this.container.querySelectorAll('.slide-list__item,.slide-list__item--selected');
	}
	//获取当前显示的图片
	getSelectedItem(){
		let selected = this.container.querySelector('.slide-list__item--selected');
		return selected;
	}
	//获取当前显示图片的下标
	getSelectedItemIndex(){
		return Array.from(this.items).indexOf(this.getSelectedItem());
	}
	//指定图片跳转
	slideTo(idx){
		let selected = this.getSelectedItem();
		if(selected){
			selected.className = 'slide-list__item'
			
		}
		let item = this.items[idx]
		if(item){
			this.items[idx].className = 'slide-list__item--selected';
		}
	}
	//下一页
	slideNext(){
		//获取当前图片的索引
		let currentIdx = this.getSelectedItemIndex();
		let nextIdx = (currentIdx + 1)%this.items.length;
		this.slideTo(nextIdx);
	}
    //上一页
	slidePrevious(){
		let currentIdx = this.getSelectedItemIndex();
		let preIdx = (this.items.length + currentIdx - 1)%this.items.length;
		this.slideTo(preIdx);
	}
}

let slide = new Slide('my-slider');

setInterval(slide.slideNext.bind(slide),3000);