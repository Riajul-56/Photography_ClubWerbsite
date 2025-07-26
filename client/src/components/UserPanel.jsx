import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserPanel = () => {
  const [data, setData] = useState({
    activityFeed: [],
    notifications: [],
    quickStats: {},
    upcomingEvents: [],
  });

  useEffect(() => {
    axios
      .get("/api/user/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const { activityFeed, notifications, quickStats, upcomingEvents } = data;

  return (
    <Container className="my-4">
      <h2 className="mb-4">User Dashboard</h2>

      {/* Quick Stats */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Quick Stats</CardTitle>
          <Row>
            <Col md="4">
              <strong>Photos:</strong> {quickStats.totalPhotos || 0}
            </Col>
            <Col md="4">
              <strong>Followers:</strong> {quickStats.followers || 0}
            </Col>
            <Col md="4">
              <strong>Achievements:</strong> {quickStats.achievements || 0}
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Activity Feed */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Activity Feed</CardTitle>
          <ListGroup>
            {activityFeed.length === 0 ? (
              <ListGroupItem>No recent activity</ListGroupItem>
            ) : (
              activityFeed.map((item, index) => (
                <ListGroupItem key={index}>{item.message}</ListGroupItem>
              ))
            )}
          </ListGroup>
        </CardBody>
      </Card>

      {/* Notifications */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Notifications</CardTitle>
          <ListGroup>
            {notifications.length === 0 ? (
              <ListGroupItem>No notifications</ListGroupItem>
            ) : (
              notifications.map((note, index) => (
                <ListGroupItem key={index}>{note.message}</ListGroupItem>
              ))
            )}
          </ListGroup>
        </CardBody>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Upcoming Event Reminders</CardTitle>
          <ListGroup>
            {upcomingEvents.length === 0 ? (
              <ListGroupItem>No upcoming events</ListGroupItem>
            ) : (
              upcomingEvents.map((event, index) => (
                <ListGroupItem key={index}>
                  {event.name}{" "}
                  <Badge color="info" className="ms-2">
                    {event.date}
                  </Badge>
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </CardBody>
      </Card>
    </Container>
  );
};

export default UserPanel;
