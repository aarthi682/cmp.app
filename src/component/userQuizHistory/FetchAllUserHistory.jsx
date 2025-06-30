import { useEffect, useState } from "react";
import { CmpService } from "../../service/CmpService";
import {
  Card,
  CardHeader,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const FetchAllUserHistory = () => {
  const [userHistories, setUserHistories] = useState([]);

  useEffect(() => {
    fetchAllUserHistory();
  }, []);

  const fetchAllUserHistory = async () => {
    try {
      const response = await CmpService.fetchAlluserHistory();
      setUserHistories(response.data);
    } catch (error) {
      alert("Something went wrong while fetching user history.");
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader title="User Quiz History" />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>historyId</TableCell>
                <TableCell sx={{ color: "white" }}>Question</TableCell>
                <TableCell sx={{ color: "white" }}>User Option</TableCell>
                <TableCell sx={{ color: "white" }}>Each Question Points</TableCell>
                <TableCell sx={{ color: "white" }}>Total Score</TableCell>
                <TableCell sx={{ color: "white" }}>Attempted Date</TableCell>
                <TableCell sx={{color:"white"}}>userId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userHistories.length > 0 ? (
                userHistories.map((uh, index) => (
                  <TableRow key={uh.historyId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{uh.responseContent?.question || "N/A"}</TableCell>
                    <TableCell>{uh.responseContent?.userOption?.toUpperCase()}</TableCell>
                    <TableCell>{uh.eachQuestionpoints}</TableCell>
                    <TableCell>{uh.totalScore}</TableCell>
                    <TableCell>{formatDate(uh.attemptedDate)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No history available.
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