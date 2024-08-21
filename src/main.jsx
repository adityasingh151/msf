import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/store/store";
import App from "./App";
import PublicLayout from "./components/PublicLayout";
import Home from "./components/Home";

import Carousel from "./components/Carousel";
import ContactArea from "./components/ContactArea";
import People from "./components/People";
import Hero from "./components/Hero";
import MathematicalSciencesFoundation from "./components/MathematicalSciencesFoundation";
import CoursePage1 from "./components/coursesPage/CoursePage1";
import CoursePage2 from "./components/coursesPage/CoursePage2";
import CoursesPage from "./components/coursesPage/CoursesPage";
import WorkshopPage from "./components/WorkshopPage";
import EventPage from "./components/EventPage";
import PrivacyPolicy from "./components/PrivacyPolicy";
import DisplayContent from "./components/DisplayContent";
import Latest from "./components/Latest";
import Initiative2Page from "./components/Initiative2Page";
import Initiative1Page from "./components/Initiative1Page";
import Initiative3Page from "./components/Initiative3Page";
import NotFoundPage from "./components/NotFoundPage";
import AdminLogin from "./components/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/LoadSaveAnimation/Loading";
import ResearchDisplay from "./components/ResearchDisplay";
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const DashboardCard = lazy(() => import("./components/DashboardCard"));
const CourseForm1 = lazy(() =>
  import("./components/dashBoard/inputForms/CourseForm1")
);
const CourseForm2 = lazy(() =>
  import("./components/dashBoard/inputForms/CourseForm2")
);
const CoursesForm = lazy(() =>
  import("./components/dashBoard/inputForms/CoursesForm")
);
const EventForm = lazy(() =>
  import("./components/dashBoard/inputForms/EventForm")
);
const PeopleForm = lazy(() =>
  import("./components/dashBoard/inputForms/PeopleForm")
);
const WorkshopForm = lazy(() =>
  import("./components/dashBoard/inputForms/WorkshopForm")
);
const CourseSelection = lazy(() =>
  import("./components/dashBoard/inputForms/CourseSelection")
);
const CarouselImageForm = lazy(() =>
  import("./components/dashBoard/inputForms/CarouselImageForm")
);
const ViewCourses = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewCourses")
);
const ViewEvent = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewEvent")
);
const ViewPeople = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewPeople")
);
const ViewCarousel = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewCarousel")
);
const ViewWorkshops = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewWorkshops")
);
const ViewCoursePage1 = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewCoursePage1")
);
const ViewCoursePage2 = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewCoursePage2")
);
const ContentForm = lazy(() =>
  import("./components/dashBoard/inputForms/ContentForm")
);
const ViewContent = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewContent")
);
const NotificationForm = lazy(() =>
  import("./components/dashBoard/inputForms/NotificationForm")
);
const ViewNotifications = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewNotification")
);
const ReviewForm = lazy(() =>
  import("./components/dashBoard/inputForms/ReviewForm")
);
const ViewReviews = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewReviews")
);
const SponsorsImageForm = lazy(() =>
  import("./components/dashBoard/inputForms/SponsorsImageForm")
);
const ViewSponsors = lazy(() =>
  import("./components/dashBoard/viewComponents/ViewSponsors")
);
const Initiative2Form = lazy(() =>
  import("./components/dashBoard/inputForms/Initiative2Form")
);
const Initiative1Form = lazy(() =>
  import("./components/dashBoard/inputForms/Initiative1Form")
);
const Initiative3Form = lazy(() =>
  import("./components/dashBoard/inputForms/Initiative3Form")
);
const ResearchForm = lazy(() => 
  import("./components/dashBoard/inputForms/ResearchForm")
);
const ResearchManagement = lazy(() => 
  import("./components/dashBoard/viewComponents/ResearchManagement")
);

