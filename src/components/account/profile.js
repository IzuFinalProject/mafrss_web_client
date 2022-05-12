import React, { Component } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import AccountProfile from "./account-detail";
import AccountProfileDetails from "./account-profile-details";

export default class Profile extends Component {
  render() {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item lg={7} md={8} xs={12}>
              <AccountProfile />
            </Grid>
            <Grid item lg={5} md={4} xs={12}>
              <AccountProfileDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
}
