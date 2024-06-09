import './App.css'
import { HomePage } from './pages/HomePage'
import { About } from './pages/About'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SectorOverview } from './pages/SectorOverview'
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
      <TopBar></TopBar>
      <NavBar NavData={NavData}></NavBar>
      <Routes>
        <Route path='/schemes' element={<Schemes />} />
        <Route path='/delete' element={<DeleteScheme />} />
        <Route path='/apply' element={<UserApply />}></Route>
        <Route path='/userdash' element={<UserApply />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/overview" element={<SectorOverview />}></Route>
        <Route path="/user" element={<UserLogin />}></Route>
        <Route path='/create' element={<UserCreate />}></Route>
        <Route path='/admin' element={<AdminLogin />}></Route>
        <Route path='/admindash' element={<AdminDashboard />}></Route>
        <Route path='/addscheme' element={<AddScheme />}></Route>
        <Route path='/approve' element={<ApproveUser />}></Route>
        <Route path='/approveApplication' element={<ApproveApplication/>}></Route>
        <Route path='/organizations' element={<AssociatedOrganizations />}></Route>

        {/* SubPages */}
        <Route path='/accessibility' element={<SubPage data={subPageData.accessibility}/>}></Route>
        <Route path='/help' element={<SubPage data={subPageData.help}/>}></Route>
        <Route path='/privacy' element={<SubPage data={subPageData.privacy}/>}></Route>
        <Route path='/hyperlinking' element={<SubPage data={subPageData.hyperlinking}/>}></Route>
        <Route path='/terms' element={<SubPage data={subPageData.terms}/>}></Route>
        <Route path='/contact' element={<SubPage data={subPageData.contact}/>}></Route>
        <Route path='/copyright' element={<SubPage data={subPageData.copyright}/>}></Route>
        <Route path='/telephone' element={<SubPage data={subPageData.telephone}/>}></Route>
        <Route path='/terms' element={<SubPage data={subPageData.terms}/>}></Route>
        <Route path='/careers' element={<SubPage data={subPageData.careers}/>}></Route>
      </Routes>
      <Footer FooterData={FooterData} imglink={imglink} visitor_count={visitor_count} lastUpdated={lastUpdated}></Footer>
    </BrowserRouter>
      
    </>
  )
}

export default App
