function slideshow(containerSelector,buttonSelectors=false,labelSelectors=false,autoscroll=false,parentSelector=document) {
	/* Controls a slider with optional (left and right) or (up and down) button control, optional index labels, and optional autoscroll. Each slide is based off of children of the containerSelector, which means any block elements will work.
	"containerSelector" parameter is a string for a querySelector that selects the container of the slides. Children will be the slides.
	"buttonSelectors" parameter is an array [decreaseIndex:cssSelectorString,increaseIndex:cssSelectorString]. These are selectors for buttons that will decrease and increase the index of the displayed slide.
	"labelSelectors" parameter is an array [currentIndex:cssSelectorString,totalSlides:cssSelectorString]. These are text elements that will be changed to match the slides indexes.
	"autoscroll" parameter can be set to a ms timeout for scrolling the images without user input.
	"parentSelector" parameter changes the querySelectors if css selectors need a specific reference point.
	*/
	if (parentSelector == document) { parent = document } else { parent = document.querySelector(parentSelector) }
	let slideContainer = parent.querySelector(containerSelector); slideContainer.setAttribute("data-index","0");
	slideContainer.children[0].style.display = "block"; slideContainer.children[0].setAttribute("data-current","");
	if (autoscroll != false) { slideContainer.setAttribute("data-clicked","false") }
	let maxIndex = Array.from(slideContainer.children).length-1;
	function slide(direction) {
		if (slideContainer.querySelector("[data-current]")!=null) { 
			slideContainer.querySelector("[data-current]").style.display = "none";
			slideContainer.querySelector("[data-current]").removeAttribute("data-current");
		}
		let currentIndex = Number(slideContainer.dataset.index);
		if (direction == "left") { 
			if (currentIndex == 0) { index = maxIndex }
			else { index = currentIndex-1 }
		} else if (direction == "right") { 
			if (currentIndex == maxIndex) { index = 0 }
			else { index = currentIndex+1 }
		}
		slideContainer.dataset.index = index;
		slideContainer.children[index].style.display = "block";
		slideContainer.children[index].setAttribute("data-current","");
		if (labelSelectors != false) {
			parent.querySelector(labelSelectors[0]).innerText = index+1;
			parent.querySelector(labelSelectors[1]).innerText = maxIndex+1;
		}
	}
	if (buttonSelectors != false) {
		parent.querySelector(buttonSelectors[0]).addEventListener("click",()=>{ 
			slide("left");
			if (autoscroll != false) { slideContainer.dataset.clicked = "true" }
		});
		parent.querySelector(buttonSelectors[1]).addEventListener("click",()=>{ 
			slide("right");
			if (autoscroll != false) { slideContainer.dataset.clicked = "true" }
		});
	}
	if (autoscroll != false) {
		setInterval(()=>{
			if (autoscroll != false) { 
				if (slideContainer.dataset.clicked == "true") { slideContainer.dataset.clicked = "false" }	
				else { slide("right") }
			}
		},5000);
	}
}