import React from 'react';
import { Modal, Form, Container, Button } from 'react-bootstrap';

class updateBooks extends React.Component {

  handleSubmit = (event) => {
    event.preventDefault();

    let bookToUpdate = {
      title: event.target.title.value || this.props.bookToUpdate.title,
      description: event.target.description.value || this.props.bookToUpdate.description,
      status: event.target.status.checked || this.props.bookToUpdate.status,
      _id: this.props.bookToUpdate._id,
      __v: this.props.bookToUpdate.__v
    };
    // console.log('UPDATED: ', catToUpdate);

    this.props.updatedBooks(bookToUpdate);
  };

  render() {
    return (
      <>
        <div className="Modal">
          <Modal
            show={this.props.updateModal}
            onHide={this.props.updateCloseModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <>
                <Container className="mt-5">
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" defaultValue={this.props.bookToUpdate.title}/>
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" defaultValue={this.props.bookToUpdate.description}/>
                    </Form.Group>
                    <Form.Group controlId="status">
                      <Form.Check type="checkbox" label="Read" defaultChecked={this.props.bookToUpdate.status}/>
                    </Form.Group>
                    <Button type="submit">Update Book</Button>
                  </Form>
                </Container>
              </>
            </Modal.Body>


          </Modal>
        </div >
      </>

    );
  }
}

export default updateBooks;
