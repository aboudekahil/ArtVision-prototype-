export type LocalStorageUser = {
  token: string;
  user: {
    email: string;
    profile_image: string;
    name?: string;
    display_name?: string;
    bio?: string;
  };
};
