import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";

import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PublishIcon from "@material-ui/icons/Publish";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import PageviewIcon from "@material-ui/icons/Pageview";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import GroupIcon from "@material-ui/icons/Group";

const drawerWidth = 300;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonIconClosed: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(0deg)",
  },
  menuButtonIconOpen: {
    transition: theme.transitions.create(["transform"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transform: "rotate(180deg)",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  grow: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});

class MiniDrawer extends React.Component {
  state = {
    open: false,
    openNestedPublish: false,
    openNestedDept: false,
    openNestedFaculty: false,
    openNestedCourse: false,
    openNestedBatch: false,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
  };

  handleClickPublish = () => {
    this.setState({ openNestedPublish: !this.state.openNestedPublish });
    this.setState({ open: true });
  };

  handleClickDept = () => {
    this.setState({ openNestedDept: !this.state.openNestedDept });
    this.setState({ open: true });
  };

  handleClickFaculty = () => {
    this.setState({ openNestedFaculty: !this.state.openNestedFaculty });
    this.setState({ open: true });
  };

  handleClickCourse = () => {
    this.setState({ openNestedCourse: !this.state.openNestedCourse });
    this.setState({ open: true });
  };

  handleClickBatch = () => {
    this.setState({ openNestedBatch: !this.state.openNestedBatch });
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          fooJon={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={true}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classes.menuButton}
            >
              <MenuIcon
                classes={{
                  root: this.state.open
                    ? classes.menuButtonIconOpen
                    : classes.menuButtonIconClosed,
                }}
              />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              noWrap
              align="left"
              style={{ paddingLeft: "20px" }}
            >
              <Link
                to="/dashboard"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                EMS - Admin Portal
              </Link>
            </Typography>

            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
                style={{ paddingRight: "30px" }}
              >
                <h5 style={{ paddingRight: "20px", paddingTop: "5px" }}>
                  Admin
                </h5>
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem
                  id="changepassword"
                  onClick={this.handleClose}
                  component={Link}
                  to="/dashboard/setPassword"
                >
                  Change Password
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem id="publish" button onClick={this.handleClickPublish}>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              <ListItemText primary="Publishing Hub" />
              {this.state.openNestedPublish ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openNestedPublish}
              timeout="auto"
              unmountOnExit
            >
              <List id="subdeadline" component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to="/dashboard/submitDeadline"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary="Submission Deadline" />
                </ListItem>
                <ListItem id="reqfeedback"
                  button
                  className={classes.nested}
                  component={Link}
                  to="/dashboard/requestFeedback"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary="Subject Feedback" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem id="deptlink" button onClick={this.handleClickDept} >
              <ListItemIcon>
                <AddBoxIcon  />
              </ListItemIcon>
              <ListItemText primary="Department" />
              {this.state.openNestedDept ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse
              in={this.state.openNestedDept}
              timeout="auto"
              unmountOnExit
            >
              <List id="addepartment" component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  key={"Add Department"}
                  component={Link}
                  to="/dashboard/addDepartment"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Department"} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem id="addfaclink" button onClick={this.handleClickFaculty}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Faculty" />
              {this.state.openNestedFaculty ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openNestedFaculty}
              timeout="auto"
              unmountOnExit
            >
              <List id="addfaculty" component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  key={"Add Faculty"}
                  component={Link}
                  to="/dashboard/addFaculty"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Faculty"} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem id="addbatlink" button onClick={this.handleClickBatch}>
              <ListItemIcon>
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary="Batch" />
              {this.state.openNestedBatch ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openNestedBatch}
              timeout="auto"
              unmountOnExit
            >
              <List id="addbat" component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  key={"Add Batch"}
                  component={Link}
                  to="/dashboard/addBatch"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Batch"} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem id="addcourselink" button onClick={this.handleClickCourse}>
              <ListItemIcon>
                <CollectionsBookmarkIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
              {this.state.openNestedCourse ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={this.state.openNestedCourse}
              timeout="auto"
              unmountOnExit
            >
              <List id="addcourse" component="div" disablePadding>
                <ListItem
                  className={classes.nested}
                  button
                  key={"Add Course"}
                  component={Link}
                  to="/dashboard/addCourse"
                >
                  <ListItemIcon>
                    <ArrowForwardIosIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Course"} />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button key={"View Student Preferences"}>
              <ListItemIcon>
                <PageviewIcon />
              </ListItemIcon>
              <ListItemText primary={"View Student Preferences"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);
