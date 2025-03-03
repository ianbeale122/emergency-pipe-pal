
export const isClerkAvailable = () => {
  try {
    return typeof window !== 'undefined' && 'Clerk' in window;
  } catch (e) {
    return false;
  }
};
