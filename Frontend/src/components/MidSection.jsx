
const MidSection = () => {
    return (
        <section className='px-6 py-8 md:px-12 lg:px-24 bg-[#dbecb9]'>
            <div className='mx-auto max-w-6xl'>
            <div className='flex flex-col items-start justify-between gap-5 pb-8 sm:flex-row sm:items-center'>
                <h2 className='text-xl font-bold text-green-950'>Verified stays near you</h2>
                <div className='flex flex-wrap gap-2'>
                    <button className='rounded-2xl bg-green-950 px-3 py-1 text-white'>All</button>
                    <button className='rounded-2xl bg-amber-100 px-3 py-1'>Boys</button>
                    <button className='rounded-2xl bg-amber-100 px-3 py-1'>Girls</button>
                    <button className='rounded-2xl bg-amber-100 px-3 py-1'>Under 7,000</button>
                </div>
            </div>
            <article className='flex flex-col items-start justify-between gap-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:flex-row sm:items-center'>
                <div className='flex items-center gap-4'>
                    <div className='h-20 w-20 flex-shrink-0 rounded-xl bg-amber-300'></div>
                    <div className='flex flex-col gap-1'>
                        <h3 className='text-lg font-bold text-green-950'>shree Balaji Boys PG</h3>
                        <p className='text-sm text-gray-600'>Kolar Road - 1.2 km from campus</p>
                    </div>
                </div>
                <div className='text-right'>
                    <p className='text-lg font-bold text-green-900'>₹6,500 <span className='text-xs font-normal text-gray-500'>/ month</span></p>
                </div>
            </article>
            </div>
        </section>
    )
}

export default MidSection