import { useState } from "react";
import useAuthContext from "../../Hooks/AuthContextHook";
import { useTranslation } from "react-i18next"
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import CategoryIcon from '@mui/icons-material/Category';
import FlatwareIcon from '@mui/icons-material/Flatware';
// import UserImg from '../../Assets/user.jpg'
import SyncLockIcon from '@mui/icons-material/SyncLock';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from "../../Hooks/useLogout";
import B from "../../Assets/PngLogo/Dark.png";
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import InfoIcon from '@mui/icons-material/Info';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCardIcon from '@mui/icons-material/AddCard';
import FoodBankIcon from '@mui/icons-material/FoodBank';

const Item = ({ title, to, icon, selected, setSelected, handleLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        setSelected(title)
        if(handleLogout){
          handleLogout()
        }
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = () => {
  const { t , i18n } = useTranslation()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { state } = useAuthContext()

  const { logout } = useLogout()
  const handleLogout = () => {
        logout()
      }
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
               >
                 {/* <Typography variant="h3" color={colors.grey[100]}>
               ADMINS
              </Typography> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  src={B}
                  style={{ cursor: "pointer", width:"85%" , marginBottom:"1rem" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" , fontSize:"20px" }}
                >
                  {state.userName ? state.userName : "Admin"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Owner
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title={t("Categories")}
              to="/admin/categories"
              icon={<CategoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Products")}
              to="/admin/products"
              icon={<AutoStoriesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Instructors")}
              to="/admin/instructors"
              icon={<SelfImprovementIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Memberships")}
              to="/admin/memberships"
              icon={<CardMembershipIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Eat-Smart")}
              to="/admin/eat-smart"
              icon={<FlatwareIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Orders")}
              to="/admin/orders"
              icon={<ListAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Booked Memberships")}
              to="/admin/booked-memberships"
              icon={<AddCardIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Booked Eatsmart")}
              to="/admin/booked-eatsmart"
              icon={<FoodBankIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("Clients")}
              to="/admin/clients"
              icon={<PeopleAltIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title={t("About Us")}
              to="/admin/about-us"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Change Password"
              to="/admin/change-password"
              icon={<SyncLockIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Logout"
              handleLogout={handleLogout}
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            /> 
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
