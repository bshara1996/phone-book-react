import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import classes from "../page.module.css";

export default function NotFound() {
  return (
    <div className={classes.page}>
      <Header />
      <NavBar />
      <h2>Not Found</h2>
      <main>
        <p>The page you are looking for does not exist.</p>
        <p>
          Go to
          <Link to="/">Login</Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
