"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";

import { updateUserInfo } from "@/app/actions/account";

import { toast } from "sonner";

const PersonalDetails = ({ userInfo }) => {
    const [infoState, setInfoState] = useState({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        designation: userInfo.designation,
        bio: userInfo.bio,
    });

    const handleChange = (event) => {
        const field = event.target.name;
        const value = event.target.value;

        setInfoState({
            ...infoState,
            [field]: value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        try {
            await updateUserInfo(userInfo?.email, infoState);
            toast.success("User details updated successfully.");
        } catch (error) {
            console.error(error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="rounded-2xl border border-purple-900/40 bg-[#0f0720] p-6 shadow-[0_8px_30px_-10px_rgba(168,85,247,0.15)]">
            <h5 className="mb-5 text-lg font-semibold text-white">
                Personal Detail
            </h5>
            <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            First Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            name="firstName"
                            value={infoState.firstName}
                            onChange={handleChange}
                            required
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Last Name <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={infoState?.lastName}
                            onChange={handleChange}
                            required
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Your Email <span className="text-red-400">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={infoState?.email}
                            disabled
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Occupation
                        </Label>
                        <Input
                            name="designation"
                            id="occupation"
                            value={infoState?.designation}
                            type="text"
                            onChange={handleChange}
                            placeholder="Occupation"
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                {/*end grid*/}
                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <Label className="mb-2 block text-purple-300/80">
                            Bio
                        </Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={infoState?.bio}
                            placeholder="Enter your Bio"
                            onChange={handleChange}
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                {/*end row*/}
                <Button
                    className="mt-6 cursor-pointer bg-purple-600 text-white hover:bg-purple-500"
                    asChild
                >
                    <input type="submit" name="send" value="Save Changes" />
                </Button>
            </form>
            {/*end form*/}
        </div>
    );
};

export default PersonalDetails;