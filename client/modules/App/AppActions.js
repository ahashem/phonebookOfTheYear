// Export Constants
export const LOADING = 'LOADING';
export const LOADING_COMPLETED = 'LOADING_COMPLETED';

// Export Actions
export function startLoading() {
  return {
    type: LOADING,
  };
}
export function loadComplete() {
  return {
    type: LOADING_COMPLETED,
  };
}
