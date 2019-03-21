export default {

pxToInt(stringpx){
	return parseInt(stringpx.slice(0, stringpx.length - 2));
},
//********************************************************************************************************************
removeSec(stringS){
	return parseFloat(stringS.slice(0, stringS.length - 1));
},
//********************************************************************************************************************
markActiveSlide(){
	if(!this.configs.slideMarkers) return;

	for (let i = 0; i < this.slidesSum; i++) {

		for(let stylecss in this.configs.markerActive){			
			this.markersContainer.childNodes[i].style[stylecss] = "none";
		}

		for(let stylecss in this.configs.markers){
			this.markersContainer.childNodes[i].style[stylecss] = this.configs.markers[stylecss];
		}
	}

	for(let stylecss in this.configs.markerActive){			
		this.markersContainer.childNodes[this.activeSlideIndex].style[stylecss] = this.configs.markerActive[stylecss];
	}
}

}
