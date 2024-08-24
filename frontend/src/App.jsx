import './App.css'
import { HomePage } from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserLogin } from './pages/UserLogin'
import { UserCreate } from './pages/UserCreate'
import { AdminLogin } from './pages/AdminLogin'
import { UserApply } from './pages/UserApply'
import { Schemes } from './pages/Schemes'
import { SubPage } from './components/SubPage'
import { FooterData, NavData, imglink, lastUpdated, subPageData, visitor_count } from './data'
import { TopBar } from './components/TopBar'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { AdminDashboard } from './pages/AdminDashboard'
import { AddScheme } from './pages/AddScheme'
import { ApproveUser } from './pages/ApproveUser'
import { AssociatedOrganizations } from './pages/AssociatedOrganizations'
import { ApproveApplication } from './pages/ApplicationApprove'
import { DeleteScheme } from './pages/DeleteScheme'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <TopBar />
          <NavBar NavData={NavData} />
          <div className="flex-grow">
            <Routes>
              <Route path='/schemes' element={<Schemes />} />
              <Route path='/delete' element={<DeleteScheme />} />
              <Route path='/apply' element={<UserApply />} />
              <Route path='/userdash' element={<UserApply />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/user" element={<UserLogin />} />
              <Route path='/create' element={<UserCreate />} />
              <Route path='/admin' element={<AdminLogin />} />
              <Route path='/admindash' element={<AdminDashboard />} />
              <Route path='/addscheme' element={<AddScheme />} />
              <Route path='/approve' element={<ApproveUser />} />
              <Route path='/approveApplication' element={<ApproveApplication />} />
              <Route path='/organizations' element={<AssociatedOrganizations />} />
              <Route path='/about' element={<SubPage data={subPageData.about} />} />
              <Route path='/overview' element={<SubPage data={subPageData.overview} />} />
              <Route path='/accessibility' element={<SubPage data={subPageData.accessibility} />} />
              <Route path='/help' element={<SubPage data={subPageData.help} />} />
              <Route path='/privacy' element={<SubPage data={subPageData.privacy} />} />
              <Route path='/hyperlinking' element={<SubPage data={subPageData.hyperlinking} />} />
              <Route path='/terms' element={<SubPage data={subPageData.terms} />} />
              <Route path='/contact' element={<SubPage data={subPageData.contact} />} />
              <Route path='/copyright' element={<SubPage data={subPageData.copyright} />} />
              <Route path='/telephone' element={<SubPage data={subPageData.telephone} />} />
              <Route path='/careers' element={<SubPage data={subPageData.careers} />} />
            </Routes>
          </div>
          <Footer FooterData={FooterData} imglink={imglink} visitor_count={visitor_count} lastUpdated={lastUpdated} />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
