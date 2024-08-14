import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root.tsx";
import CreateTeamMember, {
  action as createTeamMemberAction,
} from "./routes/create.tsx";
import EditTeamMember, {
  action as editTeamMemberAction,
  loader as editTeamMemberLoader,
} from "./routes/edit.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: "members/new",
        element: <CreateTeamMember />,
        action: createTeamMemberAction,
      },
      {
        path: "members/:id",
        element: <EditTeamMember />,
        action: editTeamMemberAction,
        loader: editTeamMemberLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
