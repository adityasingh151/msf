import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./components/store/store";

import App from './App';
import PublicLayout from './components/PublicLayout';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import Carousel from './components/Carousel';
import ContactArea from './components/ContactArea';
import People from './components/People';
import Hero from './components/Hero';
import MathematicalSciencesFoundation from './components/MathematicalSciencesFoundation';
import CoursePage1 from './components/coursesPage/CoursePage1';
import CoursePage2 from './components/coursesPage/CoursePage2';
import CoursesPage from './components/coursesPage/CoursesPage';
import WorkshopPage from './components/WorkshopPage';
import EventPage from './components/EventPage';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardCard from './components/DashboardCard';
import CourseForm1 from './components/dashBoard/inputForms/CourseForm1';
import CourseForm2 from './components/dashBoard/inputForms/CourseForm2';
import CoursesForm from './components/dashBoard/inputForms/CoursesForm';
import EventForm from './components/dashBoard/inputForms/EventForm';
import PeopleForm from './components/dashBoard/inputForms/PeopleForm';
import WorkshopForm from './components/dashBoard/inputForms/WorkshopForm';
import CourseSelection from './components/dashBoard/inputForms/CourseSelection';
import PrivacyPolicy from './components/PrivacyPolicy';
import CarouselImageForm from './components/dashBoard/inputForms/CarouselImageForm';
import ViewCourses from './components/dashBoard/viewComponents/ViewCourses';
import ViewEvent from './components/dashBoard/viewComponents/ViewEvent';
import ViewPeople from './components/dashBoard/viewComponents/ViewPeople';
import ViewCarousel from './components/dashBoard/viewComponents/ViewCarousel';
import ViewWorkshops from './components/dashBoard/viewComponents/ViewWorkshops';
import ViewCoursePage1 from './components/dashBoard/viewComponents/ViewCoursePage1';
import ViewCoursePage2 from './components/dashBoard/viewComponents/ViewCoursePage2';
import ContentForm from './components/dashBoard/inputForms/ContentForm';
import ViewContent from './components/dashBoard/viewComponents/ViewContent';
import NotificationForm from './components/dashBoard/inputForms/NotificationForm';
import ViewNotifications from './components/dashBoard/viewComponents/ViewNotification';
import ReviewForm from './components/dashBoard/inputForms/ReviewForm';
import ViewReviews from './components/dashBoard/viewComponents/ViewReviews'
import NotFoundPage from './components/NotFoundPage';
import Latest from './components/Latest';
import DisplayContent from './components/DisplayContent'
import SponsorsImageForm from './components/dashBoard/inputForms/SponsorsImageForm';
import ViewSponsors from './components/dashBoard/viewComponents/ViewSponsors';
import Initiative2Form from './components/dashBoard/inputForms/Initiative2Form';
import Initiative2Page from './components/Initiative2Page';
import Initiative1Page from './components/Initiative1Page';
import Initiative1Form from './components/dashBoard/inputForms/Initiative1Form';
import Initiative3Page from './components/Initiative3Page'
import Initiative3Form from './components/dashBoard/inputForms/Initiative3Form';

const router = createBrowserRouter([
  {
    errorElement:<NotFoundPage/>,
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <PublicLayout />,
        children: [
          { path: '', element: <Home /> },
          { path: 'about', element: <AboutSection /> },
          { path: 'carousel', element: <Carousel /> },
          { path: 'contact', element: <ContactArea /> },
          { path: 'people', element: <People /> },
          { path: 'hero', element: <Hero /> },
          { path: 'msf', element: <MathematicalSciencesFoundation /> },
          { path: 'courses', element: <CoursesPage /> },
          { path: 'about/team', element: <People /> },
          { path: 'about/story', element: <MathematicalSciencesFoundation /> },
          { path: 'courses/students', element: <CoursePage2 /> },
          { path: 'courses/teachers', element: <CoursePage1 /> },
          { path: "workshop/:workshopId", element: <WorkshopPage /> },
          { path: "event/:eventId", element: <EventPage /> },
          { path: 'PrivacyPolicy', element: <PrivacyPolicy /> },
          { path: 'PrivacyPolicy', element: <PrivacyPolicy /> },
          { path: 'gallery', element: <DisplayContent /> },
          { path: 'latest', element: <Latest /> },
          { path: '/initiatives' , element: <Initiative2Page/>},
          { path: '/initiatives/startup' , element: <Initiative2Page/>},
          { path: '/initiatives/internetCollege' , element: <Initiative1Page/>},
          { path: '/initiatives/internetCollege/engineeringKitchen' , element: <Initiative3Page/>},
          { path: 'admin/login', element: <AdminLogin /> },
        ],
      },
      {
        path: 'admin',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <AdminLayout />,
            children: [
              { path: 'dashboard', element: <DashboardCard /> },
              { path: 'course-selection', element: <CourseSelection /> },
              { path: 'forms/course1', element: <CourseForm1 /> },
              { path: 'forms/course2', element: <CourseForm2 /> },
              { path: 'forms/courses', element: <CoursesForm /> },
              { path: 'forms/event', element: <EventForm /> },
              { path: 'forms/sponsors', element: <SponsorsImageForm /> },
              { path: 'forms/event/edit/:eventId', element: <EventForm /> },
              { path: "forms/image/edit/:contentId", element: <ContentForm /> },
              { path: "forms/video/edit/:contentId", element: <ContentForm /> },
              { path: "forms/article/edit/:contentId", element: <ContentForm /> },
              { path: "forms/sponsors/edit/:sponsorId", element: <SponsorsImageForm /> },
              { path: 'forms/people', element: <PeopleForm /> },
              { path: 'forms/people/edit/:personId', element: <PeopleForm /> },
              { path: 'view/people', element: <ViewPeople /> },
              { path: 'forms/workshop', element: <WorkshopForm /> },
              { path: 'forms/carousel', element: <CarouselImageForm /> },
              { path: "forms/gallery", element: <ContentForm /> },
              { path: "forms/notification", element: <NotificationForm onSave={() => {}} /> },
              { path: 'view/courses', element: <ViewCourses /> },
              { path: "view/gallery", element: <ViewContent /> },
              { path: "view/notification", element: <ViewNotifications /> },
              { path: 'forms/course1/edit/:courseId', element: <CourseForm1 editMode /> },
              { path: 'forms/course2/edit/:courseId', element: <CourseForm2 editMode /> },
              { path: 'forms/testimonials', element: <ReviewForm /> },
              { path: 'view/events', element: <ViewEvent /> },
              { path: 'view/workshops', element: <ViewWorkshops /> },
              { path: 'forms/workshop/edit/:workshopId', element: <WorkshopForm /> },
              { path: 'view/sponsors', element: <ViewSponsors /> },
              { path: 'view/carousel', element: <ViewCarousel /> },
              { path: 'view/courses/teachers', element: <ViewCoursePage1 /> },
              { path: 'view/courses/college', element: <ViewCoursePage2 /> },
              { path: 'view/testimonials', element: <ViewReviews /> },
              { path: 'forms/startup', element: <Initiative2Form /> },
              { path: 'forms/internetCollege', element: <Initiative1Form /> },
              { path: 'forms/engineeringKitchen', element: <Initiative3Form /> },
            ],
          },
        ],
      },
      // Additional non-admin routes can be added here
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
