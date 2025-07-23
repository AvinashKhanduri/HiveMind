import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AppDrawer from './components/Navigation/AppDrawer.jsx'
import HomePage from './pages/HomePage.jsx'
import EventDetailPage from './pages/EventDetailPage.jsx'
import EventPage from './pages/EventPage.jsx'
import MyTeampage from './pages/MyTeamPage.jsx'
import AuthenticationPage from './pages/Authentication.jsx'
import EditMemberPage from './components/Teams/EditMemberpage.jsx'
import Teamspage from './pages/TeamsPage.jsx'
import TeamDetailPage from './components/Teams/TeamsDetailPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppDrawer/>,
    children: [
      {
        path: "",
        element: <HomePage />
      },
      {
        path: "event-details",
        element: <EventDetailPage />
      },
      {
        path: "my-team",
        element: <MyTeampage />
      },
      {
        path: "events",
        element: <EventPage />
      },{
        path:"edit-member",
        element:<EditMemberPage/>
      },
      {
        path:"teams-page",
        element:<Teamspage/>
      }, {
        path:"teams-detail",
        element:<TeamDetailPage/>
      },
       {
        path:"project-detail",
        element:<ProjectDetailPage/>
      }
    ]
  },
  {
    path:"/auth",
    element:<AuthenticationPage/>
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
