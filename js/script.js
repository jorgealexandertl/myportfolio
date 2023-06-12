//PRELOADER
window.addEventListener("load", function(){
  document.querySelector(".preloader").classList.add("opacity-0");
  setTimeout(function(){
    document.querySelector(".preloader").style.display="none";
  },1000)
})


function bodyScrollingToggle(){
	document.body.classList.toggle("hidden-scrolling");
}

/* PORTFOLIO FILTER AND POPUP 58:00*/
 (() =>{
   const filterContainer = document.querySelector(".portfolio-filter"),
   portfolioItemsContainer = document.querySelector(".portfolio-items"),
   portfolioItems = document.querySelectorAll(".portfolio-item"),
   popup = document.querySelector(".portfolio-popup"),
   prevBtn = popup.querySelector(".pp-prev"),
   nextBtn = popup.querySelector(".pp-next"),
   closeBtn = popup.querySelector(".pp-close"),
   projectDetailsContainer = popup.querySelector(".pp-details"),
   projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
   let itemIndex, slideIndex, screenshots;

   /*filter portfolio items*/
   filterContainer.addEventListener("click", (event)=>{
     if(event.target.classList.contains("filter-item") &&
      !event.target.classList.contains("active")){
      //deactivate existing active 'filter-item'
      filterContainer.querySelector(".active").classList.remove("outer-shadow","active");
      //activate new 'filter item'
      event.target.classList.add("active","outer-shadow");
      const target = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) =>{
        if(target === item.getAttribute("data-category") || target === 'all'){
          item.classList.remove("hide");
          item.classList.add("show");
          }
        else{
          item.classList.remove("show");
          item.classList.add("hide");
          }
        })
      }
   })

   portfolioItemsContainer.addEventListener("click", (event) =>{
   	if(event.target.closest(".portfolio-item-inner")){
   	const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
   	//get the portfolioItem index
   	itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
   	screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
   	//convert screenshots into array
   	screenshots = screenshots.split(",");
    if(screenshots.length === 1){
      prevBtn.style.display="none";
      nextBtn.style.display="none";
    }
    else {
      prevBtn.style.display="block";
      nextBtn.style.display="block";
    }
   	slideIndex = 0;
   	popupToggle();
    popupSlideshow();
    popupDetails();
   	}
   })

   closeBtn.addEventListener("click", () =>{
   	popupToggle();
    if(projectDetailsContainer.classList.contains("active")){
      popupDetailsToggle();
    }
   })
   function popupToggle(){
   	popup.classList.toggle("open");
    bodyScrollingToggle();
   }
   function popupSlideshow(){
   	const imgSrc = screenshots[slideIndex];
   	const popupImg = popup.querySelector(".pp-img");
    //activate loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src=imgSrc;
    popupImg.onload = () =>{
    //deactivate loader after the popImg loaded
    popup.querySelector(".pp-loader").classList.remove("active");
    }
    /*CONTADOR*/
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " de " + screenshots.length;
   }
   //next slide
   nextBtn.addEventListener("click", () =>{
    if(slideIndex === screenshots.length-1){
      slideIndex = 0;
    }
    else {
      slideIndex++;
    }
    popupSlideshow();
   })
   //prev slide
   prevBtn.addEventListener("click", () =>{
    if(slideIndex === 0){
      slideIndex = screenshots.length-1;
    }
    else {
      slideIndex--;
    }
    popupSlideshow();
   })

   function popupDetails(){
    //if portfolio-item-details not exists
    if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
      projectDetailsBtn.style.display="none";
      return; /*end function execution*/
    }
    projectDetailsBtn.style.display="block";
    //get the project Details
    const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
    //set the project details
    popup.querySelector(".pp-project-details").innerHTML = details;
    //get the project title
    const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
    //set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;
    //get the project category
    const category = portfolioItems[itemIndex].getAttribute("data-category");
    //set the project category
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("");
   }
   projectDetailsBtn.addEventListener("click",() =>{
    popupDetailsToggle();
   })
   function popupDetailsToggle(){
    if(projectDetailsContainer.classList.contains("active")){
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 + "px";
    }
    else {
    projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
    projectDetailsBtn.querySelector("i").classList.add("fa-minus");
    projectDetailsContainer.classList.add("active");
    projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
    popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
   }
 })();

  // Aside Navbar
  const nav=document.querySelector(".nav"),
    navList=nav.querySelectorAll("li"),
    totalNavList=navList.length,
    allSection=document.querySelectorAll(".section"),
    totalSection=allSection.length;

  for(let i=0; i<totalNavList; i++){
    const a=navList[i].querySelector("a");
    //Active
    a.addEventListener("click", function(){
      //remove back section class
      removeBackSectionClass();

        for(let j=0; j<totalNavList; j++){
          if(navList[j].querySelector("a").classList.contains("active")){
            //add back section class
            addBackSectionClass(j);
          }
          navList[j].querySelector("a").classList.remove("active");

        }

      this.classList.add("active");
      showSection(this);

      if(window.innerWidth <1200){
        asideSectionTogglerBtn();
      }
    })
  }
  function removeBackSectionClass(){
    for(let i =0; i<totalSection; i++){
      allSection[i].classList.remove("back-section");
    }
  }
  function addBackSectionClass(num){
      allSection[num].classList.add("back-section");
  }
  function showSection(element){
    for(let i =0; i<totalSection; i++){
      allSection[i].classList.remove("active");
    }
    const target=element.getAttribute("href").split("#")[1];
    document.querySelector("#"+target).classList.add("active");
  }
  function updateNav(element){
    for(let i=0; i<totalNavList; i++){
      navList[i].querySelector("a").classList.remove("active");
      const target=element.getAttribute("href").split("#")[1];
      if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1]){
        navList[i].querySelector("a").classList.add("active");
      }
    }
  }
  //BUTTONS FOR APPEAR CORRECTLY OTHER PAGE
  document.querySelector(".hire-me").addEventListener("click",function(){
    const sectionIndex=this.getAttribute("data-section-index");
    showSection(this);
    updateNav(this);
    removeBackSectionClass();
    addBackSectionClass(sectionIndex);
  })

  //-----------------------------
  const navTogglerBtn=document.querySelector(".nav-toggler"),
    aside=document.querySelector(".aside");

  navTogglerBtn.addEventListener("click",asideSectionTogglerBtn);

  function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i =0; i<totalSection; i++){
      allSection[i].classList.toggle("open");
    }
  }
//BROWSERS STYLES
// https://developer.mozilla.org/es/docs/Web/API/Window/navigator
var sBrowser, sUsrAg = navigator.userAgent;
if (sUsrAg.indexOf("Firefox") > -1) {
    sBrowser = "Mozilla Firefox";
      document.getElementById("brandname").style.fontSize="38px";
    }
