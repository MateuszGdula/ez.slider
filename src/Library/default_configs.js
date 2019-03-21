const DEFAULT_CONFIGS = {
	sliderStyle: "shift",
	infiniteSliding: true,
	autoSlide: true,
	autoSlideIntervals: 6,
	slideMarkers: true,
	animationTime: "0.5s",
	animationFunction: "linear",
	sliderContainer: {
		position: "relative"
	},
	slidesWrapper: {
		width: "100%",
		height: "100%",
		position: "absolute",
		overflow: "hidden"
	},
	previousSlideRange: {
		width: "15%",
		height: "98%",
		borderRadius: "20px",
		background: "none",
		position: "absolute",
		left: "1%",
		bottom: "1%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "0.3s linear",
		cursor: "pointer"
	},
	previousSlideRangeHover: {
		background: "rgba(255, 255, 255, 0.2)"
	},
	previousSlide: {
		width: "40px",
		height: "40px",
		borderLeft: "2px solid black",
		borderBottom: "2px solid black",
		transform: "rotate(45deg)"
	},
	previousSlideHover: {

	},
	nextSlideRange: {
		width: "15%",
		height: "98%",
		borderRadius: "20px",
		background: "none",
		position: "absolute",
		right: "1%",
		bottom: "1%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		transition: "0.3s linear",
		cursor: "pointer"
	},
	nextSlideRangeHover: {
		background: "rgba(255, 255, 255, 0.2)"
	},
	nextSlide: {
		width: "40px",
		height: "40px",
		borderLeft: "2px solid black",
		borderBottom: "2px solid black",
		transform: "rotate(-135deg)"
	},
	nextSlideHover: {
	
	},
	markersContainer: {
		width: "100%",
		height: "auto",
		position: "absolute",
		bottom: "3%",
		display: "flex",
		justifyContent: "center",
		transition: "all 0.5s linear"
	},
	markers: {
		width: "10px",
		height: "10px",
		margin: "0 1% 0 1%",
		borderRadius: "50%",
		border: "1px solid black ",
		background: "white",
		transition: "all 0.2s linear"
	},
	markerActive: {
		background: "orange",
		transform: "scale(1.4)"
	},
	markerHover: {
		background: "orange"
	}
}

export default DEFAULT_CONFIGS;