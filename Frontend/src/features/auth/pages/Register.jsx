import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [phone, setphone] = useState("")
    const [gender, setgender] = useState("")
    const [role, setrole] = useState("")
    const { handleRegister } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await handleRegister(username, email, password, phone, gender, role)
            navigate('/login')
            alert("User registered successfully")
        } catch (error) {
            console.log("Error while registering: ", error)
        }
        setusername("")
        setemail("")
        setpassword("")
        setphone("")
        setgender("")
        setrole("")
    }

    return (
        <div className="flex justify-center items-center bg-[#dbecb9] min-h-screen p-4">
            <form onSubmit={handleSubmit} className="bg-[#1d4d3e] p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-5 border border-[#2d6e5a]">
                <div className="text-center mb-2">
                    <h2 className="text-2xl font-bold text-white tracking-wide">Welcome Back</h2>
                    <p className="text-[#dbecb9] text-xs mt-1 opacity-80">Register to Explore</p>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">Username</label>
                    <input
                        type="username"
                        placeholder="Name"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">E-Mail</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">Password</label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">Contact Number</label>
                    <input
                        type="number"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm"
                        required
                    />
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                        required
                        className='w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm'>
                        <option value="">Select your role</option>
                        <option value="student">Student</option>
                        <option value="owner">Owner</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1.5">
                    <label className="text-white text-sm font-semibold tracking-wide">Gender</label>
                    <select
                        value={gender}
                        onChange={(e) => setgender(e.target.value)}
                        required
                        className='w-full px-4 py-2.5 rounded-lg bg-[#143a2e] text-white placeholder-gray-400 border border-[#2a6854] focus:outline-none focus:ring-2 focus:ring-[#dbecb9] transition-all duration-200 text-sm'>
                        <option value="">Enter Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <button type="submit" className="mt-3 w-full bg-[#dbecb9] text-[#1d4d3e] py-2.5 rounded-lg font-bold text-sm hover:bg-white transition-all duration-200 shadow-md active:scale-[0.98] cursor-pointer">Register</button>
            </form>
        </div>
    )
}

export default Register