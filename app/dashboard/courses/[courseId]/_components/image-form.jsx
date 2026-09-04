"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { UploadDropzone } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

export const ImageForm = ({ initialData, courseId }) => {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Your course data uses "thumbnail"
  const imageUrl = initialData?.imageUrl || "";


  const toggleEdit = () => {
    setIsEditing((current) => !current);
  };

  useEffect(() => {
    if (!file || !file.length || !courseId) return;

    const uploadFile = async () => {
      try {
        setIsUploading(true);

        const uploadedFile = file[0];

        if (!uploadedFile) {
          toast.error("No file selected");
          return;
        }

        const formData = new FormData();

        formData.append("files", uploadedFile);
        formData.append(
          "destination",
          "./public/assets/images/courses"
        );
        formData.append("courseId", courseId);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Image upload failed");
        }

        ("Upload result:", result);

        toast.success("Course image uploaded successfully");

        setFile(null);
        setIsEditing(false);

        router.refresh();
      } catch (error) {
        ("Image upload error:", error);

        toast.error(
          error?.message || "Something went wrong while uploading image"
        );
      } finally {
        setIsUploading(false);
      }
    };

    uploadFile();
  }, [file, courseId, router]);

  return (
    <div className="mt-6 rounded-md border bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center justify-between font-medium">
        <span>Course Image</span>

        <Button
          type="button"
          variant="ghost"
          onClick={toggleEdit}
          disabled={isUploading}
        >
          {isEditing ? (
            "Cancel"
          ) : !imageUrl ? (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an image
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit image
            </>
          )}
        </Button>
      </div>

      {/* Preview */}
      {!isEditing && (
        <>
          {!imageUrl ? (
            <div className="mt-2 flex h-60 items-center justify-center rounded-md bg-slate-200">
              <ImageIcon className="h-10 w-10 text-blue-500" />
            </div>
          ) : (
            <div className="relative mt-2 aspect-video overflow-hidden rounded-md">
              <Image
                src={imageUrl}
                alt="Course image"
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          )}
        </>
      )}

      {/* Upload */}
      {isEditing && (
        <div className="mt-4">
          <UploadDropzone
            onUpload={(files) => {
              ("Selected files:", files);
              setFile(files);
            }}
          />

          {isUploading && (
            <p className="mt-3 text-sm text-muted-foreground">
              Uploading image...
            </p>
          )}

          <div className="mt-4 text-xs text-muted-foreground">
            16:9 aspect ratio recommended.
          </div>
        </div>
      )}
    </div>
  );
};