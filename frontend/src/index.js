import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";


ReactDom.render(
<BrowserRouter>
<App />
</BrowserRouter>
, document.getElementById("root"));


// Implement Dark Mode
// Implement JWT authorisation
// good footer
// Add three navbar :- Home, About, Contact
// Give portfolio link in the About section, for home just reroute to home directory