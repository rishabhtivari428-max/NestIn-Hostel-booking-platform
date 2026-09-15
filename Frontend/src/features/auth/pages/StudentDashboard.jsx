import { useState, useEffect } from 'react';
import { getBooking } from '../services/booking.service';

const StudentDashboard = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const response = await getBooking();
            setBookings(response.myBookings || response.bookings || response.data || []);
        } catch (error) {
            console.log("Error while fetching bookings", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    if (loading) return <div className="p-4">Loading your bookings...</div>;

    return (
        <div className="p-6 h-screen bg-[#dbecb9]">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
                    {bookings.map((booking) => {
                        const hostel = booking.hostelId || booking.hostel || {};
                        const bookingId = booking._id || booking.id;
                        return (
                            <div key={bookingId} className="border p-4 rounded-xl shadow-sm flex flex-col justify-between bg-green-900">
                                <div>
                                    <h2 className="font-bold text-lg text-white">{hostel.name || "Hostel"}</h2>
                                    <p className="text-white text-sm mt-1">Check-in: {booking.checkInDate}</p>
                                    <p className="text-white font-semibold mt-1">
                                        Amount: ₹{booking.totalAmount || booking.price || hostel.pricePerMonth}
                                    </p>
                                </div>
                                <div>
                                    <span className="inline-block mt-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                        {booking.status || 'Pending'}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;