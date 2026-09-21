import { forwardRef, memo, useEffect, useImperativeHandle, useState } from 'react';

type ToastType = 'success' | 'warning' | 'error';

type ToastOptions = {
  message: string;
  type?: ToastType;
  duration?: number;
};

export type ToastHandle = {
  show: (options: ToastOptions) => void;
  hide: () => void;
};

const typeStyles: Record<ToastType, { icon: string; text: string }> = {
  success: {
    icon: '✓',
    text: 'text-black',
  },
  warning: {
    icon: '!',
    text: 'text-black',
  },
  error: {
    icon: '✕',
    text: 'text-black',
  },
};

const ToastComponent = forwardRef<ToastHandle>(function ToastComponent(_, ref) {
  const [message, setMessage] = useState('');
  const [type, setType] = useState<ToastType>('success');
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      show: ({ message, type = 'success', duration = 5000 }) => {
        setMessage(message);
        setType(type);
        setIsVisible(true);

        window.setTimeout(() => {
          setIsVisible(false);
        }, duration);
      },
      hide: () => setIsVisible(false),
    }),
    []
  );

  useEffect(() => {
    if (!isVisible) return;

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [isVisible]);

  if (!isVisible) return null;

  const style = typeStyles[type];

  return (
    <div className="fixed bottom-5 right-5 z-[100] w-[min(92vw,360px)] rounded-md border border-black bg-white text-black shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
      <div className="flex items-start gap-3 px-4 py-3">
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black ${style.text}`}>
          <span className="text-sm font-bold">{style.icon}</span>
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.08em] text-black">
            {type === 'success' ? 'Success' : type === 'warning' ? 'Warning' : 'Error'}
          </p>
          <p className="mt-1 text-sm text-black">{message}</p>
        </div>

        <button
          type="button"
          onClick={() => setIsVisible(false)}
          aria-label="Close notification"
          className="ml-2 text-lg leading-none text-black transition hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  );
});

export default memo(ToastComponent);
