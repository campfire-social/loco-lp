import '../css/main.css';

document.addEventListener('DOMContentLoaded', function () {

    function openNav() {
        document.getElementById("siteNav").classList.toggle("is-open");
      }

    document.getElementById("siteNavToggle").addEventListener("click", function() {
        openNav();
    });

    var navItems = document.querySelectorAll('.nav-link');
    for (var i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener("click", function (event) {
            event.preventDefault();
            if(document.getElementById("siteNav").classList.contains("is-open")){
                document.getElementById("siteNav").classList.remove("is-open");

            }
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    }



    const callback = function (entries) {
        entries.forEach((entry) => {
          console.log(entry);
      
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
          } else {
            entry.target.classList.remove("animate-fadeIn");
          }
        });
      };
      
      const observer = new IntersectionObserver(callback);
      
      const targets = document.querySelectorAll(".js-show-on-scroll");
      targets.forEach(function (target) {
        target.classList.add("opacity-0");
        observer.observe(target);
      });
      


    const lazyLoad = (targets, onIntersection) => {
        const observer = new IntersectionObserver((entries, self) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    onIntersection(entry.target);
                    self.unobserve(entry.target);
                }
            });
        });
        targets.forEach((target) => observer.observe(target));
    };

    const lazyPictures = document.querySelectorAll('.lazy-picture');
    lazyLoad(lazyPictures, (pictureElement) => {
        const img = pictureElement.querySelector('img');
        const sources = pictureElement.querySelectorAll('source');

        // Cleanup tasks after the image loads. Important to
        // define this handler before setting src/srcsets.
        img.onload = () => {
            pictureElement.classList.add('loaded');
            img.removeAttribute('data-src');
        };

        // Swap in the media sources
        sources.forEach((source) => {
            source.sizes = source.dataset.sizes;
            source.srcset = source.dataset.srcset;
            source.removeAttribute('data-srcset');
            source.removeAttribute('data-sizes');
        });

        // Swap in the image
        img.src = img.dataset.src;
    });


    var els = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < els.length; i++) {
        els[i].addEventListener("click", function (event) {
            event.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    var contactForm = document.querySelector('#newsLetterForm'),
        inputName = contactForm.querySelector('[name="emailAddress"]'),
        sendButton = contactForm.querySelector('#newsLetterFormSend'),
        formMsg = document.querySelector('#newsLetterFormStatus');

    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); // prevent the form to do the post.

        var xhr = new XMLHttpRequest();
        xhr.open('POST', contactForm.action, true);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onloadend = function (res) {
            if (res.target.status === 200) {
                contactForm.classList.add('hidden');
                formMsg.innerHTML = 'Thanks for signing up!';
            } else {
                formMsg.innerHTML = 'Oops! There was a problem getting you subscribed.';
            }
        }

        xhr.send("name=" + inputName.value);
    });


}, false);