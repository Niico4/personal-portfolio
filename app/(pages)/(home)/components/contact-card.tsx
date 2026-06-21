import { Card, CardBody } from '@heroui/card';

export const ContactCard = ({
  label,
  icon,
  action,
}: {
  label: string;
  icon: React.ReactNode;
  action: React.ReactNode;
}) => (
  <Card className="h-14 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40 sm:h-16 lg:h-14">
    <CardBody className="flex flex-row items-center justify-between overflow-hidden px-3 py-0 sm:px-4 lg:px-3">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-base text-ink-200">{label}</p>
      </div>
      {action}
    </CardBody>
  </Card>
);
