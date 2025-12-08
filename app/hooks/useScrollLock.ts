import { useCallback, useEffect, useRef, useState } from 'react';

export default function useScrollLock() {
	const originalStyleRef = useRef<string>('');
	const scrollYRef = useRef<number>(0);
	const [isLockScroll, setIsLockScroll] = useState(false);

	const lock = useCallback(() => {
		scrollYRef.current = window.scrollY;
		originalStyleRef.current = document.body.style.cssText;

		document.body.style.cssText = `
      position: fixed;
      top: -${scrollYRef.current}px;
      left: 0;
      right: 0;
      overflow: hidden;
    `;
		setIsLockScroll(true);
	}, []);

	const unlock = useCallback(() => {
		document.body.style.cssText = originalStyleRef.current;
		window.scrollTo(0, scrollYRef.current);
		setIsLockScroll(false);
	}, []);

	useEffect(() => {
		return () => {
			unlock();
		};
	}, [unlock]);

	return { lockScroll: lock, unLockScroll: unlock, isLockScroll };
}