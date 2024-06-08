// This components functionality is to provide functions for user settings
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import { MutationConfig } from "@/lib/react-query";

// ====================================
// ========== CHANGE AVATAR ===========
// ====================================

// ZOD avatar form schema
const changeAvatarSchema = z.object({
  userId: z.string().min(1, "Required"),
  file: z.instanceof(File),
});

export type ChangeAvatarInput = z.infer<typeof changeAvatarSchema>;

// POST function to server
export const changeUserAvatar = async ({
  data,
}: {
  data: ChangeAvatarInput;
}): Promise<void> => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("userId", data.userId);

  const response = await api.post("/users/changeUserAvatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Config for POST function above
type UseChangeUserAvatarOptions = {
  mutationConfig?: MutationConfig<typeof changeUserAvatar>;
};

// This hook integrates the changeUserAvatar function with react-query
// to handle the mutation (data modification) and manage the query cache.
export const useChangeUserAvatar = ({
  mutationConfig,
}: UseChangeUserAvatarOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Invalidate any queries related to the user to refresh the data
      queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: changeUserAvatar,
  });
};
