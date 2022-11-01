import React from 'react';
import axios from 'axios';
import {Carousel, Container,} from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }
  /* TODO: Make a GET request to your API to fetch all the books from the database  */

  getBooks = async () => {
    try {
      let bookData = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: bookData.data
      });

    } catch (error) {
      console.log('we have an error: ', error.response);
    }
  }

  handleBookSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.name.value,
      // author: event.target.aurthor.value,
      description: event.target.description.value,
      status: event.target.status.checked
    }
  }

  postBook = async (newBookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;

      let createdBook = await axios.post(url, newBookObj);

      this.setState({
        books: [...this.state.books, createdBook.data]
      })

    } catch (error) {
      console.log(error.message)
    }
  }

  deleteBooks = async (id) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      });

    } catch (error) {
      console.log(error.message);
    }
  }

  componentDidMount() {
    this.getBooks();
  }


  render() {

    let carouselItems = this.state.books.map((book, index) => (
      <Carousel.Item key={index}>
        <h1>Name: {book.title}</h1>
        <p>Info: {book.description}</p>
        <p>Status: {book.status}</p>
        <Carousel.Caption>
        </Carousel.Caption>
      </Carousel.Item>
    ));


    return (

    // <>
    //   <header>
    //     <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
    //   </header>
    //   <main>
    //     {
    //       this.state.books.length > 0 &&
    //       <>
    //         {books}
    //       </>
    //     }
    //   </main>
    // </>

      this.state.books.length > 0 ? (

        <>
          <h1>Books!</h1>
          <Container>

          </Container>
          {
            this.state.books.length > 0 &&
            <>
              <Container bg="dark" >
                <Carousel bg="dark" variant="dark" showControls showIndicators>
                  {carouselItems}
                </Carousel>
              </Container>
            </>
          }
        </>
      )
        :
        (<p>Book Collection is Empty</p>)


    );
  }
}

export default BestBooks;
