## Accessibility

Accessibility was considered during component implementation in this assignment to ensure easy and simple keyboard and screen-reader usability. Many interactive elements such as buttons and inputs include ARIA labels (e.g., Card.jsx and ListColumn.jsx). Amd also modal dialogs, such as CardDetailModal.jsx, use role="dialog" and aria-modal="true" to clearly communicate context and simplify understandings too any assistive technologies.

Keyboard accessibility is also supported in this assignment through tab navigation and key handlers. The card detail modal automatically receives focus when opened (CardDetailModal.jsx, useEffect hook), and users can close it using the ESC key on their keyboards. Moreover, the inputs include descriptive labels.

Color contrast was also addressed here using Tailwind utility classes with sufficient and appealing contrast between text and background and buttons as well, making it easy to use and read for everyone. During manual inspection using browser accessibility tools, no critical contrast issues were observed.