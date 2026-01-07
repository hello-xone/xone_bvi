import { useEffect, useRef, useState } from "react";

export const useReleaseScroll = (onReachEnd?: () => void) => {

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
	const hasReachedEndRef = useRef(false);

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
		
		// 清理之前的动画
		if (animationFrameRef.current) {
			cancelAnimationFrame(animationFrameRef.current);
			animationFrameRef.current = null;
		}
		
		// 如果有足够的速度，启动惯性滑动
		const initialVelocity = velocityRef.current;
		if (Math.abs(initialVelocity) > 0.8) {
			// 修正速度方向：鼠标向右拖拽（正值）应该向右滑动（正值）
			let currentVelocity = -initialVelocity;
			const friction = 0.94; // 摩擦系数，每帧速度衰减
			
			const animate = () => {
				if (!timelineRef.current) {
					velocityRef.current = 0;
					return;
				}
				
				// 应用摩擦力减速
				currentVelocity *= friction;
				
				// 速度太小时停止
				if (Math.abs(currentVelocity) < 0.05) {
					velocityRef.current = 0;
					animationFrameRef.current = null;
					return;
				}
				
				// 计算新的滚动位置
				const currentScrollLeft = timelineRef.current.scrollLeft;
				const maxScroll = timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
				const targetScrollLeft = currentScrollLeft + currentVelocity;
				
				// 严格边界检查，防止回弹
				let newScrollLeft = targetScrollLeft;
				if (newScrollLeft <= 0) {
					newScrollLeft = 0;
					currentVelocity = 0;
				} else if (newScrollLeft >= maxScroll) {
					newScrollLeft = maxScroll;
					currentVelocity = 0;
					handleReachEnd();
				} else {
					// 重置触底标志
					hasReachedEndRef.current = false;
				}
				
				// 应用滚动位置
				timelineRef.current.scrollLeft = newScrollLeft;
				
				// 如果速度被重置为0，停止动画
				if (currentVelocity === 0) {
					velocityRef.current = 0;
					animationFrameRef.current = null;
					return;
				}
				
				// 继续动画
				animationFrameRef.current = requestAnimationFrame(animate);
			};
			
			animationFrameRef.current = requestAnimationFrame(animate);
		} else {
			// 速度不够，直接重置
			velocityRef.current = 0;
		}
	};

	const handleReachEnd = () => {
		if (!hasReachedEndRef.current) {
			hasReachedEndRef.current = true;
			onReachEnd?.();
		}
	}

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
			const targetScrollLeft = scrollLeftRef.current - walk;

			// 严格边界控制，不允许超出边界
			const newScrollLeft = Math.max(0, Math.min(maxScroll, targetScrollLeft));
			timelineRef.current.scrollLeft = newScrollLeft;

			// 横向触底逻辑
			const isAtRightBoundary = newScrollLeft >= (maxScroll - 100);

			if (isAtRightBoundary) {
				// 触发触底回调
				handleReachEnd();
			} else {
				// 重置触底标志
				hasReachedEndRef.current = false;
			}
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

			// 检查是否触底
			const isAtRightBoundary = targetScroll >= (maxScroll - 100);
			if (isAtRightBoundary) {
				handleReachEnd();
				return;
			} else {
				// 重置触底标志
				hasReachedEndRef.current = false;
			}

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