const app = {
  init() {
    this.currentSlide = 0;
    this.cacheDOMElements();
    this.cacheDOMEvents();
  },
  cacheDOMElements() {
    this.$btnNext = document.getElementById('next');
    this.$btnPrevious = document.getElementById('previous');
    this.$beastWrapper = document.getElementById('app');
  },
  cacheDOMEvents() {
    this.$btnNext.addEventListener('click', (e) => {
      let slide;
      slide = this.currentSlide + 1;
      if(slide == 5) slide = 1;
    
      this.goToSlide(slide);
      this.saveToHistory(slide);
    });
    this.$btnPrevious.addEventListener('click', (e) => {
      let slide;
  
      slide = this.currentSlide - 1;
      if(slide == 0) slide = 4;
    
      this.goToSlide(slide);
      this.saveToHistory(slide);
    });
  },
  goToSlide(slide) {
    fetch('./beasts/' + slide + '.html')
      .then(response => response.text())
      .then(data => {
        this.$beastWrapper.innerHTML = data;
      })
  
      this.currentSlide = slide;
  },
  saveToHistory(slide) {
    history.pushState({
      slideNumber: slide
    }, 
    'Beast ' + slide, 
    '?beast=' + slide);
    document.title = 'Beast ' + slide;
  }
}

app.init();

// refresh? èn op een slide aanwezig?.
window.onload = function() {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("beast")) {
    const slideParam = parseInt(urlParams.get("beast"));
    app.goToSlide(slideParam);
  }
}

window.onpopstate = function(e) {
  const state = e.state;
  app.goToSlide(state.slideNumber);
} 