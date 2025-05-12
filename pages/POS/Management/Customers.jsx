import POSManagementLayout from "../../../layouts/POSManagementLayout";

export default function Customers() {
    return (
        <POSManagementLayout>
            <div className="flex flex-col gap-10">
                <h1 className="font-bold text-2xl">Transaction Management</h1>
                <p>Manage your transactions here.</p>
                {/* Add your transaction management content here */}
            </div>
        </POSManagementLayout>
    );
}