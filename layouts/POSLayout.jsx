import POSNavigation from "../components/POSNavigation";

export default function Products({children}) {
    return (
        <div className="flex flex-col w-screen h-screen">
            <POSNavigation />
            {children}
        </div>
    );
}