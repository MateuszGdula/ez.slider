export default {

coverSlider(){

	this.coverArrangeSlides();
	this.setCoverAnimations();
	this.coverSetListeners();
},
//********************************************************************************************************************
coverArrangeSlides(){

	for(let i = 0; i < this.slidesSum; i++){
		if(i !== this.activeSlideIndex) this.slidesWrapper.childNodes[i].style.opacity = "0";
	}
},
//********************************************************************************************************************
setCoverAnimations(){
	let animations = document.createElement("style");
	animations.type = "text/css";
	animations.innerHTML = `
	@keyframes coverPrev {
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
	@keyframes coverNext {
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
	@keyframes coveredSlide {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}`;
	document.querySelector("head").appendChild(animations);
},
//********************************************************************************************************************
coverSetListeners(){
	this.previousSlideRange.addEventListener("click", () => {
		this.coverPreviousSlide();
	}, false);

	this.nextSlideRange.addEventListener("click", () => {
		this.coverNextSlide();
	}, false);
	//markersContainer
	if(this.configs.slideMarkers){

		this.markersContainer.addEventListener("click", (e) => {
			this.coverDotClick(e);
		}, false);
	}
},
//********************************************************************************************************************
coverPreviousSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === 0) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === 0){

			this.slidesWrapper.childNodes[this.slidesSum - 1].style.animation = 
				`coverPrev ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "1";

			this.slidesWrapper.childNodes[0].style.animation = 
				`coveredSlide ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[0].style.opacity = "0";

			this.activeSlideIndex = this.slidesSum -1;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {

			this.slidesWrapper.childNodes[i - 1].style.animation =
			`coverPrev ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i - 1].style.opacity = "1";

			this.slidesWrapper.childNodes[i].style.animation =
			`coveredSlide ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i -1;
			this.markActiveSlide();
			break;
		}
	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
coverNextSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === this.slidesSum - 1) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === this.slidesSum - 1){

			this.slidesWrapper.childNodes[0].style.animation = 
				`coverNext ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[0].style.opacity = "1";

			this.slidesWrapper.childNodes[this.slidesSum - 1].style.animation = 
				`coveredSlide ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "0";

			this.activeSlideIndex = 0;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {

			this.slidesWrapper.childNodes[i + 1].style.animation =
				`coverNext ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i + 1].style.opacity = "1";

			this.slidesWrapper.childNodes[i].style.animation =
				`coveredSlide ${this.configs.animationTime} ${this.configs.animationFunction}`;
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i +1;
			this.markActiveSlide();
			break;
		}

	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
coverDotClick(e){
	if(this.lockSlider || e.target === this.markersContainer.childNodes[this.activeSlideIndex] ||
		e.target === this.markersContainer ) return;
	
	this.lockSlider = true;
	let targetIndex = [...this.markersContainer.childNodes].indexOf(e.target);
	let direction = "";

	targetIndex > this.activeSlideIndex ? direction = "Next" : direction = "Prev";

	this.slidesWrapper.childNodes[targetIndex].style.animation =
		`cover${direction} ${this.configs.animationTime} ${this.configs.animationFunction}`;
	this.slidesWrapper.childNodes[targetIndex].style.opacity = "1";

	this.slidesWrapper.childNodes[this.activeSlideIndex].style.animation =
		`coveredSlide ${this.configs.animationTime} ${this.configs.animationFunction}`;
	this.slidesWrapper.childNodes[this.activeSlideIndex].style.opacity = "0";

	this.activeSlideIndex = targetIndex;
	this.markActiveSlide();
	
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
}

}