"use client";

import Image from "next/image";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { uploadProfilePicture } from "@/app/actions/users"; 
import { useRouter } from "next/navigation";

const ProfileImageUploader = ({ initialImage }) => {
    const router = useRouter();
    const [preview, setPreview] = useState(initialImage);
    const [uploading, setUploading] = useState(false);

    const loadFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const updatedUser = await uploadProfilePicture(formData); 
            if (updatedUser?.profilePicture) {
                setPreview(updatedUser.profilePicture);
                  window.location.reload();
            }
         
        } catch (err) {
            ("Upload failed:", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <input
                id="pro-img"
                name="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={loadFile}
            />
            <div className="relative size-28 mx-auto">
                {preview ? (
                    <Image
                        src={preview}
                        className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-700"
                        id="profile-banner"
                        alt="Profile picture"
                        fill
                    />
                ) : (
                    <div className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-700 size-28 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <UserIcon className="size-10 text-gray-400" />
                    </div>
                )}
                <label
                    className="absolute inset-0 cursor-pointer"
                    htmlFor="pro-img"
                />
            </div>
            {uploading && <p className="text-xs text-slate-400 mt-1">Uploading...</p>}
        </div>
    );
};

export default ProfileImageUploader;