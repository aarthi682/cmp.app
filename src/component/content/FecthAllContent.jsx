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
import { Stack } from "react-bootstrap";

export const FetchAllContent = () => {
  const [contentFetchALL, setContent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllConetnt();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not updated";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    return `${day}-${month}-${year}`;
  };

  const fetchAllConetnt = async () => {
    try {
      const response = await CmpService.fetchAllContent();
      console.log(response);
      setContent(response.data);
    } catch (error) {
      alert("fetchAll error: no response");
    }
  };

  const handleDelete = async (contentId) => {
    if (!window.confirm("Are you sure you want to delete this content?")) return;
    try {
      await CmpService.deleteContent(contentId);
      alert("Content deleted successfully");
      fetchAllConetnt();
    } catch (error) {
      console.error("Error deleting content", error);
      alert("Something went wrong while deleting the content");
    }
  };

  return (
    <Card sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>
      <CardHeader
        title="All Content"
        action={
          <Button variant="contained" color="primary" onClick={() => navigate("/createConetnt")}>
            Add Content
          </Button>
        }
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white" }}>ContentID</TableCell>
                <TableCell sx={{ color: "white" }}>Content</TableCell>
                <TableCell sx={{ color: "white" }}>CreatedDate</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedDate</TableCell>
                <TableCell sx={{ color: "white" }}>CreatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>UpdatedBy</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentFetchALL.length > 0 ? (
                contentFetchALL.map((content, index) => (
                  <TableRow key={content.contentId} hover sx={{ "&:hover": { backgroundColor: "rgba(190, 50, 157, 0.1)" } }}>
                    <TableCell>{content.contentId}</TableCell>
                    <TableCell>
                      <div><strong>Q{index + 1}:</strong> {content.content?.text}</div>
                      <div><strong>Options:</strong></div>
                      <ul style={{ paddingLeft: "20px", margin: 0 }}>
                        <li><strong>a.</strong> {content.content?.options?.a}</li>
                        <li><strong>b.</strong> {content.content?.options?.b}</li>
                        <li><strong>c.</strong> {content.content?.options?.c}</li>
                        <li><strong>d.</strong> {content.content?.options?.d}</li>
                      </ul>
                      <div><strong>Correct Option:</strong> {content.content?.correctOption}</div>
   
                      <div><strong>Description:</strong> {content.content?.description}</div>
                       <div><strong>Duration:</strong> {content.content?.duration} sec</div>
                    </TableCell>
                    <TableCell>{formatDate(content.createdAt)}</TableCell>
                    <TableCell>{formatDate(content.updatedAt)}</TableCell>
                    <TableCell>{content.createdBy}</TableCell>
                    <TableCell>{content.updatedBy}</TableCell>
                    <TableCell>
                      <Stack direction="horizontal" gap={2}>
                        <Button
                          variant="outlined"
                          color="warning"
                          size="small"
                          onClick={() => navigate(`/updateContent/${content.contentId}`)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={() => handleDelete(content.contentId)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
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
