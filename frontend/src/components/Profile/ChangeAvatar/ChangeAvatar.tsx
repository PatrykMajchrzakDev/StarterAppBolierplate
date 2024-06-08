import { useUser } from "@/lib/auth";
import UploadFile from "@/components/UI/Buttons/UploadFile";
import { useChangeUserAvatar } from "@/features/users/api/user-settings";

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
        />
      )}
    </div>
  );
};
