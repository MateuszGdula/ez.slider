export default {

setSliderType(){
	
	switch(this.configs.sliderStyle){
		case "shift":
			this.shiftSlider();
			break;
		case "fade":
			this.fadeSlider();
			break;
		case "cover":
			this.coverSlider();
			break;
	}
}

	
}
