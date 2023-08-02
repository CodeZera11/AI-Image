"use client"

import { cn } from "@/lib/utils"
import { ImageIcon, LayoutDashboardIcon, MessageSquare, Music, Settings, Video } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboardIcon,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/conversation",
        color: "text-green-500",
    },
    {
        label: "Image Generation",
        icon: Video,
        href: "/image",
        color: "text-blue-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-gray-300",
    },
]

const Sidebar = () => {

    const pathname = usePathname()

    return (
        <div className="h-full space-y-4 py-4 flex flex-col bg-[#111827] text-white ">
            <div className="px-3 py-2 flex-1">
                <Link href={"/dashboard"}>
                    <div className="relative mx-auto w-36 h-12 mb-12">
                        <Image fill src={"/logo2.png"} alt="Logo" />
                    </div>
                </Link>

                {routes.map((route) => (
                    <Link href={route.href} key={route.href} className={cn("text-sm mt-2 group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-white/10 rounded-lg transition", pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar