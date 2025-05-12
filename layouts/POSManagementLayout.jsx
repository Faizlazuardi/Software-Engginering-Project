import POSLayout from "./POSLayout";
import ManagementNavigation from "../components/ManagementNavigation";

export default function POSManagementLayout({children}) {
    return (
        <POSLayout>
            <main className="flex flex-grow gap-10 bg-gray-100 p-10">
                <ManagementNavigation/>
                <section className="flex flex-col flex-grow gap-10">
                    {children}
                </section>
            </main>
        </POSLayout>
    );
}