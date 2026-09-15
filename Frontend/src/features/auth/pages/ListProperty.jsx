import { useState } from 'react';
import { addHostel } from '../services/hostel.service';

const ListProperty = () => {
    const [hostels, setHostels] = useState([]);
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [pricePerMonth, setPricePerMonth] = useState("");
    const [amenities, setAmenities] = useState("");
    const [roomType, setRoomType] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAddHostels = async (e) => {
        e.preventDefault(); 
        setLoading(true);

        try {
            const amenitiesArray = amenities.split(',').map(item => item.trim());

            const response = await addHostel({ name, city, address, pricePerMonth: Number(pricePerMonth), amenities: amenitiesArray, roomType });

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

    return (
        <div className='min-h-screen bg-[#dbecb9] p-4 md:p-8 flex flex-col items-center justify-start gap-8'>
            <div className='w-full max-w-md bg-[#143a2e] p-6 rounded-2xl shadow-xl border border-[#2a6854]'>
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
                    <button type="submit"disabled={loading} className='mt-2 w-full py-3 bg-[#dbecb9] text-[#143a2e] font-bold rounded-xl hover:bg-[#c9e29f] transition duration-200 active:scale-[0.98] shadow-md disabled:opacity-60 text-sm'>{loading ? 'Adding Property...' : 'Add Property'}</button>
                </form>
            </div>
            {hostels.length > 0 && (
                <div className='w-full max-w-4xl'>
                    <h3 className="text-xl font-bold text-[#143a2e] mb-4 text-center">Recently Added Properties</h3>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {hostels.map((hostel, index) => (
                            <div key={hostel._id || index} className="bg-[#143a2e] p-5 rounded-2xl shadow-lg border border-[#2a6854] text-white flex flex-col justify-between">
                                <div>
                                    <h4 className="text-lg font-bold text-[#dbecb9]">{hostel.name}</h4>
                                    <p className="text-xs text-emerald-100/70">{hostel.city}</p>
                                    <p className="text-xs text-gray-300 mt-2 line-clamp-2">{hostel.address}</p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-[#2a6854] flex items-center justify-between">
                                    <span className="text-xs px-2.5 py-1 bg-[#2a6854] text-[#dbecb9] rounded-md font-semibold">{hostel.roomType || 'Standard'}</span>
                                    <span className="text-base font-extrabold text-[#dbecb9]">₹{hostel.pricePerMonth}/mo</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListProperty;