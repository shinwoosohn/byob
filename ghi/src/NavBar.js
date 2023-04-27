import LoggedOutNavBar from "./Components/loggedOutNavBar";
import TopNavBar from "./Components/topNavBar";

function NavBar({ isLoggedIn }) {
  return (
    <nav>
      {isLoggedIn ? <TopNavBar token={isLoggedIn} /> : <LoggedOutNavBar />}
    </nav>
  );
}

export default NavBar;
