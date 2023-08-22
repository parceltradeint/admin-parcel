import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-table-v6/react-table.css";
import UserProvider from "../AuthenticApp/Context/userContext";
import Page from "@/components/Page";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Page>
        <Component {...pageProps} />;
      </Page>
    </UserProvider>
  );
}
