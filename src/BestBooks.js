import React from 'react';
import axios from 'axios';
import { Carousel, Container, Button } from 'react-bootstrap';
import BookModal from './BookModal.js';
import UpdateModal from './UpdateModal.js';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      openModal: false,
      updateModal: false,
      bookToUpdate: null
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
  };

  handleBookSubmit = (event) => {
    event.preventDefault();
    let newBook = {
      title: event.target.title.value,
      // author: event.target.aurthor.value,
      description: event.target.description.value,
      status: event.target.status.checked
    };
    this.setState({
      openModal: false
    });
    this.postBook(newBook);
  };

  postBook = async (newBookObj) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books`;

      let createdBook = await axios.post(url, newBookObj);

      this.setState({
        books: [...this.state.books, createdBook.data]
      });

    } catch (error) {
      console.log(error.message);
    }
  };

  deleteBooks = async (id) => {
    try {
      console.log(id);
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;

      await axios.delete(url);

      let updatedBooks = this.state.books.filter(book => book._id !== id);

      this.setState({
        books: updatedBooks
      });

    } catch (error) {
      console.log(error.message);
    }
  };

  updatedBooks = async (bookToUpdate) => {
    try {
      console.log(bookToUpdate);
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBooks = await axios.put(url, bookToUpdate);

      let updatedBooksArray = this.state.books.map(existingBook => {
        return existingBook._id === bookToUpdate._id
          ? updatedBooks.data
          : existingBook;
      });

      this.setState({
        books: updatedBooksArray
      });

    } catch (error) {
      console.log(error.message);
    }
  };

  componentDidMount() {
    this.getBooks();
  }

  handleCloseModal = () => {
    this.setState({
      openModal: false,
    });
  };

  handleOpenModal = () => {
    this.setState({
      openModal: true,
    });
  };

  updateCloseModal = () => {
    this.setState({
      updateModal: false,
    });
  };

  updateOpenModal = (book) => {
    this.setState({
      updateModal: true,
      bookToUpdate: book
    });

  };

  render() {

    let carouselItems = this.state.books.map((books, index) => (
      <Carousel.Item key={index}>
        <h1>Title: {books.title}</h1>
        <p>Info: {books.description}</p>
        <p>{books.status}</p>
        <Carousel.Caption>
        </Carousel.Caption>
        <Button className="x" variant="dark" onClick={() => { this.deleteBooks(books._id); }}>Delete</Button>
        <Button onClick={()=> this.updateOpenModal (books)}>Update Book</Button>
      </Carousel.Item>
    ));

    return (
      <>
        <h1>Books!</h1>
        {
          this.state.books.length > 0 ?
            <>
              <Container bg="dark" >
                <Carousel bg="dark" variant="dark">
                  {carouselItems}
                </Carousel>
              </Container>


            </>

            :
            <p>Book Collection is Empty</p>
        }
        <Button onClick={this.handleOpenModal}>Add Book</Button>
        <BookModal
          openModal={this.state.openModal}
          handleCloseModal={this.handleCloseModal}
          handleBookSubmit={this.handleBookSubmit}
        />
        { this.state.bookToUpdate &&
        <UpdateModal
          updateModal={this.state.updateModal}
          updateCloseModal={this.updateCloseModal}
          updatedBooks={this.updatedBooks}
          bookToUpdate={this.state.bookToUpdate}
          books={this.state.books}
        />
        }
      </>
    );
  }
}

// {/* // <>
//   <header>
//     <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
//   </header>
//   <main>
//     { */}
// {/* //       this.state.books.length > 0 &&
//       <>
//         {books}
//       </>
//     }
//   </main> */}
// {/* // </> */}

export default BestBooks;
