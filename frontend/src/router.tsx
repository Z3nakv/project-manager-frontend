import { createBrowserRouter } from "react-router";
import AppLayout from "./layout/AppLayout";
import DashboardView from "./views/DashboardView";
import ProjectDetailsView from "./views/ProjectDetailsView";
import EditProjectView from "./views/EditProjectView";
import CreateProjectView from "./views/CreateProjectView";
import AuthLayout from "./layout/AuthLayout";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layout/ProfileLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewCodeView from "./views/auth/RequestNewCode";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import NotFound from "./views/404/NotFound";
import ProjectTeamView from "./views/ProjectTeamView";
import LandingView from "./views/LandingView";

const router = createBrowserRouter([
    {
        path: '/',
        Component: LandingView
    },
    {
        Component: AppLayout,
        children: [
            {
                path: '/dashboard',
                Component: DashboardView,
                index: true,
            },
            {
                path: '/projects/:projectID',
                Component: ProjectDetailsView,
            },
            {
                path: '/projects/create-project',
                Component: CreateProjectView
            },
            {
                path: '/projects/:projectID/edit',
                Component: EditProjectView
            },
            {
                path: '/projects/:projectID/team',
                Component: ProjectTeamView
            },
            {
                Component: ProfileLayout,
                children: [
                    {
                        path: '/profile',
                        Component: ProfileView,
                    },
                    {
                        path: '/profile/password',
                        Component: ChangePasswordView
                    }
                ]
            }
        ]

    },
    {
        Component: AuthLayout,
        children: [
            {
                path: '/auth/login',
                Component: LoginView
            },
            {
                path: '/auth/register',
                Component: RegisterView
            },
            {
                path: '/auth/confirm-account',
                Component: ConfirmAccountView
            },
            {
                path: '/auth/request-code',
                Component: RequestNewCodeView
            },
            {
                path: '/auth/forgot-password',
                Component: ForgotPasswordView
            },
            {
                path: '/auth/new-password',
                Component: NewPasswordView
            },
            
        ]
    },
    {
        Component: AuthLayout,
        children: [
            {
                path: "*",
                Component: NotFound
            }
        ]
    }
])

export default router;