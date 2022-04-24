import "./App.css";
// routes
import ScrollToTop from "./components/ScrollToTop";
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

import Notification from "./components/Notification";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Router />
      <Notification />
    </ThemeConfig>
  );
}
