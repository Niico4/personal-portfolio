import { HeroUIProvider } from '@heroui/system';
import { MotionConfig } from 'framer-motion';

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <HeroUIProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </HeroUIProvider>
  );
}
