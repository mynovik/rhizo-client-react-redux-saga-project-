type IntersectionObserverEntryVisibilityRatio = number;
type ThrottleInterval = number;

interface IntersectionObserverOptions extends IntersectionObserverInit {
    ratio: IntersectionObserverEntryVisibilityRatio;
    throttle: ThrottleInterval;
}

export const observerOptions: IntersectionObserverOptions = {
    ratio: 0.9,
    rootMargin: '5px',
    threshold: [0.05, 0.5, 0.75, 0.95],
    throttle: 100,
};
