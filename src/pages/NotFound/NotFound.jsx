import React from 'react';
import classes from './notfound.module.css';
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>404 - Page Not Found</h1>
      <p className={classes.subtitle}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p>
        Go to <Link to="/">Login Page</Link>
      </p>
    </div>
  );
}
