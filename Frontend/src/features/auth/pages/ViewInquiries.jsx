import { useState, useEffect } from "react";
import { getInquiery, deleteInquiery, updateInquieryStatus } from "../services/inquiery.service";

const ViewInquiries = ({ hostelId }) => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const fetchInquiries = async () => {
        try {
            setLoading(true);
            const response = await getInquiery(hostelId);
            const list = response.inquiries || response.data?.inquiries || (Array.isArray(response) ? response : []);
            setInquiries(list);
        } catch (err) {
            console.error("Error fetching inquiries:", err);
            setInquiries([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, [hostelId]);

    const handleUpdateStatus = async (id, newStatus) => {
        setUpdatingId(id);
        setInquiries((prev) =>
            prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
        );

        try {
            await updateInquieryStatus(id, newStatus);
        } catch (err) {
            console.error("Failed to update status", err);
            await fetchInquiries();
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

        setInquiries((prev) => prev.filter((item) => item._id !== id));

        try {
            await deleteInquiery(id);
        } catch (err) {
            console.error("Failed to delete inquiry", err);
            await fetchInquiries();
        }
    };

    const getStatusBadge = (status = "Pending") => {
        switch (status.toLowerCase()) {
            case "resolved":
            case "available":
                return <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">Resolved</span>;
            case "rejected":
                return <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">Rejected</span>;
            case "booked":
                return <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">Booked</span>;
            case "pending":
            default:
                return <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">Pending</span>;
        }
    };

    if (loading) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
                <div className="w-10 h-10 border-4 border-[#143a2e] border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-[#143a2e] font-semibold text-sm">Loading inquiries...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#dbecb9] p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-[#143a2e] rounded-2xl p-6 shadow-xl border border-[#2a6854] text-white">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 pb-4 border-b border-[#2a6854]">
                    <div>
                        <h2 className="text-2xl font-extrabold text-[#dbecb9]">Inquiries & Questions</h2>
                        <p className="text-xs text-emerald-100/70 mt-1">Review student questions and manage inquiry statuses</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={fetchInquiries} className="px-3 py-1.5 text-xs font-semibold bg-[#2a6854] hover:bg-[#357a63] text-[#dbecb9] rounded-lg transition border border-[#dbecb9]/20">
                            🔄 Refresh
                        </button>
                        <span className="bg-[#dbecb9] text-[#143a2e] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                            Total: {inquiries.length}
                        </span>
                    </div>
                </div>

                {inquiries.length === 0 ? (
                    <div className="text-center py-12 bg-[#0e271f] rounded-xl border border-[#2a6854]">
                        <p className="text-emerald-100/60 text-base">No inquiries found.</p>
                        <p className="text-xs text-emerald-100/40 mt-1">Inquiries submitted by students will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {inquiries.map((inquiry) => {
                            const currentStatus = inquiry.status || "Pending";
                            return (
                                <div key={inquiry._id} className="bg-[#0e271f] p-5 rounded-xl border border-[#2a6854] shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition hover:border-[#dbecb9]/40">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {getStatusBadge(currentStatus)}
                                            {inquiry.hostel?.name && (
                                                <span className="text-xs font-semibold bg-[#2a6854] text-[#dbecb9] px-2.5 py-0.5 rounded-md">
                                                    🏠 {inquiry.hostel.name} {inquiry.hostel?.city ? `(${inquiry.hostel.city})` : ''}
                                                </span>
                                            )}
                                            <span className="text-xs text-emerald-100/50 ml-auto md:ml-0">
                                                📅 {new Date(inquiry.createdAt || Date.now()).toLocaleDateString()}
                                            </span>
                                        </div>

                                        <p className="text-sm font-medium text-white bg-[#143a2e] p-3 rounded-lg border border-[#2a6854] italic">
                                            "{inquiry.message}"
                                        </p>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-emerald-100/70 pt-1">
                                            {inquiry.student?.name && (
                                                <span>👤 Student: <strong className="text-[#dbecb9]">{inquiry.student.name}</strong> ({inquiry.student.email})</span>
                                            )}
                                            {inquiry.owner?.name && (
                                                <span>🏢 Owner: <strong className="text-[#dbecb9]">{inquiry.owner.name}</strong> ({inquiry.owner.email})</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap md:flex-col items-stretch gap-2 shrink-0 w-full md:w-auto">
                                        <div className="flex items-center gap-1.5 w-full">
                                            <button 
                                                onClick={() => handleUpdateStatus(inquiry._id, "Resolved")} 
                                                disabled={updatingId === inquiry._id || currentStatus.toLowerCase() === "resolved"}
                                                className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition ${currentStatus.toLowerCase() === "resolved" ? 'bg-emerald-800/50 text-emerald-300 opacity-60 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'}`}
                                            >
                                                ✔ Resolve
                                            </button>
                                            <button 
                                                onClick={() => handleUpdateStatus(inquiry._id, "Rejected")} 
                                                disabled={updatingId === inquiry._id || currentStatus.toLowerCase() === "rejected"}
                                                className={`flex-1 px-3 py-1.5 text-xs font-bold rounded-lg transition ${currentStatus.toLowerCase() === "rejected" ? 'bg-rose-900/50 text-rose-300 opacity-60 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 text-white shadow'}`}
                                            >
                                                ✖ Reject
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-1.5 w-full">
                                            {currentStatus.toLowerCase() !== "pending" && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(inquiry._id, "Pending")} 
                                                    disabled={updatingId === inquiry._id}
                                                    className="flex-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-600/80 hover:bg-amber-600 text-white transition"
                                                >
                                                    ↩ Reset Pending
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(inquiry._id)} 
                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-950 text-red-300 hover:bg-red-900 border border-red-800/40 transition"
                                                title="Delete Inquiry"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewInquiries;