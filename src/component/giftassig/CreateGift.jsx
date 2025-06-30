import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { CmpService } from "../../service/CmpService";

export const CreateGift = () => {
  const [UserGiftAssignedDto, setForm] = useState({
    historyId: "",
    rewardId: "",
  });

  const [userHistories, setUserHistories] = useState([]);
  const [fetchAllreward, setFetchAllReward] = useState([]);

  useEffect(() => {
    const fetchUserHistories = async () => {
      try {
        const response = await CmpService.UserGiftHistorytop10();
        setUserHistories(response.data);
      } catch (error) {
        console.error("Failed to fetch user histories:", error);
      }
    };

    fetchUserHistories();
  }, []);

  useEffect(() => {
    const fetchAllReward = async () => {
      try {
        const response = await CmpService.fetchallReward();
        setFetchAllReward(response.data);
      } catch (error) {
        alert("Something went wrong while fetching rewards.");
      }
    };

    fetchAllReward();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CmpService.createAssigned(UserGiftAssignedDto);
      alert("Gift assigned successfully!");
      setForm({ historyId: "", rewardId: "" });
    } catch (error) {
      console.error("Error assigning gift:", error);
      alert("Something went wrong while assigning the gift.");
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card>
            <Card.Header >
              Create Gift Assignment
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
               
                <Form.Group className="mb-3" controlId="historyId">
                  <Form.Label>Select History</Form.Label>
                  <Form.Select
                    name="historyId"
                    value={UserGiftAssignedDto.historyId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    {userHistories.map((history) => (
                      <option
                        key={history.historyId}
                        value={history.historyId}
                      >
                        {`ID: ${history.historyId} | Score: ${history.totalScore ?? "N/A"}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="rewardId">
                  <Form.Label>Select Reward</Form.Label>
                  <Form.Select
                    name="rewardId"
                    value={UserGiftAssignedDto.rewardId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Select --</option>
                    {fetchAllreward.map((reward) => (
                      <option
                        key={reward.rewardId}
                        value={reward.rewardId}
                      >
                        {`Id: ${reward.rewardId} | Reward: ${reward.name} | RewardType: ${reward.rewardType?.name ?? "N/A"}`}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
