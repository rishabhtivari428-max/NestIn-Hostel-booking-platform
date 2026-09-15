import Navbar from './components/Navbar'
import Herro from './components/Herro'
import MidSection from './components/MidSection'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='min-h-screen bg-[#dbecb9]'>
    <Navbar />
    <Herro />
    <MidSection />
    <Footer />
    </div>
  )
}

export default App