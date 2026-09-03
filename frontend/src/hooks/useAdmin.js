export function useAdmin() {
  const refreshOverview = () => {
    // No-op for now — will trigger a dashboard metrics refetch once backend exists
  };

  return { refreshOverview };
}