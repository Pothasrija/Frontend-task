import React, { useState, useEffect } from "react";
import mockData from "../src/mock_data.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Typography,
  IconButton,
  Switch,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const recordsPerPage = 10;

  // Fetch transactions from the API or fallback to mock data
  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error(
        "Error fetching transactions, using fallback mock data:",
        error
      );
      setTransactions(mockData); // Fallback to mock data
    }
  };

  // Filter transactions based on search and status
  const filteredData = transactions.filter((row) => {
    return (
      (!search || row.orderId.includes(search)) &&
      (!filterBy || row.status === filterBy)
    );
  });

  // Paginated data
  const paginatedData = filteredData.slice(
    currentPage * recordsPerPage,
    (currentPage + 1) * recordsPerPage
  );

  // Handle Dark Mode Toggle
  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: darkMode ? "#121212" : "#ffffff",
        color: darkMode ? "#e0e0e0" : "#000000",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          style={{
            marginBottom: "20px",
            color: darkMode ? "#e0e0e0" : "#000000",
          }}
        >
          Transactions Dashboard
        </Typography>
        <div>
          <Typography
            variant="body1"
            component="span"
            style={{
              marginRight: "10px",
              color: darkMode ? "#e0e0e0" : "#000000",
            }}
          >
            Dark Mode
          </Typography>
          <Switch checked={darkMode} onChange={handleDarkModeToggle} />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Search (Order ID)"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "20%",
            backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
            color: darkMode ? "#e0e0e0" : "#000000",
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#e0e0e0" : "#000000" },
          }}
          InputProps={{
            style: { color: darkMode ? "#e0e0e0" : "#000000" },
          }}
        />
        <FormControl
          variant="outlined"
          style={{
            width: "20%",
            backgroundColor: darkMode ? "#2c2c2c" : "#ffffff",
          }}
        >
          <InputLabel style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
            Filter By
          </InputLabel>
          <Select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            label="Filter By"
            style={{ color: darkMode ? "#e0e0e0" : "#000000" }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          onClick={fetchTransactions}
          style={{
            backgroundColor: darkMode ? "#3f3f3f" : "#3f51b5",
            color: "#ffffff",
          }}
        >
          Refresh
        </Button>
      </div>

      <TableContainer
        component={Paper}
        style={{ backgroundColor: darkMode ? "#1e1e1e" : "#ffffff" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {[
                "Sr.No",
                "Institute Name",
                "Date & Time",
                "Order ID",
                "Order Amt",
                "Transaction Amt",
                "Payment Method",
                "Status",
                "Student Name",
                "Phone No",
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{ color: darkMode ? "#e0e0e0" : "#000000" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={row.orderId}
                style={{
                  transition: "all 0.3s ease-in-out",
                  transform: "scale(1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0px 4px 15px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {currentPage * recordsPerPage + index + 1}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.instituteName}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.dateTime}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.orderId}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.orderAmt}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.transactionAmt}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.paymentMethod}
                </TableCell>
                <TableCell
                  style={{
                    color: row.status === "Success" ? "green" : "orange",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.studentName}
                </TableCell>
                <TableCell style={{ color: darkMode ? "#e0e0e0" : "#000000" }}>
                  {row.phoneNo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <IconButton
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
          }
          disabled={currentPage === 0}
          style={{ color: darkMode ? "#e0e0e0" : "#000000" }}
        >
          <ArrowBack />
        </IconButton>
        <Typography
          variant="body1"
          style={{ margin: "0 15px", color: darkMode ? "#e0e0e0" : "#000000" }}
        >
          Page {currentPage + 1} of{" "}
          {Math.ceil(filteredData.length / recordsPerPage)}
        </Typography>
        <IconButton
          onClick={() =>
            setCurrentPage((prevPage) =>
              Math.min(
                prevPage + 1,
                Math.ceil(filteredData.length / recordsPerPage) - 1
              )
            )
          }
          disabled={
            currentPage >= Math.ceil(filteredData.length / recordsPerPage) - 1
          }
          style={{ color: darkMode ? "#e0e0e0" : "#000000" }}
        >
          <ArrowForward />
        </IconButton>
      </div>
    </div>
  );
}

export default App;
