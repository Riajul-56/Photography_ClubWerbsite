import React, { useState, useEffect } from "react";
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
import AdminFrom from "./AdminForm"; // Ensure this path is correct

const AdminPanel = () => {
  const [data, setData] = useState({
    systemHealth: {},
    activityMetrics: {},
    recentRegistrations: [],
    contentQueue: [],
    keyPerformanceIndicators: {},
  });

  useEffect(() => {
    // Fetch the dashboard data on component mount
    axios
      .get("/api/admin/dashboard")
      .then((res) => setData(res.data)) // Set state with the response data
      .catch((err) => console.error(err)); // Handle error
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

      {/* Add Admin Form */}
      <AdminFrom />

      {/* Other dashboard components */}
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

      {/* Additional dashboard sections like activity metrics */}
    </Container>
  );
};

export default AdminPanel;
