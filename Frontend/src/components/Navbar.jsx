import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-[#dbecb9] px-6 py-4 md:px-12 lg:px-24'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row'>
        <Link to='/' className='text-xl font-bold text-green-950'>
          Nest<span className='text-yellow-500'>In</span>
        </Link>

        <nav className='flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium text-green-950 md:gap-x-8 md:text-base'>
          <Link to='/browsehostels' className='transition-opacity hover:opacity-80'>Browse hostels</Link>
          <Link to='/listproperty' className='transition-opacity hover:opacity-80'>List your property</Link>
          <Link to='/getbookings' className='transition-opacity hover:opacity-80'>Get your bookings</Link>
          <Link to='/OwnerDashboard' className='transition-opacity hover:opacity-80'>Dashoboard</Link>
          <Link to='/Inquiries' className='transition-opacity hover:opacity-80'>Inquiries</Link>
          <Link to='/login' className='transition-opacity hover:opacity-80'>Login</Link>
          <Link to='/register' className='transition-opacity hover:opacity-80'>Register</Link>
        </nav>
      </div>
    </header>
  )
}

export default Navbar