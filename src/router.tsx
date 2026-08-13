import { createBrowserRouter, type Params } from "react-router";
import LandingView from "./views/LandingView";
import ProjectDetailsSkeleton from "./components/ui/ProjectDetailsSkeleton";
import EditProjectSkeleton from "./components/ui/EditProjectSkeleton";
import ProjectTeamSkeleton from "./components/ui/ProjectTeamSkeleton";
import { ProjectCrumb } from "./components/breadcrumbs/ProjectCrumb";
import TaskListSkeleton from "./components/TaskListSkeleton";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingView,
  },
  {
    lazy: async () => ({
      Component: (await import("./layout/AppLayout")).default,
      HydrateFallback: () => null,
    }),
    children: [
      {
        path: "/dashboard",
        lazy: async () => ({
          Component: (await import("./views/DashboardView")).default,
          HydrateFallback: () => null,
        }),
        index: true,
        handle: { crumb: () => "Mis Proyectos" },
      },
      {
        path: "/projects/:projectId",
        lazy: async () => ({
          Component: (await import("./views/ProjectDetailsView")).default,
          HydrateFallback: ProjectDetailsSkeleton,
        }),
        handle: {
          crumb: (params: Params) => <ProjectCrumb projectId={params.projectId!} />,
        },
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: ((await import("./components/tasks/TaskList")).default),
              HydrateFallback: TaskListSkeleton
            })
          },
          {
            path: "/projects/:projectId/team",
            lazy: async () => ({
              Component: (await import("./views/ProjectTeamView")).default,
              HydrateFallback: ProjectTeamSkeleton,
            }),
            handle: {
              crumb: () => "Equipo",
            },
          },
        ],
      },
      {
        path: "/dashboard/create-project",
        lazy: async () => ({
          Component: (await import("./views/CreateProjectView")).default,
          HydrateFallback: () => null,
        }),
      },
      {
        path: "/projects/:projectId/edit",
        lazy: async () => ({
          Component: (await import("./views/EditProjectView")).default,
          HydrateFallback: EditProjectSkeleton,
        }),
      },
      {
        lazy: async () => ({
          Component: (await import("./layout/ProfileLayout")).default,
          HydrateFallback: () => null,
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
      HydrateFallback: () => null,
    }),
    children: [
      {
        path: "/auth/login",
        lazy: async () => ({
          Component: (await import("./views/auth/LoginWithGoogleProvider"))
            .default,
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
      HydrateFallback: () => null,
    }),
    children: [
      {
        path: "*",
        lazy: async () => ({
          Component: (await import("./views/404/NotFound")).default,
          HydrateFallback: () => null,
        }),
      },
    ],
  },
]);

export default router;
