import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UserService from "../../services/user";
export default function FormDialog(props) {
  const { open, onClose ,setMessage} = props;
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const saveUser = () => {
    let pass =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    UserService.createUser({
      email,
      username,
      password: pass,
      re_password: pass,
    })
      .then((response) => {
        console.log({response})
        onClose(false);
      })
      .catch((error) => {
        const {response} = error
        console.log({response})
        setMessage("response.data")
        alert("failed");
      });
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add Only username and email to register user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={saveUser}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
