import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddUserDialog from './AddUserDialog'
import UserList from './userList'
import UseAlert from "../../common/useAlert";
export default function Content() {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [message, setMessage] = React.useState(null);

  const openDialog = () => setDialogIsOpen(true)

  const closeDialog = () => setDialogIsOpen(false)
  return (
    <>
    <UseAlert open={message} setOpen={setMessage}/>
    <AddUserDialog setMessage={setMessage} open={dialogIsOpen} onClose={closeDialog} />
    <Paper sx={{margin: "auto", overflow: "hidden" }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by email address, phone number, or user UID"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{ mr: 1 }}
                onClick={openDialog}
              >
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 3 }}>
          <UserList />
        </Box>
    </Paper>
    </>
  );
}
