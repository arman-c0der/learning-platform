import PersonalDetails from "../component/personal-details";
import ContactInfo from "../component/contact-info";
import ChangePassword from "../component/change-password";

import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/users";

async function Profile() {
	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

	return (
		<>
			<PersonalDetails userInfo={loggedInUser} />
			<div className="mt-[30px] rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)]">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<ContactInfo />
					<ChangePassword email={loggedInUser?.email} />
				</div>
				{/*end row*/}
			</div>
		</>
	);
}

export default Profile;