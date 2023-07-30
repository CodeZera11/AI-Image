import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="h-full relative">
            <div className="h-full hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 md:z-[80] bg-gray-900">
                <Sidebar />
            </div>
            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout