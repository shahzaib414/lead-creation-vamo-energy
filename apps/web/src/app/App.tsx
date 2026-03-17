import { AppProviders } from "./providers/AppProviders";
import { LeadCreationPage } from "../domains/lead/pages/LeadCreationPage";
import "./styles.css";

export default function App() {
  return (
    <AppProviders>
      <LeadCreationPage />
    </AppProviders>
  );
}
