import Link from "next/link";
import Menu from "./account-menu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/queries/users";
import ProfileImageUploader from "./profile-image-uploader";

const AccountSidebar = async () => {
    const session = await auth();
    if (!session?.user) {
        redirect("/login");
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);
    ("loggedInUser", loggedInUser);

    return (
        <div className="lg:w-1/4 md:px-3">
            <div className="relative ">
                <div className="p-6 rounded-md shadow border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">
                        <ProfileImageUploader initialImage={loggedInUser?.profilePicture} />
                        <div className="mt-4">
                            <h5 className="text-lg font-semibold">{`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}</h5>
                            <p className="text-slate-400">{loggedInUser?.email}</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <Menu loggedInUser={loggedInUser.role} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSidebar;