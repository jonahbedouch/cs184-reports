import React from 'react';
// UPDATE this path to your copy of the hook!
// Source here: https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion
import { usePrefersReducedMotion } from '@hooks/use-prefers-reduced-motion.hook';

function useRawBoop(time: number): [boolean, () => void] {
    const [isBooped, setIsBooped] = React.useState(false);
    React.useEffect(() => {
        if (!isBooped) {
            return;
        }
        const timeoutId = window.setTimeout(() => {
            setIsBooped(false);
        }, time);
        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [isBooped]);
    const trigger = React.useCallback(() => {
        setIsBooped(true);
    }, []);
    return [isBooped, trigger];
}
export default useRawBoop;