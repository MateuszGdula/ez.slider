import DEFAULT_CONFIGS from "./default_configs.js";
import Slider_builder from "./ezSlider_builder.js";
import Utils from "./utils.js";
import Type_setter from "./slider_type_setter.js";
import Shift_slider from "./Slider types/shift_slider.js";
import Fade_slider from "./Slider types/fade_slider.js";
import Cover_slider from "./Slider types/cover_slider.js";
import Auto_slide from "./auto_sliding_setter.js";
import { mixin } from "./mixin.js";

class ezSlider extends mixin(Slider_builder, Type_setter, Utils, Shift_slider, Fade_slider, Cover_slider, Auto_slide){

	constructor(DOMObj, configs){
		super();

		this.slider = DOMObj;
		this.configs = configs;

		this.setUsefulData();
		this.buildDOMStructure();
		this.buildSliderInterface();
		this.setSliderType();
		this.setAutoSliding();
		
		window.addEventListener("resize", () => {
			this.setUsefulData();
			this.buildSliderInterface();
		});

		return this.slider;
	}
	//*******************************************************************************************************************
	static create(DOMObj, configs){

		let validationObj = ezSlider.validateObj(DOMObj);
		if(!validationObj.isValid) throw new Error("Invalid structure of DOM objects passed to ezSlider, check out documentation for more information.");

		if(configs !== undefined){
			let validationConfigs = ezSlider.validateConfigs(configs);
			if(!validationConfigs.isValid) throw new Error(`Invalid data of config object passed to ezSlider: ${validationConfigs.invalidData}`);
		}

		if(validationObj.type === "nodeList") DOMObj = ezSlider.fixNodeList(DOMObj);
		configs = ezSlider.fillConfigs(configs);

		return new ezSlider(DOMObj, configs);
	}
	//********************************************************************************************************************
	static validateObj(DOMObj){
		let validationResult = {
			isValid: false,
			type: undefined
		};

		if(DOMObj instanceof Element && 
			(DOMObj.tagName === "DIV" || 
			DOMObj.tagName === "SECTION" || 
			DOMObj.tagName === "ARTICLE" ||
			DOMObj.tagName === "HEADER" ||
			DOMObj.tagName === "FOOTER" ||
			DOMObj.tagName === "ASIDE")){

			validationResult.type = "DOMObj";

			if(DOMObj.children.length < 2){
				validationResult.isValid = false;
				return validationResult;
			}
	
			for(let child of DOMObj.children){
		
				if( child.tagName === "DIV" || 
					child.tagName === "SECTION" || 
					child.tagName === "ARTICLE" || 
					child.tagName === "ASIDE" ||
					DOMObj.tagName === "HEADER" ||
					DOMObj.tagName === "FOOTER" ||
					child.tagName === "IMG"){
					validationResult.isValid = true;
				} else {
					validationResult.isValid = false;
					return validationResult;
				};
			};

		} else if (NodeList.prototype.isPrototypeOf(DOMObj)){
			
			validationResult.type = "nodeList";

			if(DOMObj.length < 2){
				validationResult.isValid = false;
				return validationResult;
			}

			for(let elem of DOMObj){
	
				if( elem.tagName === "DIV" || 
					elem.tagName === "SECTION" || 
					elem.tagName === "ARTICLE" || 
					elem.tagName === "ASIDE" ||
					elem.tagName === "IMG"){
					validationResult.isValid = true;
				} else {
					validationResult.isValid = false;
					return validationResult;
				}
			};
		} 
		return validationResult;
	}
	//********************************************************************************************************************
	static validateConfigs(configs){
		if(typeof configs !== "object") return false;
		
		let validationResult = {
			isValid: false,
			invalidData: undefined
		};
		
		//validation of keys in configuration object
		for(let config in configs){
			validationResult.isValid = false;

			for (let defConfig in DEFAULT_CONFIGS){

				if(config === defConfig){
				 	 validationResult.isValid = true;
				}		
			}

			if(!validationResult.isValid){
				validationResult.invalidData = "Invalid keys in configs structure";
				return validationResult;
			} 
		}

		//validation of the most important values in config object
		
		if(configs.sliderStyle !== undefined){
			if( !(configs.sliderStyle === "shift" ||
				configs.sliderStyle === "fade" ||
				configs.sliderStyle === "cover") ){

				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in sliderStyle value";
				return validationResult;
			}
		}

		if(configs.infiniteSliding !== undefined &&
			typeof configs.infiniteSliding !== "boolean"){

				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in infiniteSliding value";
				return validationResult;
		}

		if(configs.autoSlide !== undefined &&
			typeof configs.autoSlide !== "boolean"){
			
				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in autoSlide value";
				return validationResult;
		}

		if(configs.autoSlideIntervals !== undefined &&
			typeof configs.autoSlideIntervals !== "number"){
			
				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in autoSlideIntervals value";
				return validationResult;
		}

		if(configs.slideMarkers !== undefined &&
			typeof configs.slideMarkers !== "boolean"){
			
				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in slideMarkers value";
				return validationResult;
		}

		if(configs.animationTime !== undefined &&
			typeof configs.slideMarkers !== "string"){
			
				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in animationTime value";
				return validationResult;
		}

		if(configs.animationFunction !== undefined &&
			typeof configs.slideMarkers !== "string"){
			
				validationResult.isValid = false;
				validationResult.invalidData = "Invalid type of data in animationFunction value";
				return validationResult;
		}

		return validationResult;
	}
	//********************************************************************************************************************
	static fixNodeList(nodeList){
		let container = document.createElement("DIV");
		for(let elem of nodeList){
			container.appendChild(elem);
		}
		return container;
	}
	//********************************************************************************************************************
	static fillConfigs(configs){
		if(configs === undefined){
			return DEFAULT_CONFIGS;
		}

		let fusedConfigs = {};
		Object.assign(fusedConfigs, DEFAULT_CONFIGS, configs);

		//filling nested configs
		for(let config in configs){

			if(typeof configs[config] === "object"){
				let fusedNestedConfigs = {};
				Object.assign(fusedNestedConfigs, DEFAULT_CONFIGS[config], configs[config]);
				//console.log(fusedNestedConfigs);
				fusedConfigs[config] = fusedNestedConfigs;
			}

		}
		return fusedConfigs;
	}
}

export default ezSlider;
