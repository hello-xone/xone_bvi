import { useEffect, useRef, useState } from "react";

export const useReleaseScroll = () => {

	const timelineRef = useRef<HTMLDivElement>(null);
	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const scrollLeftRef = useRef(0);
	const velocityRef = useRef(0);
	const lastTimeRef = useRef(0);
	const lastPageXRef = useRef(0);
	const animationFrameRef = useRef<number>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	const restoreTimeoutRef = useRef<number>(null);

	useEffect(() => {
		const timeline = timelineRef.current;
		if (timeline) {
			timeline.addEventListener('wheel', handleWheel, { passive: false });
		}

		document.addEventListener('mouseup', handleMouseUp);
		document.addEventListener('mouseleave', handleMouseUp);

		return () => {
			if (timeline) {
				timeline.removeEventListener('wheel', handleWheel);
			}
			document.removeEventListener('mouseup', handleMouseUp);
			document.removeEventListener('mouseleave', handleMouseUp);
			if (animationFrameRef.current) {
				cancelAnimationFrame(animationFrameRef.current);
			}
			// if (restoreTimeoutRef.current) {
			//   window.clearTimeout(restoreTimeoutRef.current);
			// }
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleMouseDown = (e: React.MouseEvent) => {
		isDraggingRef.current = true;
		startXRef.current = e.pageX - (timelineRef.current?.offsetLeft || 0);
		scrollLeftRef.current = timelineRef.current?.scrollLeft || 0;
		lastTimeRef.current = Date.now();
		lastPageXRef.current = e.pageX;
		velocityRef.current = 0;

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}
	};


	const handlePointMouseEnter = () => {
		if (restoreTimeoutRef.current) {
			window.clearTimeout(restoreTimeoutRef.current);
			restoreTimeoutRef.current = undefined;
		}
		// setActiveIndex(index);
	};

	const handleMouseUp = () => {
		if (!isDraggingRef.current) return;

		isDraggingRef.current = false;

		const minVelocity = 0.2;
		if (Math.abs(velocityRef.current) > minVelocity) {
			const startTime = Date.now();
			const startVelocity =
				velocityRef.current * (Math.abs(velocityRef.current) < 1 ? 0.8 : 0.5);

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(1, elapsed / 300);
				const velocity = startVelocity * (1 - progress * progress);

				if (Math.abs(velocity) < 0.1) {
					cancelAnimationFrame(animationFrameRef.current!);
					return;
				}

				if (timelineRef.current) {
					const maxScroll =
						timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
					const currentScroll = timelineRef.current.scrollLeft;
					const nextScroll = currentScroll + velocity;

					if (nextScroll <= 0 || nextScroll >= maxScroll) {
						cancelAnimationFrame(animationFrameRef.current!);
						return;
					}

					timelineRef.current.scrollLeft = nextScroll;
				}

				animationFrameRef.current = requestAnimationFrame(animate);
			};

			animationFrameRef.current = requestAnimationFrame(animate);
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDraggingRef.current) return;

		e.preventDefault();

		const currentTime = Date.now();
		const timeElapsed = currentTime - lastTimeRef.current;
		const currentPageX = e.pageX;

		if (timeElapsed > 0) {
			const rawVelocity = (currentPageX - lastPageXRef.current) / timeElapsed;
			velocityRef.current = Math.max(-2, Math.min(2, rawVelocity)) * 16;
		}

		lastTimeRef.current = currentTime;
		lastPageXRef.current = currentPageX;

		const x = e.pageX - (timelineRef.current?.offsetLeft || 0);
		const walk = x - startXRef.current;

		if (timelineRef.current) {
			const maxScroll =
				timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
			const newScrollLeft = Math.max(
				0,
				Math.min(maxScroll, scrollLeftRef.current - walk)
			);
			timelineRef.current.scrollLeft = newScrollLeft;
		}
	};

	const handleWheel = (e: WheelEvent) => {
		e.preventDefault();

		if (timelineRef.current) {
			const delta = e.deltaY || e.deltaX;
			const maxScroll =
				timelineRef.current.scrollWidth - timelineRef.current.clientWidth;

			const startScroll = timelineRef.current.scrollLeft;
			const targetScroll = Math.max(
				0,
				Math.min(maxScroll, startScroll + delta)
			);
			const startTime = Date.now();

			const animate = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(1, elapsed / 300);

				const easing =
					progress < 0.5
						? 4 * progress * progress * progress
						: 1 - Math.pow(-2 * progress + 2, 3) / 2;

				timelineRef.current!.scrollLeft =
					startScroll + (targetScroll - startScroll) * easing;

				if (progress < 1) {
					requestAnimationFrame(animate);
				}
			};

			requestAnimationFrame(animate);
		}
	};

	const scrollToCenter = (index: number) => {
		if (!timelineRef.current) return;

		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
		}

		const container = timelineRef.current;
		const points = container.querySelectorAll('.point');
		if (!points[index]) return;

		const point = points[index] as HTMLElement;
		const pointRect = point.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		const targetScroll =
			container.scrollLeft +
			(pointRect.left -
				containerRect.left -
				containerRect.width / 2 +
				pointRect.width / 2);

		const startScroll = container.scrollLeft;
		const distance = targetScroll - startScroll;
		const startTime = Date.now();
		const duration = 500;

		const animate = () => {
			const elapsed = Date.now() - startTime;
			const progress = Math.min(1, elapsed / duration);

			const easing = 1 - Math.pow(1 - progress, 4);

			const currentScroll = startScroll + distance * easing;
			container.scrollLeft = currentScroll;

			if (progress < 1) {
				animationFrameRef.current = requestAnimationFrame(animate);
			}
		};

		animationFrameRef.current = requestAnimationFrame(animate);
	};

	const handlePointClick = (index: number, e: React.MouseEvent) => {
		e.stopPropagation();
		scrollToCenter(index);
	};

	return {
		activeIndex,
		setActiveIndex,
		timelineRef,
		isDraggingRef,
		handleMouseDown,
		handleMouseUp,
		handleMouseMove,
		handleWheel,
		handlePointClick,
		scrollToCenter,
		handlePointMouseEnter
	}
}