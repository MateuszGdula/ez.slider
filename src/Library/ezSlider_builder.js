export default {

setUsefulData(){

	this.lockSlider = false;
	if(! this.hasOwnProperty("activeSlideIndex")) this.activeSlideIndex = 0;
	if(! this.hasOwnProperty("slidesSum")) this.slidesSum = this.slider.children.length;
	
	this.sliderWidthInt = 0;
	this.sliderHeightInt = 0;

	for(let i = 0; i < this.slidesSum; i++){
		if(this.hasOwnProperty("slidesWrapper")){
			document.body.appendChild(this.slidesWrapper.children[0]);

			let width = document.body.lastChild.offsetWidth;
			let height = document.body.lastChild.offsetHeight;

			document.body.lastChild.style.width = `${width}px`;
			document.body.lastChild.style.height = `${height}px`;

			this.slidesWrapper.appendChild(document.body.lastChild);
			
			if(width > this.sliderWidthInt) this.sliderWidthInt = width;
			if(height > this.sliderHeightInt) this.sliderHeightInt = height;
		} else {
			document.body.appendChild(this.slider.children[0]);

			let width = document.body.lastChild.offsetWidth;
			let height = document.body.lastChild.offsetHeight;

			document.body.lastChild.style.width = `${width}px`;
			document.body.lastChild.style.height = `${height}px`;

			this.slider.appendChild(document.body.lastChild);
			
			if(width > this.sliderWidthInt) this.sliderWidthInt = width;
			if(height > this.sliderHeightInt) this.sliderHeightInt = height;
		}
	}
},
//********************************************************************************************************************

buildDOMStructure(){

	let frag = document.createDocumentFragment();
	//build slides wrapper
	this.slidesWrapper = document.createElement("DIV");
	this.slidesWrapper.classList.add("slidesWrapper");

	while(this.slider.children.length !== 0){
		this.slidesWrapper.appendChild(this.slider.children[0]);
	}

	frag.appendChild(this.slidesWrapper);

	//build arrows
	this.previousSlideRange = document.createElement("DIV");
	this.previousSlideRange.classList.add("previousSlideRange");
	this.previousSlide = document.createElement("DIV");
	this.previousSlide.classList.add("previousSlide");
	this.previousSlideRange.appendChild(this.previousSlide);

	frag.appendChild(this.previousSlideRange);

	this.nextSlideRange = document.createElement("DIV");
	this.nextSlideRange.classList.add("nextSlideRange");
	this.nextSlide = document.createElement("DIV");
	this.nextSlide.classList.add("nextSlide");
	this.nextSlideRange.appendChild(this.nextSlide);

	frag.appendChild(this.nextSlideRange);

	//build slides markers
	if(this.configs.slideMarkers){
		this.markersContainer = document.createElement("DIV");
		this.markersContainer.classList.add("markersContainer");

		for (let i = 0; i < this.slidesWrapper.children.length; i++) {
			this.markersContainer.appendChild(document.createElement("DIV"));
		}

		frag.appendChild(this.markersContainer);
	}

	this.slider.classList.remove("ezSliderTarget");
	this.slider.classList.add("ezSlider");
	this.slider.appendChild(frag);
},
//********************************************************************************************************************
buildSliderInterface(){

	this.setInterfaceStyles();
	this.setInterfaceHoverStyles();

},
//********************************************************************************************************************
setInterfaceStyles(){
	//assign styles to slider container
	for(let stylecss in this.configs.sliderContainer){
		this.slider.style[stylecss] = this.configs.sliderContainer[stylecss];
	}
	//set slider size based on the biggest slide;
	this.slider.style.width = `${this.sliderWidthInt}px`;
	this.slider.style.height = `${this.sliderHeightInt}px`;

	//set slidesWrapper styles
	for(let stylecss in this.configs.slidesWrapper){
		this.slidesWrapper.style[stylecss] = this.configs.slidesWrapper[stylecss];
	}

	//set slides positioning
	for (let i = 0; i < this.slidesSum; i++) {
		this.slidesWrapper.children[i].style.position = "absolute";
		
		let left = Math.round(
			(this.sliderWidthInt / 2) - (this.pxToInt(this.slidesWrapper.children[i].style.width) / 2)
			)
		let top = Math.round(
			(this.sliderHeightInt / 2) - (this.pxToInt(this.slidesWrapper.children[i].style.height) / 2)
			)
		
		this.slidesWrapper.children[i].style.left = `${left}px`;
		this.slidesWrapper.children[i].style.top = `${top}px`;
		this.slidesWrapper.children[i].style.margin = `0`;
	}	

	//previous slide range styles
	for(let stylecss in this.configs.previousSlideRange){
		this.previousSlideRange.style[stylecss] = this.configs.previousSlideRange[stylecss];
	}

	//previous slide styles
	for(let stylecss in this.configs.previousSlide){
		this.previousSlide.style[stylecss] = this.configs.previousSlide[stylecss];
	}

	//next slide range styles
	for(let stylecss in this.configs.nextSlideRange){
		this.nextSlideRange.style[stylecss] = this.configs.nextSlideRange[stylecss];
	}

	//next slide styles
	for(let stylecss in this.configs.nextSlide){
		this.nextSlide.style[stylecss] = this.configs.nextSlide[stylecss];
	}

	//slides markers styles
	if(this.configs.slideMarkers){

		for(let stylecss in this.configs.markersContainer){
			this.markersContainer.style[stylecss] = this.configs.markersContainer[stylecss];
		}
		
		for (let i = 0; i < this.slidesSum; i++) {

			for(let stylecss in this.configs.markers){
				this.markersContainer.children[i].style[stylecss] = this.configs.markers[stylecss];
			}
		}

		this.markActiveSlide();
	}
},
//********************************************************************************************************************
setInterfaceHoverStyles(){
	//previous slide hovers
	this.previousSlideRange.addEventListener("mouseenter", () => {

		for(let stylecss in this.configs.previousSlideRangeHover){
			this.previousSlideRange.style[stylecss] = this.configs.previousSlideRangeHover[stylecss];
		}

		for(let stylecss in this.configs.previousSlideHover){
			this.previousSlide.style[stylecss] = this.configs.previousSlideHover[stylecss];
		}

	}, false);

	this.previousSlideRange.addEventListener("mouseleave", () => {

		for(let stylecss in this.configs.previousSlideRangeHover){
			this.previousSlideRange.style[stylecss] = "none";
		}

		for(let stylecss in this.configs.previousSlideHover){
			this.previousSlide.style[stylecss] = "none";
		}

		for(let stylecss in this.configs.previousSlideRange){
			this.previousSlideRange.style[stylecss] = this.configs.previousSlideRange[stylecss];
		}

		for(let stylecss in this.configs.previousSlide){
			this.previousSlide.style[stylecss] = this.configs.previousSlide[stylecss];
		}

	}, false);

	//next slide hovers
	this.nextSlideRange.addEventListener("mouseenter", () => {

		for(let stylecss in this.configs.nextSlideRangeHover){
			this.nextSlideRange.style[stylecss] = this.configs.nextSlideRangeHover[stylecss];
		}

		for(let stylecss in this.configs.nextSlideHover){
			this.nextSlide.style[stylecss] = this.configs.nextSlideHover[stylecss];
		}

	}, false);

	this.nextSlideRange.addEventListener("mouseleave", () => {

		for(let stylecss in this.configs.nextSlideRangeHover){
			this.nextSlideRange.style[stylecss] = "none";
		}

		for(let stylecss in this.configs.nextSlideHover){
			this.nextSlide.style[stylecss] = "none";
		}

		for(let stylecss in this.configs.nextSlideRange){
			this.nextSlideRange.style[stylecss] = this.configs.nextSlideRange[stylecss];
		}

		for(let stylecss in this.configs.nextSlide){
			this.nextSlide.style[stylecss] = this.configs.nextSlide[stylecss];
		}

	}, false);

	//dots hovers
	if(this.configs.slideMarkers){

		for(let i = 0; i < this.slidesSum; i++){

			this.markersContainer.children[i].addEventListener("mouseenter", (e) => {
				if(this.markersContainer.children[this.activeSlideIndex] === e.target) return;

				for(let stylecss in this.configs.markerHover){
					e.target.style[stylecss] = this.configs.markerHover[stylecss];
				}

			}, false);

			this.markersContainer.children[i].addEventListener("mouseleave", (e) => {
				if(this.markersContainer.children[this.activeSlideIndex] === e.target) return;

				for(let stylecss in this.configs.markerHover){
					e.target.style[stylecss] = "none";
				}

				for(let stylecss in this.configs.markers){
					e.target.style[stylecss] = this.configs.markers[stylecss];
				}

			}, false);
		}	
	}	
}

}