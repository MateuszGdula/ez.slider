import ezSlider from "./Library/ezSlider.js";

//auto run for default style sliders marked by .ezSliderTarget class
(function(){
	let sliders = document.querySelectorAll(".ezSliderTarget");
	if(sliders !==null){
		for(let slider of sliders){
			ezSlider.create(slider);
		};
	};
})();

function initezSlider(obj, conf){
	return ezSlider.create(obj, conf);
}

window.ezSlider = initezSlider;
