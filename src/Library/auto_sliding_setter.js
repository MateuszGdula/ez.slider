export default {
	
setAutoSliding(){
	if(!this.configs.autoSlide) return;

	this.sliderInterval = setInterval(() => this.nextSlideRange.click(), this.configs.autoSlideIntervals * 1000);

	this.slider.addEventListener("mouseover", () => clearInterval(this.sliderInterval));
	this.slider.addEventListener("mouseenter", () => clearInterval(this.sliderInterval));
	this.slider.addEventListener("mouseleave", () => this.sliderInterval = setInterval(() =>
				 this.nextSlideRange.click(), this.configs.autoSlideIntervals * 1000));
}

}