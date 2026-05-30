import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Header from './widgets/Header/Header'
import Footer from './widgets/Footer/Footer'
import AboutPage from './pages/AboutPage/AboutPage'
import SkillPage from './pages/SkillPage/SkillPage'
import ProjectPage from './pages/ProjectsPage/ProjectPage'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import HomePage from './pages/HomePage/HomePage'
function App() {

  return (
    <>
      <BrowserRouter>
        <Header/>
          <Routes>
            <Route path = '/aboutme' element={<AboutPage/>}/>
            <Route path = '/skills' element={<SkillPage/>}/>
            <Route path = '/projects' element={<ProjectPage/>}/>
            <Route path = '/contact' element={<ContactsPage/>}/>
            <Route path = '/' element={<HomePage/>}/>
            {/* <Route path = '/project/:id' element={<<ProjectPage>/>}/> */}
          </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
