import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import Footer from './Components/Layouts/Footer'
import Home from './Pages/Home'
import About from './Pages/About'
import Saved from './Pages/Saved'
import Notfound from './Pages/Notfound'
import { GithubProvider } from './Context/github/GithubContext'
import { AlertProvider } from './Context/alert/AlertContext'
import User from './Pages/User'
// import Alert from './Components/Layouts/Alert'

function App() {
  return (
    <BrowserRouter>
      <GithubProvider>
        <AlertProvider>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container mx-auto px-3 pb-12">
              {/* <Alert /> */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<Notfound />} />
                <Route path="/*" element={<Notfound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </AlertProvider>
      </GithubProvider>
    </BrowserRouter>
  )
}

export default App
