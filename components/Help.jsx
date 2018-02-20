import React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { Container, Row, Col } from 'react-grid-system';

const Help = () => {
  return (
    <Card>
      <CardText>
        <Container>
          <h1>Help</h1>
          <h3>Home page</h3>
          <Row>
            <Col>
              <img src="/img/home.png" width="100%" alt="Screenshot of the Home page" />
            </Col>
            <Col>
            On the home page here you can see information about ALL assets. The map provided by Google Maps has all the
            assets plotted at their relative locations.
              <br />
              <br />
            To select an asset find it in the table below and click on it. This will take you to that assets page in which
            you are able to see the relevent data for that asset.
            </Col>
          </Row>
        </Container>
      </CardText>
    </Card>
  );
};

export default Help;
