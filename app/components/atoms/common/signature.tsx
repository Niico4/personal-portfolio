const Signature = ({ className }: { className?: string }) => {
  return (
    <span className={`text-xs font-normal italic sm:text-sm ${className}`}>
      — nicoo 🐐
    </span>
  );
};

export default Signature;
