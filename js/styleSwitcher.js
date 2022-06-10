//CHANGE COLOR
  const links=document.querySelectorAll(".alternate-style");
  totalLinks=links.length
function setActiveStyle(color){
  for(let i=0; i<totalLinks; i++){
    if(color === links[i].getAttribute("title")){
      links[i].removeAttribute("disabled");
    }else{
      links[i].setAttribute("disabled","true");
    }
  }
}

// OPEN CONFIGURATION
document.querySelector(".toggle-style-switcher").addEventListener("click",() =>{
  document.querySelector(".style-switcher").classList.toggle("open");
})
//CHANGE THEME: LIGHT/DARK
 const btnSwitch = document.querySelector('.switch');
 btnSwitch.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     btnSwitch.classList.toggle('active');
     //theme localstorage
     if(document.body.classList.contains('dark')){
       localStorage.setItem('dark-mode', 'true');
     }else{
       localStorage.setItem('dark-mode', 'false');
     }
 });

if(localStorage.getItem('dark-mode') === 'true'){
  document.body.classList.add('dark');
  btnSwitch.classList.add('active');
}else{
  document.body.classList.remove('dark');
  btnSwitch.classList.remove('active');
}
