import { useState, useEffect } from "react";
import { CmpService } from "../../service/CmpService";
import {
  ThemeProvider,
  createTheme,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  TextField
} from "@mui/material";

const theme = createTheme({
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#000",
          color: "#fff",
          fontWeight: 600,
        },
        root: {
          borderColor: "rgba(190,50,157,0.5)",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(190,50,157,0.1)",
          },
        },
      },
    },
  },
});

const UserFetchAll = () => {
  const [registers, setRegisters] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await CmpService.registerFetchAll();
        setRegisters(res.data);
      } catch (err) {
        alert("Fetch failed");
        console.error(err);
      }
    })();
  }, []);

  const visibleUsers = registers
    .filter(u =>
      u.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      u.emailId.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  return (
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: "100%", overflowX: "auto", mt: 3, p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <h2 style={{ margin: 0 }}>Registered Users</h2>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            sx={{ width: "200px" }}
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
        </Box>

        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Email ID</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>State</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleUsers.length > 0 ? (
              visibleUsers.map(u => (
                <TableRow key={u.userId}>
                  <TableCell>{u.userId}</TableCell>
                  <TableCell>{u.firstName}</TableCell>
                  <TableCell>{u.emailId}</TableCell>
                  <TableCell>{u.password}</TableCell>
                  <TableCell>{u.contact}</TableCell>
                  <TableCell>{u.state}</TableCell>
                  <TableCell>{u.city}</TableCell>
                  <TableCell>{u.address || u.Address}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </ThemeProvider>
  );
};

export default UserFetchAll;
