import React, { useContext, useState } from "react";
import Logo from "../../Assets/shuti_eats.png";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const status = useOnlineStatus();
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const { loggedInUser } = useContext(UserContext);

  // Subscribing to the store (header component is subscribing to the store) using a Selector
  //since, we have wrapped whole app in our </Provider> hence, store is available here also
  const cartItems= useSelector((store)=> store.cart.items);
  return (
    <div className="flex justify-between shadow-lg m-4  border-[1px] border-solid border-gray-500 rounded-lg bg-gray-200">
      <img className="h-20" src={Logo} alt="logo-img" /> 

      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            <Link to="/">Online-Status:{status ? "✅" : "🔴"}</Link>
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/cart">🛒({cartItems.length})</Link>
          </li>
          <button
            className="login"
            onClick={() => {
              btnNameReact === "Login"
                ? setBtnNameReact("Logout")
                : setBtnNameReact("Login");
            }}
          >
            {btnNameReact}
          </button>
          <li className="px-4 font-semibold">
            {loggedInUser}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
