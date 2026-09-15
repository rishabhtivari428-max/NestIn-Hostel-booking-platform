const Hero = ({
  title = "12B",
  location = "Kolar Road, Bhopal",
  distance = "0.8 km",
  price = "₹6,500",
  period = "per month"
}) => {
  return (
    <div className='flex flex-col items-center justify-between gap-12 bg-[#dbecb9] px-6 py-16 md:flex-row md:px-12 md:py-20 lg:px-24'>
      <div className='w-full max-w-xl'>
        <h1 className='font-serif text-4xl font-bold leading-tight text-green-950 md:text-5xl'>
          Find a hostel near <br className='hidden md:block' /> campus, without the <br className='hidden md:block' /> guesswork.
        </h1>
        <p className='pt-4 text-base leading-relaxed text-green-900/80'>
          Verified rooms, real distances, and a broker or owner <br className='hidden md:inline' />
          you can message directly - no site visits wasted.
        </p>
        <form className='mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row' onSubmit={(event) => event.preventDefault()}>
          <input
            type='search'
            className='h-12 min-w-0 flex-1 rounded-xl bg-white px-4 py-2 text-slate-800 shadow-sm outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-900/30'
            placeholder='Search by college or locality - eg. Kolar Road'
            aria-label='Search by college or locality'
          />
          <button type='submit' className='h-12 rounded-xl bg-[#1d4d3e] px-6 font-medium text-white shadow-sm transition-colors hover:bg-emerald-900'>
            Search
          </button>
        </form>
      </div>
      <div className='relative w-full max-w-sm overflow-hidden rounded-3xl border border-emerald-900/40 bg-[#1d4d3e] p-6 text-white shadow-xl'>
        <div
          className='pointer-events-none absolute inset-0 opacity-10'
          style={{ backgroundImage: 'repeating-linear-gradient(45deg,#ffffff, #ffffff 1px, transparent 1px, transparent 12px)' }}
        />
        <div className='relative z-10 flex min-h-[220px] flex-col justify-between'>
          <div>
            <h2 className="font-serif text-5xl font-bold tracking-tight text-[#f3eed9]">
              {title}
            </h2>
            <p className="mt-2 text-sm font-medium text-[#c8d8ce]/80 tracking-wide">
              {location}
            </p>
          </div>
          <div className="my-4 w-full h-[1px] bg-emerald-700/60" />
          <div className="flex items-end justify-between">
            <div>
              <p className="font-serif text-2xl font-semibold text-[#f3eed9]">
                {distance}
              </p>
              <p className="text-xs text-[#c8d8ce]/70">
                from campus
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-2xl font-semibold text-[#f3eed9]">
                {price}
              </p>
              <p className="text-xs text-[#c8d8ce]/70">
                {period}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero