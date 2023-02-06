import { BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import logo from "./assets/images/uepb-horizontal-removebg-preview.png"

import CoursesScreen from "./Components/Courses/CoursesScreen";
import Course from "./Components/Course/Course";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<CoursesScreen />} />
          <Route path="/:course" element={<Course />} />
        </Routes>
      </Router>
    </>
  )
}
