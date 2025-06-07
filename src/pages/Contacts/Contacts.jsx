import ContactsList from "../../components/contactsList/ContactsList";
import pageClasses from "../page.module.css";
import classes from "./contacts.module.css";

/**
 * Contacts page component
 * @param {Object} props Component props
 * @param {Object} props.user Current user data
 * @returns {JSX.Element} Contacts page component
 */
export default function Contacts({ user }) {
  const isAdmin = user?.role === "admin";

  return (
    <div className={pageClasses.page}>
      <main>
        <div className={classes.pageHeader}>
          <h2 className={classes.title}>All Contacts</h2>
        </div>
          <ContactsList isAdmin={isAdmin} />
      </main>
    </div>
  );
}
