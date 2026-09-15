import { useState } from 'react';
import { addHostel, deleteHostel } from '../services/hostel.service'; 

const OwnerDashboard = () => {
    const [hostels, setHostels] = useState([]);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [pricePerMonth, setPricePerMonth] = useState("");
    const [amenities, setAmenities] = useState("");
    const [roomType, setRoomType] = useState("");
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [showAddForm, setShowAddForm] = useState(true); 
    const [isDeleteMode, setIsDeleteMode] = useState(false); 

    const handleAddHostels = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            const amenitiesArray = amenities.split(',').map(item => item.trim());

            const response = await addHostel({ 
                name, 
                city, 
                address, 
                pricePerMonth: Number(pricePerMonth), 
                amenities: amenitiesArray, 
                roomType 
            });

            if (response?.hostel || response?.data) {
                const newProperty = response.hostel || response.data;
                setHostels((prev) => [newProperty, ...prev]);

                setName("");
                setCity("");
                setAddress("");
                setPricePerMonth("");
                setAmenities("");
                setRoomType("");
            }
        } catch (error) {
            console.log("Error while Adding property", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteHostel = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        
        setDeletingId(id);
        try {
            await deleteHostel(id);
            setHostels((prev) => prev.filter((hostel) => (hostel._id || hostel.id) !== id));
        } catch (error) {
            console.log("Error deleting property", error);
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className='min-h-screen bg-[#dbecb9] p-4 md:p-8 flex flex-col items-center justify-start gap-8'>
            <div className="w-full max-w-4xl flex flex-wrap items-center justify-between gap-4 bg-[#143a2e] p-4 rounded-2xl shadow-md border border-[#2a6854]">
                <div>
                    <h1 className="text-xl font-bold text-[#dbecb9]">Owner Dashboard</h1>
                    <p className="text-xs text-emerald-100/70">Manage your NestIn listings and additions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setShowAddForm(!showAddForm)} className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition shadow-sm ${ showAddForm ? 'bg-[#2a6854] text-[#dbecb9] border border-[#dbecb9]/30' : 'bg-[#dbecb9] text-[#143a2e] hover:bg-[#c9e29f]' }`}>{showAddForm ? 'Close Form' : '+ Add New Hostel'}
                    </button>
                    <button onClick={() => setIsDeleteMode(!isDeleteMode)} className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition shadow-sm ${ isDeleteMode ? 'bg-rose-600 text-white animate-pulse' : 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30' }`}>{isDeleteMode ? 'Exit Delete Mode' : 'Delete Mode 🗑️'}</button>
                </div>
            </div>
            {showAddForm && (
                <div className='w-full max-w-md bg-[#143a2e] p-6 rounded-2xl shadow-xl border border-[#2a6854] transition-all'>
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-[#dbecb9] tracking-wide">List Your Property</h2>
                        <p className="text-emerald-100/70 text-xs mt-1">Add your hostel to NestIn network</p>
                    </div>

                    <form onSubmit={handleAddHostels} className='flex flex-col gap-3.5'>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Hostel Name (e.g. Green Valley)'
                            required
                            className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                        />
                        <div className='grid grid-cols-2 gap-3'>
                            <input 
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder='City'
                                required
                                className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                            />
                            <input 
                                type="number"
                                value={pricePerMonth}
                                onChange={(e) => setPricePerMonth(e.target.value)}
                                placeholder='Rent / Month (₹)'
                                required
                                className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                            />
                        </div>
                        <input 
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder='Full Address (Street, Area)'
                            required
                            className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                        />
                        <input 
                            type="text"
                            value={amenities}
                            onChange={(e) => setAmenities(e.target.value)}
                            placeholder='Amenities (WiFi, AC, Mess...)'
                            required
                            className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                        />
                        <input 
                            type="text"
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                            placeholder='Room Type (Single / Double / Dorm)'
                            required
                            className='w-full px-4 py-2.5 rounded-xl bg-[#0e271f] text-white placeholder-emerald-100/40 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition text-sm'
                        />
                        <button type="submit" disabled={loading} className='mt-2 w-full py-3 bg-[#dbecb9] text-[#143a2e] font-bold rounded-xl hover:bg-[#c9e29f] transition duration-200 active:scale-[0.98] shadow-md disabled:opacity-60 text-sm'>
                            {loading ? 'Adding Property...' : 'Add Property'}
                        </button>
                    </form>
                </div>
            )}
            {hostels.length > 0 && (
                <div className='w-full max-w-4xl'>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-[#143a2e]">Your Properties ({hostels.length})</h3>
                        {isDeleteMode && (
                            <span className="text-xs font-semibold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md">
                                Click on red button to delete
                            </span>
                        )}
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {hostels.map((hostel, index) => {
                            const hostelId = hostel._id || hostel.id || index;
                            return (
                                <div key={hostelId} className="bg-[#143a2e] p-5 rounded-2xl shadow-lg border border-[#2a6854] text-white flex flex-col justify-between relative group">
                                    {isDeleteMode && (
                                        <button onClick={() => handleDeleteHostel(hostelId)} disabled={deletingId === hostelId} className="absolute -top-2 -right-2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700 transition active:scale-95 disabled:opacity-50" title="Delete Property">
                                            {deletingId === hostelId ? (
                                                <span className="text-xs px-1">...</span>
                                            ) : (
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            )}
                                        </button>
                                    )}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#dbecb9]">{hostel.name}</h4>
                                        <p className="text-xs text-emerald-100/70">{hostel.city}</p>
                                        <p className="text-xs text-gray-300 mt-2 line-clamp-2">{hostel.address}</p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-[#2a6854] flex items-center justify-between">
                                        <span className="text-xs px-2.5 py-1 bg-[#2a6854] text-[#dbecb9] rounded-md font-semibold">
                                            {hostel.roomType || 'Standard'}
                                        </span>
                                        <span className="text-base font-extrabold text-[#dbecb9]">
                                            ₹{hostel.pricePerMonth}/mo
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerDashboard;