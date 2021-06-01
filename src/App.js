import React, { Component } from 'react';
import Searcher from './components/Searcher';
import ImagesList from './components/ImagesList';
class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      images: [],
      page: '',
      totalPages: '',
      totalImages: '',
      currentImage: '',
      hasError: false,
      errorMsg: '',
      show: true,
      next: true
    }
  }

  getDataFromApi = () => {
    const URL = `https://pixabay.com/api/?key=21853978-45d97b56662244e0ddd1d84da&q=${this.state.input}&per_page=28&page=${this.state.page}`;
    fetch(URL)
      .then((data) => data.json())
      .then((result) => this.setState({
        images: result.hits,
        totalPages: Math.ceil(result.totalHits / 28),
        totalImages: result.totalHits,
        show: true,
      }));
  }

  componentDidMount() {
    console.log("Component Mount");
    this.setState({
      input: 'Videogames',
      page: 1,
      currentImage: 1
    }, () => {
      this.getDataFromApi();
    })
  }

  componentDidUpdate() {
    console.log("Component DidUpdate");
    this.scroll();
  }

  componentDidCatch(error, errorInfo) {
    console.log("Component Catch");
    this.setState({ hasError: true, errorMsg: error.toString() });
  }

  searchData = (input) => {
    this.setState({
      input: input,
      page: 1,
      show: false,
    }, () => {
      this.setState({ currentImage: 1 })
      this.getDataFromApi();
    })
  }

  previousPage = () => {
    let page = this.state.page;
    if (page === 1) return null;
    page -= 1;
    this.setState({ page, show: false, next: false }, () => {
      this.getDataFromApi();
    });
  }

  nextPage = () => {
    let page = this.state.page;
    page += 1;
    this.setState({ page, show: false, next: true }, () => {
      this.getDataFromApi();
    });
  }

  scroll = () => {
    if (!this.state.hasError) {
      const element = document.querySelector('.container');
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
  }

  updateImages = () => {
      if (this.state.next) {
        this.setState({ currentImage: this.state.currentImage + this.state.images.length });
        console.log(this.state.currentImage);
      }
      else {
        this.setState({ currentImage: this.state.currentImage - this.state.images.length })
      };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='text-center'>
          <p>{this.state.errorMsg}</p>
          <button onClick={() => this.setState({ hasError: false })}>Back to website</button>
        </div>
      );
    }

    return (
      <div className="app container">
        <div>
          <p className="lead text-center"> Images Searcher</p>
          <Searcher
            searchData={this.searchData} />
        </div>
        <div className="row justify-content-center">
          {this.state.show ? <ImagesList
            totalPages={this.state.totalPages}
            totalImages={this.state.totalImages}
            currentImage={this.state.currentImage}
            page={this.state.page}
            images={this.state.images}
            previousPage={this.previousPage}
            nextPage={this.nextPage}
            updateImages={this.updateImages} /> : null}
        </div>
      </div>
    )
  }
}

export default App;
