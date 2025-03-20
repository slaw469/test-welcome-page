import React from 'react';
import {
  createRouter,
  RouterProvider,
  Outlet,
  createRootRoute,
  createRoute,
  createBrowserHistory,
} from '@tanstack/react-router';
import HabitTracker from './routes/HabitTracker';
import WelcomePage from './routes/WelcomePage';
import Layout from './components/layout';

// Root route with no layout
const rootRoute = createRootRoute({
  component: Outlet,
});

// Welcome page (no sidebar)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <Layout showSidebar={false}>
      <WelcomePage />
    </Layout>
  ),
});

// Layout with sidebar for authenticated routes
const authenticatedLayout = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: () => (
    <Layout showSidebar={true}>
      <Outlet />
    </Layout>
  ),
});

// Habits route (with sidebar)
const habitsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/habits',
  component: HabitTracker,
});

// Additional routes for sidebar navigation
const timerRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/timer',
  component: () => <div className="p-4"><h1 className="text-2xl font-bold">Timer Page</h1></div>,
});

const calendarRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/calendar',
  component: () => <div className="p-4"><h1 className="text-2xl font-bold">Calendar Page</h1></div>,
});

const settingsRoute = createRoute({
  getParentRoute: () => authenticatedLayout,
  path: '/settings',
  component: () => <div className="p-4"><h1 className="text-2xl font-bold">Settings Page</h1></div>,
});

// Register the routes
const routeTree = rootRoute.addChildren([
  indexRoute,
  authenticatedLayout.addChildren([
    habitsRoute,
    timerRoute,
    calendarRoute,
    settingsRoute,
  ]),
]);

// Create the router with the route tree and a browser history implementation
export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
});

// Don't forget to include a component to render the router
export function App() {
  return <RouterProvider router={router} />;
}