import { Card, CardBody } from '@heroui/card';

const ContactCard = ({
  label,
  icon,
  action,
}: {
  label: string;
  icon: React.ReactNode;
  action: React.ReactNode;
}) => (
  <Card className="h-16 border border-ink-900 bg-ink-900/40 shadow-none hover:bg-ink-800/40">
    <CardBody className="flex flex-row items-center justify-between overflow-hidden px-4 py-0">
      <div className="flex items-center gap-3">
        {icon}
        <p className="text-lg text-ink-200">{label}</p>
      </div>
      {action}
    </CardBody>
  </Card>
);

export default ContactCard;
