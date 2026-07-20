import { createBrowserRouter } from "react-router";
import DashboardView from "./views/DashboardView";
import LandingView from "./views/LandingView";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingView
  },
  {
    lazy: async () => ({
      Component: (await import("./layout/AppLayout")).default,
    }),
    children: [
      {
        path: "/dashboard",
        Component: DashboardView
      },
      {
        path: "/projects/:projectID",
        lazy: async () => ({
          Component: (await import("./views/ProjectDetailsView")).default,
        }),
      },
      {
        path: "/projects/create-project",
        lazy: async () => ({
          Component: (await import("./views/CreateProjectView")).default,
        }),
      },
      {
        path: "/projects/:projectID/edit",
        lazy: async () => ({
          Component: (await import("./views/EditProjectView")).default,
        }),
      },
      {
        path: "/projects/:projectID/team",
        lazy: async () => ({
          Component: (await import("./views/ProjectTeamView")).default,
        }),
      },
      {
        lazy: async () => ({
          Component: (await import("./layout/ProfileLayout")).default,
        }),
        children: [
          {
            path: "/profile",
            lazy: async () => ({
              Component: (await import("./views/profile/ProfileView")).default,
            }),
          },
          {
            path: "/profile/password",
            lazy: async () => ({
              Component: (await import("./views/profile/ChangePasswordView"))
                .default,
            }),
          },
        ],
      },
    ],
  },
  {
    lazy: async () => ({
      Component: (await import("./layout/AuthLayout")).default,
    }),
    children: [
      {
        path: "/auth/login",
        lazy: async () => ({
          Component: (await import("./views/auth/LoginView")).default,
        }),
      },
      {
        path: "/auth/register",
        lazy: async () => ({
          Component: (await import("./views/auth/RegisterView")).default,
        }),
      },
      {
        path: "/auth/confirm-account",
        lazy: async () => ({
          Component: (await import("./views/auth/ConfirmAccountView")).default,
        }),
      },
      {
        path: "/auth/request-code",
        lazy: async () => ({
          Component: (await import("./views/auth/RequestNewCode")).default,
        }),
      },
      {
        path: "/auth/forgot-password",
        lazy: async () => ({
          Component: (await import("./views/auth/ForgotPasswordView")).default,
        }),
      },
      {
        path: "/auth/new-password",
        lazy: async () => ({
          Component: (await import("./views/auth/NewPasswordView")).default,
        }),
      },
    ],
  },
  {
    lazy: async () => ({
      Component: (await import("./layout/AuthLayout")).default,
    }),
    children: [
      {
        path: "*",
        lazy: async () => ({
            Component: (await import("./views/404/NotFound")).default,
        }),
      },
    ],
  },
]);

export default router;
