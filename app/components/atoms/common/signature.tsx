import { happyMonkey } from '@/fonts';

const Signature = ({ className }: { className?: string }) => {
  return (
    <span
      className={`text-xs sm:text-sm ${happyMonkey.className} ${className}`}
    >
      — nicoo 🐐
    </span>
  );
};

export default Signature;
