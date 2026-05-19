import { useEffect, useRef } from 'react';

export function MetamaskLogo({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const node = containerRef.current;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let viewer: any;

    import('@metamask/logo').then((mod) => {
      if (!node) return;
      // @ts-expect-error - no types for @metamask/logo
      const ModelViewer = mod.default ?? mod;
      viewer = ModelViewer({
        pxNotRatio: true,
        width: 224,
        height: 224,
        followMouse: true,
        slowDrift: false,
      });
      node.innerHTML = '';
      node.appendChild(viewer.container);
    });

    return () => {
      viewer?.stopAnimation();
    };
  }, []);

  return (
    <div className={className}>
      <div 
        ref={containerRef} 
        className="flex items-center justify-center w-full h-full transition-transform duration-300"
        style={{ filter: 'hue-rotate(200deg) brightness(1.2) saturate(1.2)' }}
      />
    </div>
  );
}
