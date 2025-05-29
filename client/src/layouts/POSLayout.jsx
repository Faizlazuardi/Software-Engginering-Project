import POSNavigation from "../components/POSNavigation";

export default function POSLayout({children}) {
    return (
        <div className="flex flex-col w-screen h-screen select-none">
            <POSNavigation />
            {children}
        </div>
    );
}