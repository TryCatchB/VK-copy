import ReactDOM from "react-dom/client";
import "./index.css";
import Paths from "./components/routes/Paths";
import * as firebase from "firebase/app";
import { AuthProvider } from "./components/providers/AuthProvider";
import QueryProvider from "./components/providers/QueryProvider";

firebase.initializeApp({
  apiKey: "AIzaSyBS_Phv2uaCRDRiKPMOvPjvbj9NuGD0bXU",
  authDomain: "vk-copy-2452e.firebaseapp.com",
  projectId: "vk-copy-2452e",
  storageBucket: "vk-copy-2452e.appspot.com",
  messagingSenderId: "336377181468",
  appId: "1:336377181468:web:cc438a8ee803e511f0f6d9",
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthProvider>
    <QueryProvider>
      <Paths />
    </QueryProvider>
  </AuthProvider>
);
