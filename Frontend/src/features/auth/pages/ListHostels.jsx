import { useState, useEffect } from 'react';
import { getAllHostels } from '../services/hostel.service';
import { BookHostel } from '../services/booking.service';
import { createInquiery } from '../services/inquiery.service';

const getHostelId = (hostel) => hostel?.id || hostel?._id || hostel?.hostelId;

const ListHostels = () => {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHostel, setSelectedHostel] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);
    const [inquireHostel, setInquireHostel] = useState(null);
    const [inquiryMessage, setInquiryMessage] = useState('');
    const [inquiryLoading, setInquiryLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchHostels = async () => {
            try {
                const response = await getAllHostels();
                if (isMounted) {
                    const fetchedHostels = response.hostels || response.data || [];
                    setHostels(fetchedHostels.map((hostel) => ({
                        ...hostel,
                        id: getHostelId(hostel)
                    })));
                }
            } catch (error) {
                console.log("Error while fetching hostels", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchHostels();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleBookSubmit = async (e) => {
        e.preventDefault();

        if (!checkInDate) {
            alert("Please select a check-in date!");
            return;
        }

        try {
            setBookingLoading(true);
            const hostelId = getHostelId(selectedHostel);

            if (!hostelId) {
                throw new Error("This hostel does not have a valid ID");
            }

            const bookingData = {
                hostelId,
                checkInDate: checkInDate,
                totalAmount: selectedHostel.pricePerMonth
            };

            const response = await BookHostel(bookingData);
            console.log("Booking saved in DB:", response);
            alert(`Successfully booked ${selectedHostel.name}!`);

            setHostels(prevHostels =>
                prevHostels.map(h =>
                    getHostelId(h) === hostelId ? { ...h, isBookedByUser: true } : h
                )
            );

            setSelectedHostel(null);
            setCheckInDate('');
        } catch (error) {
            console.error("Booking API Error:", error);
            alert(error.response?.data?.message || error.message || "Failed to save booking in Database");
        } finally {
            setBookingLoading(false);
        }
    };

    const handleInquirySubmit = async (e) => {
        e.preventDefault();

        if (!inquiryMessage.trim()) {
            alert("Please enter a message!");
            return;
        }

        try {
            setInquiryLoading(true);
            const hostelId = getHostelId(inquireHostel);

            const response = await createInquiery(hostelId, inquiryMessage);
            console.log("Inquiry saved in DB:", response);
            alert(`Inquiry sent to ${inquireHostel.name}!`);

            setInquireHostel(null);
            setInquiryMessage('');
        } catch (error) {
            console.error("Inquiry API Error:", error);
            alert(error.response?.data?.message || error.message || "Failed to send inquiry");
        } finally {
            setInquiryLoading(false);
        }
    };

    if (loading) return <div className="p-4">Loading hostels...</div>;

    return (
        <div className='bg-[#dbecb9] min-h-screen p-4'>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {hostels.map((hostel) => {
                    const hId = getHostelId(hostel);
                    return (
                        <div key={hId} className="w-80 p-6 rounded-3xl bg-[#1d5238] bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_8px)] text-amber-200 shadow-xl flex flex-col justify-between">
                            <div>
                                <h1 className='font-bold text-lg text-yellow-400'>
                                    Owner: {hostel.owner?.Username || hostel.owner?.name || hostel.owner || 'Unknown'}
                                </h1>
                                <p className="text-sm text-white">
                                    Phone: {hostel.owner?.phone || 'Not provided'}
                                </p>
                                <h1 className="font-bold text-lg">{hostel.name}</h1>
                                <p className="text-white">{hostel.address?.city || hostel.city}</p>
                                <p className="text-sm text-white">{hostel.address?.street || hostel.address}</p>
                                <p className="text-amber-300 font-semibold my-1">₹{hostel.pricePerMonth}/mo</p>
                                <p className="text-xs text-gray-300">
                                    {Array.isArray(hostel.amenities) ? hostel.amenities.join(', ') : hostel.amenities}
                                </p>
                                <p className="text-xs font-medium text-white mt-1">{hostel.roomType}</p>
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                {hostel.isBookedByUser ? (
                                    <button disabled className="w-full py-2 rounded-xl bg-emerald-900 border border-emerald-500 text-emerald-200 font-bold cursor-not-allowed">
                                        ✓ Already Booked
                                    </button>
                                ) : (
                                    <button onClick={() => setSelectedHostel(hostel)} className='w-full py-2 rounded-xl bg-yellow-300 hover:bg-yellow-400 text-black font-bold cursor-pointer transition-colors'>
                                        Book Hostel
                                    </button>
                                )}
                                <button onClick={() => setInquireHostel(hostel)} className='w-full py-2 rounded-xl border border-yellow-300 text-yellow-300 hover:bg-yellow-300 hover:text-black font-semibold cursor-pointer transition-colors'>Create Inquiry</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            {selectedHostel && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1d5238] p-6 rounded-2xl w-full max-w-md text-white border border-amber-200/20 shadow-2xl">
                        <h2 className="text-xl font-bold text-amber-200 mb-2">
                            Book {selectedHostel.name}
                        </h2>
                        <p className="text-sm text-gray-300 mb-4">
                            Price: <span className="text-amber-300 font-bold">₹{selectedHostel.pricePerMonth}/mo</span>
                        </p>
                        <form onSubmit={handleBookSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Select Check-in Date:
                                </label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setCheckInDate(e.target.value)}
                                    className="w-full p-2.5 rounded-lg bg-emerald-950 text-white border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setSelectedHostel(null)} className="flex-1 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 font-medium transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={bookingLoading} className="flex-1 py-2 rounded-lg bg-yellow-300 text-black font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50">
                                    {bookingLoading ? 'Saving...' : 'Confirm Booking'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {inquireHostel && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-[#1d5238] p-6 rounded-2xl w-full max-w-md text-white border border-amber-200/20 shadow-2xl">
                        <h2 className="text-xl font-bold text-amber-200 mb-1">
                            Send Inquiry
                        </h2>
                        <p className="text-sm text-gray-300 mb-4">
                            To: <span className="text-yellow-400 font-semibold">{inquireHostel.name}</span>
                        </p>
                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Your Message / Question:
                                </label>
                                <textarea
                                    rows="4"
                                    value={inquiryMessage}
                                    onChange={(e) => setInquiryMessage(e.target.value)}
                                    placeholder="Ask about rules, food, room availability..."
                                    className="w-full p-2.5 rounded-lg bg-emerald-950 text-white border border-emerald-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => { setInquireHostel(null); setInquiryMessage(''); }} className="flex-1 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 font-medium transition-colors">Cancel</button>
                                <button type="submit" disabled={inquiryLoading} className="flex-1 py-2 rounded-lg bg-yellow-300 text-black font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50">{inquiryLoading ? 'Sending...' : 'Send Inquiry'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListHostels;