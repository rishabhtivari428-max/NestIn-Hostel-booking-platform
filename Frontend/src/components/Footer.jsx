import { Link } from "react-router"

const Footer = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-12 lg:px-24 bg-[#dbecb9]'>
    <footer className='w-full max-w-6xl rounded-xl border-t border-amber-200/60 bg-amber-50 px-6 py-8 md:px-12'>
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6'>
        <div className='min-w-0 max-w-xl'>
          <h1 className='text-lg font-bold text-green-950 mb-1'>
            Manage your listings on NestIn
          </h1>
          <p className='text-sm text-gray-600 leading-relaxed'>
            Owners and brokers get a dashboard for inquiries, availability, and verification — all in one place.
          </p>
        </div>
        <Link to={"/listproperty"} className='shrink-0 bg-yellow-500 hover:bg-yellow-600 transition-colors text-green-950 font-semibold px-5 py-2.5 rounded-lg whitespace-nowrap shadow-sm'>
          List your property
        </Link>
      </div>
    </footer>
    <div className='flex w-full max-w-6xl flex-col gap-2 px-2 pb-4 pt-6 font-bold sm:flex-row sm:items-center sm:justify-between'>
       <div>NestIn - Bhopal</div>
      <div>Student . Broker . Owner . Admin</div>
      </div> 
    </div>
  )
}

export default Footer