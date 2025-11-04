'use client';

import { useToast as useToastHook } from '@/hooks/use-toast';
import { Toast, ToastClose, ToastDescription, ToastProvider as ToastPrimitive, ToastTitle, ToastViewport } from '@/components/ui/toast';

export function ToastProvider() {
  const { toasts } = useToastHook();

  return (
    <ToastPrimitive>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastPrimitive>
  );
}
