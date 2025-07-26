import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  Badge,
} from "reactstrap";
import axios from "axios";

const AdminPanel = () => {
  const [data, setData] = useState({
    systemHealth: {},
    activityMetrics: {},
    recentRegistrations: [],
    contentQueue: [],
    keyPerformanceIndicators: {},
  });

  useEffect(() => {
    axios
      .get("/api/admin/dashboard")
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  const {
    systemHealth,
    activityMetrics,
    recentRegistrations,
    contentQueue,
    keyPerformanceIndicators,
  } = data;

  return (
    <Container className="my-4">
      <h2 className="mb-4">Admin Dashboard Overview</h2>

      {/* System Health Monitoring */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">System Health Monitoring</CardTitle>
          <Row>
            <Col md="3">
              <strong>CPU Usage:</strong> {systemHealth.cpuUsage || "--"}
            </Col>
            <Col md="3">
              <strong>Memory Usage:</strong> {systemHealth.memoryUsage || "--"}
            </Col>
            <Col md="3">
              <strong>Disk Space:</strong> {systemHealth.diskSpace || "--"}
            </Col>
            <Col md="3">
              <strong>Uptime:</strong> {systemHealth.uptime || "--"}
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Real-time Activity Metrics */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Real-time Activity Metrics</CardTitle>
          <Row>
            <Col md="4">
              <strong>Active Users:</strong> {activityMetrics.activeUsers || 0}
            </Col>
            <Col md="4">
              <strong>Uploads Last Hour:</strong>{" "}
              {activityMetrics.uploadsLastHour || 0}
            </Col>
            <Col md="4">
              <strong>Comments Last Hour:</strong>{" "}
              {activityMetrics.commentsLastHour || 0}
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* Recent User Registrations */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Recent User Registrations</CardTitle>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody>
              {recentRegistrations.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No recent registrations
                  </td>
                </tr>
              ) : (
                recentRegistrations.map((user, i) => (
                  <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.registeredAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBody>
      </Card>

      {/* Content Submission Queue */}
      <Card className="mb-4">
        <CardBody>
          <CardTitle tag="h5">Content Submission Queue</CardTitle>
          <ul className="list-group">
            {contentQueue.length === 0 ? (
              <li className="list-group-item">No pending submissions</li>
            ) : (
              contentQueue.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {item.title}
                  <Badge
                    color={
                      item.status === "Pending"
                        ? "warning"
                        : item.status === "Approved"
                        ? "success"
                        : "danger"
                    }
                  >
                    {item.status}
                  </Badge>
                </li>
              ))
            )}
          </ul>
        </CardBody>
      </Card>

      {/* Key Performance Indicators */}
      <Card>
        <CardBody>
          <CardTitle tag="h5">Key Performance Indicators</CardTitle>
          <Row>
            <Col md="3">
              <strong>Total Users:</strong>{" "}
              {keyPerformanceIndicators.totalUsers || 0}
            </Col>
            <Col md="3">
              <strong>Total Photos:</strong>{" "}
              {keyPerformanceIndicators.totalPhotos || 0}
            </Col>
            <Col md="3">
              <strong>Avg Likes / Photo:</strong>{" "}
              {keyPerformanceIndicators.averageLikesPerPhoto || 0}
            </Col>
            <Col md="3">
              <strong>Revenue This Month:</strong>{" "}
              {keyPerformanceIndicators.revenueThisMonth || "$0"}
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default AdminPanel;
