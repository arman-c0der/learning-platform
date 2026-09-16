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

    return (
        <div className="md:px-3 lg:w-1/4">
            <div className="relative">
                <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)]">
                    <div className="profile-pic mb-5 text-center">
                        <div className="mx-auto w-fit rounded-full ring-2 ring-purple-800/50">
                            <ProfileImageUploader
                                initialImage={loggedInUser?.profilePicture}
                            />
                        </div>
                        <div className="mt-4">
                            <h5 className="text-lg font-semibold text-white">
                                {`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                            </h5>
                            <p className="text-sm text-purple-300/60">
                                {loggedInUser?.email}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-purple-900/40 pt-2">
                        <Menu loggedInUser={loggedInUser.role} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSidebar;