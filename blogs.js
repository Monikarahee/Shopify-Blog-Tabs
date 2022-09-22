const blogsApp = {
  init() {
    this.container = document.querySelector('.blogs-tabs');
    if (!this.container) return;
    
    this.blog = 'all-blogs';
    
    this.tabButtons = this.container.querySelectorAll('.btn--tab');
    
    this.articles = [...this.container.querySelectorAll('.article')];
    
    this.cardsWrap = this.container.querySelector('.art-cards');
    
    this.notFoundMsgWrap = this.container.querySelector('#not-found-msg-wrap');
    
    this.sortArticles();
    
    this.setupEventListeners();
  },
  
  setupEventListeners() {
    this.tabButtons.forEach(btn => btn.onclick = this.handleTabButtonClick.bind(this));
  },
  
  sortArticles() {
    const sortedArticles = this.articles.sort((a, b) => {
      return this.getTimestamp(b.dataset.published) - this.getTimestamp(a.dataset.published);
    });
    
    this.cardsWrap.innerHTML = '';
    sortedArticles.forEach(article => {
   	  this.cardsWrap.appendChild(article);
    } );
    
    
  },
  
  getTimestamp(dateString) {
    return new Date(dateString).getTime();
  },
  
  handleTabButtonClick({ target }) {
  	const tabButton = target;
    this.blog = tabButton.dataset.blog;
//     this.relatedArticles = ;
    this.render();
  },
  
  render() {
    
    
    
   
    this.tabButtons.forEach(btn => {
      if (btn.dataset.blog === this.blog){
        btn.classList.add('is-active'); 
      } else if (btn.classList.contains('is-active')) {
        btn.classList.remove('is-active'); 
      }
    })
    
    
    if (this.blog === 'all-blogs'){
       this.notFoundMsgWrap.classList.remove('display-block');
      this.articles.forEach(article => {
        if (article.classList.contains('display-none')){
          article.classList.remove('display-none');
        }
      })
    } else {
      this.articles.forEach(article => {
        
        if (article.dataset.blog !== this.blog ){
           article.classList.add('display-none'); 
        } else {
           article.classList.remove('display-none'); 
        }
        
        
      });
      
      const articlesCount = document.querySelectorAll(".blogs-wrap .article:not(.display-none)").length;
       console.log(articlesCount);
        if (articlesCount === 0){
          this.notFoundMsgWrap.classList.add('display-block');
        } else {
           this.notFoundMsgWrap.classList.remove('display-block');
        }
    }
    
  }
}

blogsApp.init();