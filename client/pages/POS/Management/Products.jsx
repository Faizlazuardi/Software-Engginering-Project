import POSManagementLayout from "../../../layouts/POSManagementLayout";

export default function Products() {
    return (
        <POSManagementLayout>
            <div className="flex flex-col gap-10">
                <h1 className="font-bold text-2xl">Product Management</h1>
                <p>Manage your products here.</p>
                {/* Add your product management content here */}
            </div>
        </POSManagementLayout>
    );
}