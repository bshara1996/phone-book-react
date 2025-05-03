import classes from "./footer.module.css";

/**
 * Footer component
 * @returns JSX of component
 */
export default function Footer() {
  const date = new Date().getFullYear();

  return (
    <footer className={classes.footer}>
      <p>&copy; {date} Bshara Krakaby & Moner Makholy</p>
    </footer>
  );
}
