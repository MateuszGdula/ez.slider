export default {

shiftSlider(){

	this.shiftArrangeSlides();
	this.setShiftAnimations();
	this.shiftSetListeners();
},
//********************************************************************************************************************
shiftArrangeSlides(){

	for(let i = 0; i < this.slidesSum; i++){
		if(i !== this.activeSlideIndex) this.slidesWrapper.childNodes[i].style.opacity = "0";
	}
},
//********************************************************************************************************************
setShiftAnimations(){
	let animations = document.createElement("style");
	animations.type = "text/css";
	animations.innerHTML = `
	@keyframes shiftPrev1 {
		0% {
			opacity: 0;
		}
		1% {
			transform: translateX(-${this.sliderWidthInt}px);
		}
		2% {
			opacity 1;
		}
	
		100% {
			transform: translateX(0px);
		}
	}
	@keyframes shiftPrev2 {
		1% {
			transform: translateX(0px);
			opacity: 1;
		}
		99% {
			opacity: 1;
		}
		100% {
			transform: translateX(${this.sliderWidthInt}px);
			opacity: 0;
		}
	}
	@keyframes shiftNext1 {
		0% {
			opacity: 0;
		}
		1% {
			transform: translateX(${this.sliderWidthInt}px);
		}
		2% {
			opacity 1;
		}
	
		100% {
			transform: translateX(0px);
		}
	}
	@keyframes shiftNext2 {
		1% {
			transform: translateX(0px);
			opacity: 1;
		}
		99% {
			opacity: 1;
		}
		100% {
			transform: translateX(-${this.sliderWidthInt}px);
			opacity: 0;
		}
	}`
	document.querySelector("head").appendChild(animations);
},
//********************************************************************************************************************
shiftSetListeners(){
	this.previousSlideRange.addEventListener("click", () => {
		this.shiftPreviousSlide();
	}, false);

	this.nextSlideRange.addEventListener("click", () => {
		this.shiftNextSlide();
	}, false);
	//markersContainer
	if(this.configs.slideMarkers){

		this.markersContainer.addEventListener("click", (e) => {
			this.shiftDotClick(e);
		}, false);
	}
},
//********************************************************************************************************************
shiftPreviousSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === 0) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === 0){

			this.slidesWrapper.childNodes[this.slidesSum - 1].style.animation = 
				`shiftPrev1 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "1";

			this.slidesWrapper.childNodes[0].style.animation = 
				`shiftPrev2 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[0].style.opacity = "0";

			this.activeSlideIndex = this.slidesSum -1;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {

			this.slidesWrapper.childNodes[i - 1].style.animation =
			`shiftPrev1 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i - 1].style.opacity = "1";

			this.slidesWrapper.childNodes[i].style.animation =
			`shiftPrev2 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i -1;
			this.markActiveSlide();
			break;
		}
	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
shiftNextSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === this.slidesSum - 1) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === this.slidesSum - 1){

			this.slidesWrapper.childNodes[0].style.animation = 
				`shiftNext1 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[0].style.opacity = "1";

			this.slidesWrapper.childNodes[this.slidesSum - 1].style.animation = 
				`shiftNext2 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "0";

			this.activeSlideIndex = 0;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {

			this.slidesWrapper.childNodes[i + 1].style.animation =
				`shiftNext1 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i + 1].style.opacity = "1";

			this.slidesWrapper.childNodes[i].style.animation =
				`shiftNext2 ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i +1;
			this.markActiveSlide();
			break;
		}

	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
shiftDotClick(e){
	if(this.lockSlider || e.target === this.markersContainer.childNodes[this.activeSlideIndex] ||
		e.target === this.markersContainer ) return;
	
	this.lockSlider = true;
	let targetIndex = [...this.markersContainer.childNodes].indexOf(e.target);
	let direction = "";

	targetIndex > this.activeSlideIndex ? direction = "Next" : direction = "Prev";

	this.slidesWrapper.childNodes[targetIndex].style.animation =
		`shift${direction}1 ${this.configs.animationTime} ${this.configs.animationFunction}`;
	this.slidesWrapper.childNodes[targetIndex].style.opacity = "1";

	this.slidesWrapper.childNodes[this.activeSlideIndex].style.animation =
		`shift${direction}2 ${this.configs.animationTime} ${this.configs.animationFunction}`;
	this.slidesWrapper.childNodes[this.activeSlideIndex].style.opacity = "0";

	this.activeSlideIndex = targetIndex;
	this.markActiveSlide();
	
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
}

}