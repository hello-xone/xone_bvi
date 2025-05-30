import { Link } from "@remix-run/react";

type To = string | { pathname: string; search?: string; hash?: string } | URL | undefined | null;

/**
 * 省略字符
 * @param str
 * @returns
 */
export const truncateString = (str: string, pointLength = 4) => {
  if (!str) return str;
  const points = '.'.repeat(pointLength);
  return str.replace(/(^.{4})(.*)(.{4}$)/, `$1${points}$3`);
};

export const sleep = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};

/**
 * 节流函数
 * @param func
 * @param wait
 * @returns
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (timeout === null) {
      func(...args);
      timeout = setTimeout(() => {
        if (lastArgs !== null) {
          func(...lastArgs);
          lastArgs = null;
        }
        timeout = null;
      }, wait);
    } else {
      lastArgs = args;
    }
  };

  return throttled;
}

type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebouncedFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debouncedFn.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  return debouncedFn;
}

export const getLocalFileUrl = (file: File) => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result as string);
    };
    reader.onerror = () => {
      rej();
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Whether it is an external link
 * @param to
 * @returns
 */
export const isExternalLink = (to?: To) => {
  if (typeof to === 'string') {
    if (!to.startsWith('/')) {
      return true;
    }
  }
  return false;
};

export const getToProps: any = (to?: To) => {
  if (!to) return {};
  if (typeof to === 'string') {
    if (isExternalLink(to)) {
      return {
        as: 'a',
        href: to,
        target: '_blank',
        rel: 'noopener noreferrer'
      };
    }
  }
  return {
    as: Link,
    to
  };
};
