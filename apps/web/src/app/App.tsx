import { AppProviders } from "./providers/AppProviders";
import { LeadCreationPage } from "../pages/lead-creation";
import "./styles.css";

export default function App() {
  return (
    <AppProviders>
      <LeadCreationPage />
    </AppProviders>
  );
}
