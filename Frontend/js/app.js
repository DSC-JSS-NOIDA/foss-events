

particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 7,
        "density": {
          "enable": true,
          "value_area": 100 /*change*/
        }
      },
      "color": {
        "value": ["#ffffff","#c1a1d3","#312c51","#adeecf","#ef4f4f","#ffd66b"]
      },
      "shape": {
          "type": ["circle"], /*change*/
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
          "random": true, /*change*/
        "anim": {
            "enable": true, /*change*/
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
          "value": 15, /*change*/
        "random": true,
        "anim": {
          "enable": false,
            "speed": 70, /*change*/
            "size_min": 10, /*change*/
          "sync": false
        }
      },
      "line_linked": {
          "enable": false, /*change*/
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
          "speed": 2, /*change*/
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
            "enable": false, /*change*/
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);