export default {

fadeSlider(){

	this.fadeArrangeSlides();
	this.fadeSetListeners();
},
//********************************************************************************************************************
fadeArrangeSlides(){

	for(let i = 0; i < this.slidesSum; i++){
		this.slidesWrapper.childNodes[i].style.transition = 
			`opacity ${this.configs.animationTime} ${this.configs.animationFunction}`;

		if(i !== this.activeSlideIndex) this.slidesWrapper.childNodes[i].style.opacity = "0";
	}
},
//********************************************************************************************************************
fadeSetListeners(){
	this.previousSlideRange.addEventListener("click", () => {
		this.fadePreviousSlide();
	}, false);

	this.nextSlideRange.addEventListener("click", () => {
		this.fadeNextSlide();
	}, false);
	//markersContainer
	if(this.configs.slideMarkers){

		this.markersContainer.addEventListener("click", (e) => {
			this.fadeDotClick(e);
		}, false);
	}
},
//********************************************************************************************************************
fadePreviousSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === 0) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === 0){
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "1";
			this.slidesWrapper.childNodes[0].style.opacity = "0";

			this.activeSlideIndex = this.slidesSum -1;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {
			this.slidesWrapper.childNodes[i - 1].style.opacity = "1";
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i -1;
			this.markActiveSlide();
			break;
		}
	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
fadeNextSlide(){
	if(this.lockSlider) return;
	if(!this.configs.infiniteSliding && (this.activeSlideIndex === this.slidesSum - 1) ) return;

	this.lockSlider = true;

	for(let i = 0; i < this.slidesSum; i++){

		if(this.activeSlideIndex === this.slidesSum - 1){
			this.slidesWrapper.childNodes[0].style.opacity = "1";
			this.slidesWrapper.childNodes[this.slidesSum - 1].style.opacity = "0";

			this.activeSlideIndex = 0;
			this.markActiveSlide();
			break;

		} else if(this.activeSlideIndex === i) {
			this.slidesWrapper.childNodes[i + 1].style.opacity = "1";
			this.slidesWrapper.childNodes[i].style.opacity = "0";

			this.activeSlideIndex = i +1;
			this.markActiveSlide();
			break;
		}

	}
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
},
//********************************************************************************************************************
fadeDotClick(e){
	if(this.lockSlider || e.target === this.markersContainer.childNodes[this.activeSlideIndex] ||
		e.target === this.markersContainer ) return;
	this.lockSlider = true;

	let targetIndex = [...this.markersContainer.childNodes].indexOf(e.target);

	this.slidesWrapper.childNodes[targetIndex].style.opacity = "1";
	this.slidesWrapper.childNodes[this.activeSlideIndex].style.opacity = "0";

	this.activeSlideIndex = targetIndex;
	this.markActiveSlide();
	
	setTimeout(() => this.lockSlider = false, this.removeSec(this.configs.animationTime) * 1000 );
}

}