import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CmpService } from "../../service/CmpService";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Stack,
  Card,
  CardContent,
  CardHeader,
  Box,
} from "@mui/material";

export const FetchAllreward = () => {
  const [rewardAll, setRewardAll] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const response = await CmpService.fetchallReward();
      setRewardAll(response.data || []);
    } catch (error) {
      console.error("Error fetching rewards", error);
    }
  };

  const handleDelete = async (rewardId) => {
    if (!window.confirm("Are you sure you want to delete this reward?")) return;

    try {
      const response = await CmpService.deleteByIdReward(rewardId);
      console.log("Delete response:", response.data);

      const status = response.data?.Status || response.data?.status;
      if (status?.toLowerCase() === "success") {
        alert("Reward deleted successfully");
        fetchAll(); // Refresh list
      } else {
        alert("Failed to delete reward. Server responded with status: " + status);
      }
    } catch (error) {
      console.error("Error deleting reward", error);
      alert("Something went wrong while deleting the reward");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr || isNaN(new Date(dateStr))) return "Not updated";
    const date = new Date(dateStr);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const parseRewardType = (rewardType = "") => {
    if (typeof rewardType === "string") {
      const url = rewardType.split(" | ")[0];
      const project = rewardType.includes("Project:")
        ? rewardType.split("Project:")[1]?.split("|")[0]?.trim()
        : "";
      const desc = rewardType.includes("Description:")
        ? rewardType.split("Description:")[1]?.trim()
        : "";
      return { url, name: project, desc };
    } else if (typeof rewardType === "object" && rewardType !== null) {
      return {
        url: rewardType?.url ?? "",
        name: rewardType?.name ?? rewardType?.project ?? "N/A",
        desc: rewardType?.description ?? rewardType?.desc ?? "N/A",
      };
    }
    return { url: "", name: "N/A", desc: "N/A" };
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="All Rewards"
        action={
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/createReward")}
          >
            Add Reward
          </Button>
        }
        sx={{ paddingBottom: 0 }}
      />
      <CardContent>
        <TableContainer component={Paper} elevation={1}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>Reward ID</TableCell>
                <TableCell sx={{ color: "white" }}>Reward Type</TableCell>
                <TableCell sx={{ color: "white" }}>Created At</TableCell>
                <TableCell sx={{ color: "white" }}>Updated At</TableCell>
                <TableCell sx={{ color: "white" }}>Created By</TableCell>
                <TableCell sx={{ color: "white" }}>Updated By</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardAll.length > 0 ? (
                rewardAll.map((reward) => {
                  const { url, name, desc } = parseRewardType(reward.rewardType);
                  return (
                    <TableRow
                      key={reward.rewardId}
                      hover
                      sx={{
                        transition: "background-color 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(190, 50, 157, 0.1)",
                          cursor: "pointer",
                        },
                      }}
                    >
                      <TableCell>{reward.rewardId}</TableCell>
                      <TableCell>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <div>
                            <strong>URL:</strong>{" "}
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#1976d2", textDecoration: "none" }}
                            >
                              {url}
                            </a>
                          </div>
                          <div>
                            <strong>Name:</strong> {name}
                          </div>
                          <div>
                            <strong>Description:</strong> {desc}
                          </div>
                        </Box>
                      </TableCell>
                      <TableCell>{formatDate(reward.createdAt)}</TableCell>
                      <TableCell>{formatDate(reward.updatedAt)}</TableCell>
                      <TableCell>{reward.createdBy ?? "N/A"}</TableCell>
                      <TableCell>{reward.updatedBy ?? "N/A"}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <Button
                            variant="outlined"
                            color="warning"
                            size="small"
                            onClick={() => navigate(`/updateReward/${reward.rewardId}`)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => handleDelete(reward.rewardId)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
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
