// import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";
import UserContext from "../utils/UserContext";
// to use context here in classBased components, we need to use <UserContext.Consumer>


class About extends Component {
  constructor(props) {
    super(props);

    //console.log("Parent Constructor");
  }

  componentDidMount() {
    //console.log("Parent Component Did Mount");
  }

  render() {
    //console.log("Parent Render");

    return (
      <div className="m-4">
        <h1>About Class Component</h1>
        <h2>This is Namaste React Web Series</h2>
        <div>
          LoggedIn User: 
          <UserContext.Consumer>
            {
              // a callback is passed here, in which we are directly destructuring the data of UserContext and using it in the function
              ({loggedInUser})=>(
                <h1 className="text-xl font-semibold">{loggedInUser}</h1>
              )
            }
          </UserContext.Consumer>
        </div>
        <UserClass name={"First"} location={"Dehradun Class"} />
      </div>
    );
  }
}

export default About;
