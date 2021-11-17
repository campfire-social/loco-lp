import '../css/main.css';


document.addEventListener('DOMContentLoaded', function () {
    
    document.querySelectorAll('a[href^="#"]').addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({ behavior: "smooth" });
      });

  }, false);


