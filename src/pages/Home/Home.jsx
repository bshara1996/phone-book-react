import { useState, useEffect } from "react";
import Card from "../../components/cards/homeCard/HomeCard";
import { cards } from "../../app/data/cards";

import classes from "./home.module.css";
import pageClasses from "../page.module.css";

/**
 * Home page component
 * @returns {JSX.Element} - home page component
 */
export default function Home({ user }) {
  const [welcomeText, setWelcomeText] = useState("");
  const fullText = `Welcome to Phone Book, ${user.name}`;
  
  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setWelcomeText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={pageClasses.page}>
      {/* Navigation bar component */}

      <main className={classes.main}>
        <div className={classes.welcomeSection}>
          <h2>{welcomeText}</h2>
          <p>
            Manage your contacts efficiently with our modern and intuitive
            contact management system
          </p>
        </div>

        <div className={classes.cardsContainer}>
          {cards.map((card) => (
            <div key={crypto.randomUUID()}>
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
