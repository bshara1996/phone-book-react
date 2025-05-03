import { Link } from "react-router-dom";

import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navbar/NavBar";
import Card from "../../components/card/Card";
import { cards } from "../../app/data/cards";

import classes from "./home.module.css";

import pageClasses from "../page.module.css";

/**
 * Home page component
 * @param {Function} onLogout - function to call when logout is clicked
 * @returns {JSX.Element} - home page component
 */
export default function Home({ onLogout }) {
  return (
    <div className={pageClasses.page}>
      {/* Navigation bar component */}
      <NavBar onLogout={onLogout} />

      <main className={classes.main}>
        <div className={classes.welcomeSection}>
          <h1>Welcome to Phone Book</h1>
          <p>
            Manage your contacts efficiently with our modern and intuitive
            contact management system
          </p>
        </div>

        <div className={classes.cardsContainer}>
          {cards.map((card, index) => (
            <div className={classes.cardWrapper} key={index}>
              <Card
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
