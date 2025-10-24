/**
 * Utility function to get user profile picture with fallback to default avatar
 */
export const getUserProfilePicture = (profilePicUrl: string | null | undefined): string => {
  if (profilePicUrl && profilePicUrl.trim() !== '') {
    return profilePicUrl;
  }
  return '/user-avatar.png';
};

/**
 * Utility function to check if a profile picture URL is valid
 */
export const isValidProfilePicture = (profilePicUrl: string | null | undefined): boolean => {
  return !!(profilePicUrl && profilePicUrl.trim() !== '' && profilePicUrl !== '/user-avatar.png');
};