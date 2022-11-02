import React from 'react';
import { Modal, Form, Container, Button } from 'react-bootstrap';

class ModalBuilder extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <Modal
            show={this.props.openModal}
            onHide={this.props.handleCloseModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <>
                <Container className="mt-5">
                  <Form onSubmit={this.props.handleBookSubmit}>
                    <Form.Group controlId="title">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group controlId="status">
                      <Form.Check type="checkbox" label="Read" />
                    </Form.Group>
                    <Button type="submit">Add Book</Button>
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

export default ModalBuilder;
