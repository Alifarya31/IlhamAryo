document.addEventListener("DOMContentLoaded", () => {
  // typing text hero - handled by language.js for multi-language support

  // auto hide navbar click
  $(".click-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // automatic transparent navbar
  const navBar = document.getElementsByTagName("nav")[0];
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1) {
      navBar.classList.replace("bg-transparent", "navbar-color");
    } else if (window.scrollY <= 0) {
      navBar.classList.replace("navbar-color", "bg-transparent");
    }
  });

  // fetchData API
  async function fetchData(type = "certification") {
    try {
      let response;
      if (type === "certification") {
        response = await fetch("certification/certification.json");
      } else {
        response = await fetch("project/project.json");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(`No ${type} data found. This is normal if you haven't added any ${type} yet.`);
      return [];
    }
  }

  function showCertification(certification) {
    const certificationContainer = document.querySelector(
      ".certification .content"
    );
    if (!certificationContainer) return;
    if (!certification || certification.length === 0) return;

    let certificationHTML = "";
    certification.forEach((cert) => {
      certificationHTML += `
        <div class="box" data-aos="fade-down">
            <img draggable="false" src="${cert.image}" alt="certification"/>
            <div class="desc">
                <h3>${cert.name}</h3>
                <p>By <span>${cert.by}</span></p>
                <div class="credentials">
                    <a class="btn" target="_blank" href="${cert.links.credentials}">
                        view credentials <i class="fas fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>`;
    });
    certificationContainer.innerHTML = certificationHTML;
  }

  function showProject(project) {
    const projectContainer = document.querySelector(".project .content");
    if (!projectContainer) return;
    if (!project || project.length === 0) return;

    let projectHTML = "";
    project.slice(0, 90).forEach((proj) => {
      projectHTML += `
        <div class="cards">
          <img draggable="false" src="${proj.image}" alt=""/>
          <div class="desc-content d-flex flex-column text-justify">
            <div class="tag">
              <h3>${proj.title}</h3>
              <h5>${proj.tech}</h5>
            </div>
            <div class="desc">
              <p>${proj.desc}</p>
              <div class="btns">
                <a href="${proj.links.demo}" class="btn" target="_blank">
                  <i class="fas fa-eye"></i> Demo
                </a>
                <a href="${proj.links.code}" class="btn" target="_blank">
                  <i class="fas fa-code"></i> Code
                </a>
              </div>
            </div>
          </div>
        </div>`;
    });
    projectContainer.innerHTML = projectHTML;
  }

  // Fetch certification & project data (only if sections exist)
  if (document.querySelector(".certification .content")) {
    fetchData("certification").then((data) => showCertification(data));
  }
  if (document.querySelector(".project .content")) {
    fetchData("project").then((data) => showProject(data));
  }

  // loadmore button
  const loadmore = document.querySelector(".loadmore-btn");
  if (loadmore) {
    let currentItems = 3;
    loadmore.addEventListener("click", () => {
      const elementList = [
        ...document.querySelectorAll(".certification .content .box"),
      ];

      for (let i = currentItems; i < currentItems + 3; i++) {
        if (elementList[i]) {
          elementList[i].classList.add("d-block");
        }
      }
      currentItems += 3;

      if (currentItems >= elementList.length) {
        loadmore.classList.add("d-none");
      }
    });
  }

  // animate on scroll (AOS)
  AOS.init();

  // disable inspect element or dev mode
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  document.onkeydown = function (e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == "I".charCodeAt(0)) return false;
  };

  // Custom Manual Scrollspy
  const updateNavbarActiveState = () => {
      const sections = document.querySelectorAll('section[id]');
      const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
      const navbarElement = document.querySelector('.navbar');
      const navbarHeight = navbarElement ? navbarElement.offsetHeight : 0; // Handle case where navbar might not exist

      let currentSectionId = '';

      // Find the current section in view
      sections.forEach(section => {
          const sectionTop = section.offsetTop - navbarHeight;
          const sectionHeight = section.offsetHeight;
          // Use a small offset for better detection when section is just entering view
          if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight) {
              currentSectionId = section.getAttribute('id');
          }
      });

      // Update nav links
      navLinks.forEach(link => {
          link.classList.remove('active');
          // Check if the link's href matches the current section's id, but ignore the blog link which is not a section on this page
          if (link.getAttribute('href') === `#${currentSectionId}` && !link.href.includes('blog.html')) {
              link.classList.add('active');
          }
      });

      // Special case for when scroll is at the very top or no section is active
      if (currentSectionId === '' || window.scrollY === 0 || (sections.length > 0 && window.scrollY < sections[0].offsetTop - navbarHeight)) {
        navLinks.forEach(link => link.classList.remove('active'));
        const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
      }
  };

  // Listen for scroll events
  window.addEventListener('scroll', updateNavbarActiveState);

  // Trigger the function on page load to set initial active state
  window.addEventListener('load', updateNavbarActiveState);

  // scroll reveal animation content
  const srtop = ScrollReveal({
    origin: "top",
    distance: "90px",
    duration: 1000,
    reset: true,
  });

  srtop.reveal(".home .content .intro h3", { delay: 300 });
  srtop.reveal(".home .content .intro p", { delay: 300 });
  srtop.reveal(".home .content .intro a", { delay: 400 });

  srtop.reveal(".home .image", { delay: 600 });
  srtop.reveal(".home .linkedin", { interval: 600 });
  srtop.reveal(".home .github", { interval: 600 });
  srtop.reveal(".home .instagram", { interval: 600 });

  srtop.reveal(".about .cv-btn", { delay: 200 });
});
