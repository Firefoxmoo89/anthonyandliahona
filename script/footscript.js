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