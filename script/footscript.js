telInputList = document.querySelectorAll("input[type=tel]");
for (input of telInputList) { input.addEventListener("input", (event) => { telFormat(event.target) }) }

document.querySelector("button#mobileNav").addEventListener("click", () => { 
	nav = document.querySelector("nav"); 
	if (nav.style.display != "flex") { nav.style.display = "flex" }
	else { nav.style.display = "none" }
});

function changeFooter(blank) { 
	if (document.body.offsetHeight < window.innerHeight) { 
		document.querySelector("footer").style.position = "fixed"; 
		document.querySelector("footer").style.bottom = "0";
	} else {
		document.querySelector("footer").style.position = "static";
	}
}
new ResizeObserver(changeFooter).observe(document.body);

daSlider = document.querySelector(".slider");
slideIndex = 0;
setInterval(()=>{
	daSlider.scrollLeft += 2;
},50);
setInterval(()=>{
	if (!isVisible(daSlider.children[slideIndex])) {
		daSlider.appendChild(daSlider.children[slideIndex].cloneNode());
		slideIndex += 1;
	}
},10000);