import React, { Component, createRef } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../../services/auth";
import UserService from "../../services/user";
import {
  Avatar,
  Box,
  Button,
  Card,
  ImageList,
  ImageListItem,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

export default class AccountProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      profile: null,
    };
    this.uploadInputRef = createRef();
    this.image = null;
  }
  handleImageChange = (e) => {
    let form_data = new FormData();
    form_data.append("user_id", AuthService.getCurrentUserProfile().user);
    form_data.append("file", e.target.files[0]);
    UserService.uploadImages(form_data)
      .then((res) => {
        console.log(res);
        console.log("sucess");
      })
      .catch(() => {
        console.log("error");
      });
  };

  componentDidMount() {
    AuthService.setUserProfile()
      .then(() => {
        if (!AuthService.getCurrentUserProfile()) {
          this.setState({ redirect: "/" });
        }
        this.setState({ profile: AuthService.getCurrentUserProfile() });
      })
      .catch(() => {
        this.setState({ redirect: "/" });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { profile } = this.state;

    return (
      <Card>
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              // src={profile.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64,
              }}
            />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {/* {profile.name} */}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {`Istanbul, Turkey`}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <input
            accept="image/*"
            ref={this.uploadInputRef}
            style={{ display: "none" }}
            multiple
            onChange={(e) => {
              this.handleImageChange(e);
            }}
            type="file"
          />
          <Button
            onClick={() =>
              this.uploadInputRef.current && this.uploadInputRef.current.click()
            }
            color="primary"
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions>
        <Divider />
        <ImageList sx={{  }} cols={3} rowHeight={164}>
          {AuthService.getCurrentUserProfile()?.images.map((item) => (
             <ImageListItem key={item.img}>
             <img
               src={`${item}`}
               alt={"Name"}
               loading="lazy"
             />
           </ImageListItem>
          ))}
        </ImageList>
      </Card>
    );
  }
}
