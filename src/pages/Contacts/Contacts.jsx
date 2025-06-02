import classes from "../page.module.css";
import ContactsList from "../../components/ContactsList/ContactsList";

/**
 * Contacts page component
 * @returns {JSX.Element} - contacts page component
 */
export default function Contacts({ user }) {
  return (
    <div className={classes.page}>
      <h2>Contacts</h2>
      <main>
        <ContactsList user={user} />
      </main>
    </div>
  );
}
