// const sections = document.querySelectorAll('section[id]')
// console.log(sections);

// window.addEventListener('scroll', () => {
// {
//     const scrollY = window.pageYOffset

//     sections.forEach(current =>
//         {
//         const sectionHeight = current.offsetHeight
//         const sectionTop = current.offsetTop - 50;
//         let sectionId = current.getAttribute('id')
        
//         if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight)
//         {
//             // document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active-link')
//             document.querySelector('.nav-upper-options div[href*=' + sectionId + ']').classList.add('active-link')
//         }
//         else
//         {
//             // document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active-link')
//             document.querySelector('.nav-upper-options div[href*=' + sectionId + ']').classList.remove('active-link')
//         }
//     })
// }



// const navLinks = document.querySelectorAll('nav div a');
// console.log(navLinks);
// const sections = document.querySelectorAll('section');
// console.log(sections);



// sections.forEach(section => {
//     console.log(section);
//     console.log(window.pageYOffset);
//   console.log(section.offsetTop);
//   console.log(section.clientHeight);
// })


// window.addEventListener('scroll', () => {
//   const currentPos = window.pageYOffset;
  
//   sections.forEach(section => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.clientHeight;
    
//     if (currentPos >= sectionTop - 50 && currentPos < sectionTop + sectionHeight - 50) {
//       navLinks.forEach( link => {
//         if (link.getAttribute('href') === `#${section.getAttribute('id')}`) {
//           link.classList.add('active-link');
//         } else {
//           link.classList.remove('active-link');
//         }
//       });
//     }
//   });
// });

// const li=document.querySelectorAll(".nav-option");
// 		const sec=document.querySelectorAll("section");
// 		function activeMenu(){
// 		    let len=sec.length;
// 		    while(--len && window.scrollY+ 97 < sec[len].offsetTop){}
// 		    li.forEach(ltx => ltx.classList.remove("active-link"));
// 		    li[len].classList.add("active-link");
// }
// activeMenu();
// window.addEventListener("scroll",activeMenu);



const links=document.querySelectorAll(".nav-option");

links.forEach(link => {
    link.addEventListener('click', () => {
      links.forEach(link => link.classList.remove('active-link'));
      link.classList.add('active-link');
    });
  });