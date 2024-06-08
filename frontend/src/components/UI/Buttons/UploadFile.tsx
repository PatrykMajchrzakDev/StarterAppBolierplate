// This components functionality is to handle file uploads to external storage

// ========= MODULES ==========
import { useState } from "react";
import { useForm } from "react-hook-form";

// ======= COMPONENTS =========
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

type UploadButtonProps = {
  uploadMutationFn: (data: {
    data: { file: File; userId: string };
  }) => Promise<void>;
  userId: string;
};

const addNotif = () => {
  useNotificationState
    .getState()
    .setNotification("Changed avatar", "success", "outlined");
};

const UploadButton = ({ uploadMutationFn, userId }: UploadButtonProps) => {
  const [fileName, setFileName] = useState<string>("");
  const { handleSubmit, reset } = useForm();
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async () => {
    if (file) {
      const uploadData = {
        userId,
        file,
      };

      try {
        await uploadMutationFn({ data: uploadData });
        addNotif();
        reset();
        setFileName("");
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

export default UploadButton;
