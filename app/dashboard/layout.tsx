import Sidebar from "@/app/dashboard/components/Sidebar";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    return (
        <Sidebar>
            <main className="py-10 bg-main-orange  min-h-[calc(100vh-theme(space.16))]">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
            </main>
        </Sidebar>
    );
}