import React, { Component } from "react";
import AuthService from '../../services/auth'
import UserService from '../../services/user'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';


export default class AccountProfileDetails extends Component {

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
    console.log(this.state)
  };
  
  saveProfile = () => {
    UserService.editUserProfile(this.state)
    .then(()=>{
      console.log("success")
      window.location.reload()
    })
    .catch(err=>{
      console.log("error")
      console.log(err)
    })
  };
  constructor(props) {
    super(props);
    this.state = {
    first_name: '',
    last_name: '',
    email: ''
    };
  }
  

  componentDidMount() {
        let profile = AuthService.getCurrentUserProfile();
        if (profile)
        this.setState({ first_name: profile.first_name, last_name: profile.last_name,email: profile.email });
  }

  render() {
    return(
      <form
      autoComplete="off"
      noValidate
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="first_name"
                onChange={this.handleChange}
                required
                value={this.state.first_name ? this.state.first_name:'' }
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="last_name"
                onChange={this.handleChange}
                required
                value={this.state.last_name ? this.state.last_name:'' }
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={this.handleChange}
                required
                value={ this.state.email ? this.state.email:'' }
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={this.saveProfile}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    );
  }
};