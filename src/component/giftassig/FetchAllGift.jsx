// src/components/yourComponentFolder/FetchAllReward.jsx
import { useEffect, useState } from "react";
import { CmpService } from "../../service/CmpService";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const FetchAllGift = () => {
  const [rewardList, setRewardList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadAllRewards();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const loadAllRewards = async () => {
    try {
      const response = await CmpService.fetchAllAssigned();
      setRewardList(response.data);
      console.log(response)
    } catch (error) {
      console.error("Error fetching rewards:", error);
      alert("Failed to fetch rewards");
    }
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="All Rewards Assigned"
        action={
          <Button variant="contained" color="primary" onClick={() => navigate("/creatAssigned")}>
            Add Reward
          </Button>
        }
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>AssignedID</TableCell>
                <TableCell sx={{ color: "white" }}>AssignedDate</TableCell>
                <TableCell sx={{ color: "white" }}>HistoryID</TableCell>
                <TableCell sx={{ color: "white" }}>RewardID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardList.length > 0 ? (
                rewardList.map((reward) => (
                  <TableRow
                    key={reward.giftAssignedId}
                    hover
                    sx={{ "&:hover": { backgroundColor: "rgba(190, 50, 157, 0.1)" } }}
                  >
                    <TableCell>{reward.giftAssignedId}</TableCell>
                    <TableCell>{formatDate(reward.assigned)}</TableCell>
                    <TableCell>{reward.historyId || "N/A"}</TableCell>
                    <TableCell>{reward.rewardId || "N/A"}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No rewards found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};
