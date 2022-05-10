import { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import UserService from "../../services/user";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

const BASE_URI = "http://127.0.0.1:8000/";

export default function UserList() {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers().then((response) => {
      console.log({ response });
      if (response.data) {
        setUsers(response.data.results);
      }
    });
  }, []);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((customer) => customer.username);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(1)
      );
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card>
      <Box sx={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedCustomerIds.length === users.length}
                  color="primary"
                  indeterminate={
                    selectedCustomerIds.length > 0 &&
                    selectedCustomerIds.length < users.length
                  }
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(0, limit).map((customer) => (
              <TableRow
                hover
                key={customer.username}
                selected={selectedCustomerIds.indexOf(customer.username) !== -1}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.indexOf(customer.username) !== -1}
                    onChange={(event) => handleSelectOne(event, customer.username)}
                    value="true"
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar src={customer.image?customer.image:BASE_URI+"files/default.png"} sx={{ mr: 2 }}>
                      Avatar
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {customer.first_name +" "+customer.last_name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{customer.username}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {moment(customer.date_joined).format("YYYY/MM/DD kk:mm:ss")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
};
