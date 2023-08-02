import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ModalProvider } from "@/components/modal-provider"
import { getApiLimit } from "@/lib/api_limit"
import { checkSubscription } from "@/lib/subscription"

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

    const apiLimitCount = await getApiLimit();
    const isPro = await checkSubscription();

    return (
        <div className="h-full relative">
            <div className="h-full hidden md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 bg-gray-900">
                <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72">
                <ModalProvider />
                <Navbar />
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout