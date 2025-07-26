import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    recentUploads: [],
    notifications: [],
    stats: {},
    upcomingEvents: [],
  });

  useEffect(() => {
    axios
      .get("/api/user/dashboard")
      .then((res) => setDashboardData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const { recentUploads, notifications, stats, upcomingEvents } = dashboardData;

  return (
    <Container className="my-4">
      <h2 className="mb-4">User Dashboard</h2>

      {/* Quick Stats */}
      <Row className="mb-4">
        <Col md="4">
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h5">Photos</CardTitle>
              <CardText>{stats.photos || 0}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h5">Followers</CardTitle>
              <CardText>{stats.followers || 0}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col md="4">
          <Card className="text-center">
            <CardBody>
              <CardTitle tag="h5">Achievements</CardTitle>
              <CardText>{stats.achievements || 0}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Notifications */}
      <h4>Notifications</h4>
      <ul className="list-group mb-4">
        {notifications.map((note, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {note.message}
            <Badge pill color="info">
              {note.date}
            </Badge>
          </li>
        ))}
      </ul>

      {/* Activity Feed */}
      <h4>Recent Activity</h4>
      <Row className="mb-4">
        {recentUploads.map((upload, i) => (
          <Col md="4" key={i} className="mb-3">
            <Card>
              <img
                src={`/${upload.photo_url}`}
                className="card-img-top"
                alt="upload"
              />
              <CardBody>
                <CardTitle tag="h5">{upload.title}</CardTitle>
                <CardText>{upload.description}</CardText>
                <CardText>
                  <small className="text-muted">
                    Likes: {upload.likes} | Comments: {upload.comments_count}
                  </small>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Event Reminders */}
      <h4>Upcoming Events</h4>
      <ul className="list-group">
        {upcomingEvents.map((event, i) => (
          <li key={i} className="list-group-item">
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default UserDashboard;
