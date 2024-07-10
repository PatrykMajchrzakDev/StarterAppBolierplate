// This components functionality is to show description about updating user avatar and to show upload button

// ========= MODULES ==========
import { useUser } from "@/lib/auth";
import { useChangeUserAvatar } from "@/features/users/api/user-settings";

// ======= COMPONENTS =========
import UploadFile from "@/components/UI/Buttons/UploadFile";

export const ChangeAvatar = () => {
  const { data } = useUser();
  const userId = data?.user.id;
  const changeAvatarMutation = useChangeUserAvatar();

  return (
    <div>
      <h3>Change Avatar</h3>
      {userId && (
        <UploadFile
          uploadMutationFn={changeAvatarMutation.mutateAsync}
          userId={userId}
          isPending={changeAvatarMutation.isPending}
        />
      )}
    </div>
  );
};
