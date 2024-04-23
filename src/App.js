import React, { lazy, Suspense, useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Body from "./Components/Body";
import Footer from "./Components/Footer";
import config from "./config/config.json";
import Error from "./Components/Error";
import About from "./Components/About";
import Contact from "./Components/Contact";
import RestuarantMenu from "./Components/RestaurantMenu";
import Shimmer from "./Components/Shimmer";
import UserContext from "./utils/UserContext";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Cart from "./Components/Cart";
import Demo from "./Components/demo";
// for lazy loading you do not have to import like this
// import Grocery from "./Components/Grocery";

export const configNew = {
  endpoint: `http://${config.workspaceIp}:8082/res`,
  // endpoint: `YOUR_hosted_backend_link/res`,
};

//lazy- loading implementation
const Grocery = lazy(() => {
  return import("./Components/Grocery");
});

const App = () => {
  const [userName, setUserName] = useState();

  //Let there is some auth logic to login here:
  useEffect(() => {
    // Make an API call and send username and password, in response we recived below thing
    const data = {
      name: "Akshay Saini",
    };

    setUserName(data.name);
  }, []);


  /*
    Notes:
    1. when we wrap the whole app inside context.Provider then any change in the globle data inside the context's data is available everyWhere in our app
    2. we are passing the setUserName to the context, now setUserName is also the part of context, and we can recieve it from UserContext and utilize this function to change the state userName, and
        hence, ultimately our context: loggedInUser will be changed.

    3. <Provider> will avail the redux store to our whole appliction now
*/
return (
  <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
      <div>
        <Header />
        {/* this: "Outlet" is a template component which gets replaced by the children components (see children array below) */}
        <Outlet />
      </div>
    </UserContext.Provider>
    </Provider>
  );
};

//1. doing routing configuration (or creating a Router) using "createBrowserRouter", it is a function in which pass the array of routes
//2. defining children routes here, now <App/> will render and <outel/> will be replaced with the components below, whose path is matching with the url passed)
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // this is the component that we need to show when someone will click on a "particular restaurant" of a city
      //how will we find which restarant is clicked? --> use resID(dynamic rhegi ye) and make redirection to this path: /restaurant/:resId using <Link></Link>
      {
        path: "/restaurant/:resId",
        element: <RestuarantMenu />,
      },
      {
        path: "/grocery",
        // utill unless our component does not gets to load, till then, if react tries to render this unload component then it will throw an error
        //hence it is neccesary to add fallback for that window time

        element: (
          <Suspense>
            <Grocery fallback={<Shimmer />} />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/demo",
        element: <Demo />,
      },
    ],
    errorElement: <Error />,
  },
]);

//now we have to provide the above created router
const root = ReactDOM.createRoot(document.getElementById("root"));

//notice one thing, abhi app render nai ho rha h neeche, jo b route hoga uske hisab se components are getting rendered.
root.render(<RouterProvider router={appRouter} />);
