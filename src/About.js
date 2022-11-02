import { Component } from "react";
import {Card} from 'react-bootstrap';
import JonathanImage from './jonathan.jpg';
import JordanImage from './jordan.jpg';

class Profile extends Component {

  render() {
    /* TODO: render information about the developers */
    return (
      <>
        <main>
          <Card style={{ width: '18rem' }}>
            <Card.Img class='jonny' src={JonathanImage} a href=""/>
            <Card.Body>
              <Card.Title>Jonathan Staib</Card.Title>
              <Card.Text>Hello</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img class='jordan' src={JordanImage} a href="https://github.com/nawktopus" />
            <Card.Body>
              <Card.Title>Jordan Kwan</Card.Title>
              <Card.Text>Hello</Card.Text>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Img class='jordan' src={JordanImage} a href="https://github.com/nawktopus" />
            <Card.Body>
              <Card.Title>Jordan Kwan</Card.Title>
              <Card.Text>Hello</Card.Text>
            </Card.Body>
          </Card>
        </main>
      </>
    );
  }
}

export default Profile;
