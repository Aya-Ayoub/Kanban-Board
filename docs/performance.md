## Performance

Performance optimization was initially planned as part of this assignments requirements when submitting, including virtualization for large card lists (500) and profiling using React Profiler. However, this requirement is now a bonus task and is no longer a must to implement

Howeverr, basic performance practices were applied in this assignment. The Card component is wrapped with React.memo (last line) to prevent any unnecessary re-renders when parent components update. The callback functions passed to cards are memoized using useCallback, and specifically in useBoardState.js.

Additionally, code splitting was also implemented by lazy-loading the CardDetailModal component using React.lazy and Suspense, this lead to better reducing the initial bundle size and improving the load time.

If performance requirements were a must in this assignment's requiremnts then the current architecture would then support further optimizations such as list virtualization using react-window and more other different granular reducer actions.
