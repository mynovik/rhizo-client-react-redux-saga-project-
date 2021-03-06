import React from 'react';

const useIsMounted = (cb = () => {}) => {
    const [mounted, setMounted] = React.useState(false);

    React.useLayoutEffect(() => {
        if (!mounted) {
            setMounted(true);
            cb();
        }
    }, [cb, mounted]);

    return mounted;
};

export default useIsMounted;
