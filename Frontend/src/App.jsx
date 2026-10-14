import './App.css'
import Navbar from './components/Navbar'
import Herro from './components/Herro'
import MidSection from './components/MidSection'
import Footer from './components/Footer'

const App = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#f7faf3' }}>
      <Navbar />
      <Herro />
      <MidSection />
      <Footer />
    </div>
  )
}

export default App