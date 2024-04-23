import logo from "../../assets/logo.png";
import { store } from "../../store";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
const Navbar = () => {
  // const user = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem('user')) || null
  const navigate = useNavigate();
  const { setUser } = store();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    handleClose();
    navigate("/auth");
  };

  return (
    <nav className="bg-[var(--brown)] fixed w-full z-20 top-0 start-0 border-b h-24">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="w-16" alt="Talecrafters Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Talecrafters
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              type="button"
              className="text-white bg-[var(--dark-brown)] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Get started
            </button>
          ) : (
              <div className="flex gap-4">
                <Button
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{
                      fontFamily: 'Poppins',
                      fontWeight: 800,
                        fontSize: '1rem',
                      color: 'white',
                      backgroundColor: 'var(--dark-brown)',
                      paddingX: '20px'
                    }}
                >
                  {user?.name}
                </Button>

                <Avatar alt={user?.name} src={user?.image || ''} sx={{width: 50, height: 50}} onClick={handleClick} />

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                >
                  <MenuItem onClick={
                    () => {
                      handleClose();
                      navigate("/profile")
                    }
                  }>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex p-4 md:p-0 mt-4 font-medium border  md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/stories"
                className="block py-2 px-3 text-white"
                aria-current="page"
              >
                Stories
              </a>
            </li>
            <li>
              <a
                href={`/stories?featured=true`}
                className="block py-2 px-3 text-white"
                aria-current="page"
              >
                Featured Stories
              </a>
            </li>
            {user && (
              <li>
                <a
                  href="/profile"
                  className="block py-2 px-3 text-white"
                  aria-current="page"
                >
                  Profile
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
