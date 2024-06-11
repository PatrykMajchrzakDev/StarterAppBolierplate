import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { useNotificationState } from "@/store/UI/NotificationStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// Component props
interface UploadFileProps {
  uploadMutationFn: (data: {
    data: { file: File; userId: string };
  }) => Promise<any>;
  userId: string;
  onSuccess?: (response: any) => void;
}

// Notification on success or error fn
const addNotif = () => {
  useNotificationState
    .getState()
    .setNotification("File uploaded successfully", "success", "outlined");
};
// The component takes 2-3 props
const UploadFile: React.FC<UploadFileProps> = ({
  uploadMutationFn,
  userId,
}) => {
  // Sets state to display currently choosen file name
  const [fileName, setFileName] = useState<string>("");
  // Methods from react-hook-form
  const { handleSubmit, reset } = useForm();
  // Saves state of currently choosen file
  const [file, setFile] = useState<File | null>(null);

  // Run this when submiting form
  const onSubmit = async () => {
    // Set object because mutation expects an object
    if (file) {
      const uploadData = {
        userId,
        file,
      };

      try {
        await uploadMutationFn({ data: uploadData });

        // This prop sets response from server. Its optional
        // Add notification on success
        addNotif();
        // reset form
        reset();
        // reset file name
        setFileName("");
        // reset file
        setFile(null);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        size="small"
      >
        Upload File
        <VisuallyHiddenInput
          type="file"
          onChange={(e) => {
            const selectedFile = e.target.files?.[0] || null;
            if (selectedFile) {
              setFileName(selectedFile.name);
              setFile(selectedFile);
            }
          }}
        />
      </Button>
      {/* Displays file name and shows submit if user chose file*/}
      {fileName && (
        <div>
          <span style={{ padding: "0 2rem 0 0" }}>
            Selected file: {fileName}
          </span>
          <Button size="small" variant="contained" type="submit">
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};

export default UploadFile;
