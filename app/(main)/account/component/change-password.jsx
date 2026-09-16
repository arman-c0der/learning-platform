"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { toast } from "sonner";

import { changePassword } from "@/app/actions/account";

const ChangePassword = ({ email }) => {
    const [passwordState, setPasswordState] = useState({
        oldPassword: "",
        newPassword: "",
    });

    function handleChange(event) {
        const key = event.target.name;
        const value = event.target.value;

        setPasswordState({ ...passwordState, [key]: value });
    }

    async function doPasswordChange(event) {
        event.preventDefault();

        try {
            await changePassword(
                email,
                passwordState?.oldPassword,
                passwordState?.newPassword
            );

            toast.success(`Password changed successfully.`);
        } catch (err) {
            console.error(err);
            toast.error(`Error: ${err.message}`);
        }
    }

    return (
        <div>
            <h5 className="mb-4 text-lg font-semibold text-white">
                Change Password
            </h5>
            <form onSubmit={doPasswordChange}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Old password
                        </Label>
                        <Input
                            type="password"
                            placeholder="Old password"
                            id="oldPassword"
                            name="oldPassword"
                            onChange={handleChange}
                            required
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            New password
                        </Label>
                        <Input
                            type="password"
                            placeholder="New password"
                            id="newPassword"
                            name="newPassword"
                            onChange={handleChange}
                            required
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block text-purple-300/80">
                            Re-type New password
                        </Label>
                        <Input
                            type="password"
                            placeholder="Re-type New password"
                            required
                            className="border-purple-900/50 bg-[#0a0512] text-purple-100 placeholder:text-purple-300/40 focus-visible:ring-purple-600 focus-visible:ring-offset-0"
                        />
                    </div>
                </div>
                {/*end grid*/}
                <Button
                    className="mt-5 cursor-pointer bg-purple-600 text-white hover:bg-purple-500"
                    type="submit"
                >
                    Save password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;