import { useState, useEffect, JSX } from 'react';
import { fetchUsers, groupByDepartment, DepartmentGroupSummary } from './services/userService';
import { Card, Row, Col, Typography, Divider, Tag, Table } from 'antd';
import './App.css';

const { Title, Text } = Typography;

function App(): JSX.Element {
  const [departmentGroups, setDepartmentGroups] = useState<DepartmentGroupSummary>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        const grouped = groupByDepartment(users);
        setDepartmentGroups(grouped);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <div className="loading-container">Loading...</div>;
  if (error) return <div className="error-container">Error: {error}</div>;

  return (
    <div className="container">
      <Title level={1} className="main-title">Department Summary</Title>
      <Row gutter={[24, 24]}>
        {Object.entries(departmentGroups).map(([department, summary]) => (
          <Col key={department} xs={24} lg={12} xl={8}>
            <Card
              title={<Title level={3}>{department}</Title>}
              className="department-card"
              bordered={false}
            >
              <div className="summary-section">
                <Text strong>Gender Distribution</Text>
                <div className="gender-tags">
                  <Tag color="blue">Male: {summary.male}</Tag>
                  <Tag color="pink">Female: {summary.female}</Tag>
                </div>
              </div>

              <Divider />

              <div className="summary-section">
                <Text strong>Age Range</Text>
                <Tag color="cyan">{summary.ageRange}</Tag>
              </div>

              <Divider />

              <div className="summary-section">
                <Text strong>Hair Colors</Text>
                <div className="hair-colors">
                  {Object.entries(summary.hair).map(([color, count]) => (
                    // <Tag key={color} color="primary">{color}: {count}</Tag>
                    <Tag key={color} color={color} rootClassName={`${["White", "Blonde"].includes(color) ? "text-color-black" : ""}`}>{color}: {count}</Tag>
                  ))}
                </div>
              </div>

              <Divider />

              <div className="summary-section">
                <Text strong>Employee Addresses</Text>
                <Table
                  dataSource={Object.entries(summary.addressUser).map(([name, code]) => ({
                    key: name,
                    name,
                    code
                  }))}
                  columns={[
                    { title: 'Name', dataIndex: 'name', key: 'name' },
                    { title: 'Postal Code', dataIndex: 'code', key: 'code' }
                  ]}
                  size="small"
                  pagination={false}
                />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;