const router = createBrowserRouter([
  {
    errorElement: <NotFoundPage />,
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { path: "", element: <Home /> },
          { path: "carousel", element: <Carousel /> },
          { path: "contact", element: <ContactArea /> },
          { path: "people", element: <People /> },
          { path: "hero", element: <Hero /> },
          { path: "msf", element: <MathematicalSciencesFoundation /> },
          { path: "courses", element: <CoursesPage /> },
          { path: "about/team", element: <People /> },
          { path: "about/story", element: <MathematicalSciencesFoundation /> },
          { path: "about/research", element: <ResearchDisplay /> },
          { path: "courses/students", element: <CoursePage2 /> },
          { path: "courses/teachers", element: <CoursePage1 /> },
          { path: "workshop/:workshopId", element: <WorkshopPage /> },
          { path: "event/:eventId", element: <EventPage /> },
          { path: "PrivacyPolicy", element: <PrivacyPolicy /> },
          { path: "gallery", element: <DisplayContent /> },
          { path: "latest", element: <Latest /> },
          { path: "/initiatives", element: <Initiative2Page /> },
          { path: "/initiatives/startup", element: <Initiative2Page /> },
          {
            path: "/initiatives/internetCollege",
            element: <Initiative1Page />,
          },
          {
            path: "/initiatives/internetCollege/engineeringKitchen",
            element: <Initiative3Page />,
          },
          { path: "admin/login", element: <AdminLogin /> },
        ],
      },
      {
        path: "admin",
        element: (
          <Suspense fallback={<Loading />}>
            <ProtectedRoute />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={<Loading />}>
                <AdminLayout />
              </Suspense>
            ),
            children: [
              {
                path: "dashboard",
                element: (
                  <Suspense fallback={<Loading />}>
                    <DashboardCard />
                  </Suspense>
                ),
              },
              {
                path: "forms/research",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ResearchForm />
                  </Suspense>
                ),
              },
              {
                path: "view/research",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ResearchManagement />
                  </Suspense>
                ),
              },
              {
                path: "course-selection",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseSelection />
                  </Suspense>
                ),
              },
              {
                path: "forms/course1",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseForm1 />
                  </Suspense>
                ),
              },
              {
                path: "forms/course2",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseForm2 />
                  </Suspense>
                ),
              },
              {
                path: "forms/courses",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CoursesForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/event",
                element: (
                  <Suspense fallback={<Loading />}>
                    <EventForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/sponsors",
                element: (
                  <Suspense fallback={<Loading />}>
                    <SponsorsImageForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/event/edit/:eventId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <EventForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/image/edit/:contentId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ContentForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/video/edit/:contentId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ContentForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/article/edit/:contentId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ContentForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/sponsors/edit/:sponsorId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <SponsorsImageForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/people",
                element: (
                  <Suspense fallback={<Loading />}>
                    <PeopleForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/people/edit/:personId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <PeopleForm />
                  </Suspense>
                ),
              },
              {
                path: "view/people",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewPeople />
                  </Suspense>
                ),
              },
              {
                path: "forms/workshop",
                element: (
                  <Suspense fallback={<Loading />}>
                    <WorkshopForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/carousel",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CarouselImageForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/gallery",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ContentForm />
                  </Suspense>
                ),
              },
              {
                path: "forms/notification",
                element: (
                  <Suspense fallback={<Loading />}>
                    <NotificationForm onSave={() => { }} />
                  </Suspense>
                ),
              },
              {
                path: "view/courses",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewCourses />
                  </Suspense>
                ),
              },
              {
                path: "view/gallery",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewContent />
                  </Suspense>
                ),
              },
              {
                path: "view/notification",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewNotifications />
                  </Suspense>
                ),
              },
              {
                path: "forms/course1/edit/:courseId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseForm1 editMode />
                  </Suspense>
                ),
              },
              {
                path: "forms/course2/edit/:courseId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CourseForm2 editMode />
                  </Suspense>
                ),
              },
              {
                path: "forms/courses/edit/:category/:courseId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <CoursesForm editMode />
                  </Suspense>
                ),
              },
              {
                path: "forms/testimonials",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ReviewForm />
                  </Suspense>
                ),
              },
              {
                path: "view/events",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewEvent />
                  </Suspense>
                ),
              },
              {
                path: "view/workshops",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewWorkshops />
                  </Suspense>
                ),
              },
              {
                path: "forms/workshop/edit/:workshopId",
                element: (
                  <Suspense fallback={<Loading />}>
                    <WorkshopForm />
                  </Suspense>
                ),
              },
              {
                path: "view/sponsors",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewSponsors />
                  </Suspense>
                ),
              },
              {
                path: "view/carousel",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewCarousel />
                  </Suspense>
                ),
              },
              {
                path: "view/courses/teachers",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewCoursePage1 />
                  </Suspense>
                ),
              },
              {
                path: "view/courses/college",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewCoursePage2 />
                  </Suspense>
                ),
              },
              {
                path: "view/testimonials",
                element: (
                  <Suspense fallback={<Loading />}>
                    <ViewReviews />
                  </Suspense>
                ),
              },
              {
                path: "forms/startup",
                element: (
                  <Suspense fallback={<Loading />}>
                    <Initiative2Form />
                  </Suspense>
                ),
              },
              {
                path: "forms/internetCollege",
                element: (
                  <Suspense fallback={<Loading />}>
                    <Initiative1Form />
                  </Suspense>
                ),
              },
              {
                path: "forms/engineeringKitchen",
                element: (
                  <Suspense fallback={<Loading />}>
                    <Initiative3Form />
                  </Suspense>
                ),
              },
            ],
          },
        ],
      },
      // Additional non-admin routes can be added here
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
