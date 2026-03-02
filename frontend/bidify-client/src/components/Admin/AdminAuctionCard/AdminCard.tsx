import "./AdminCard.css";

type Props = {
  title: string;
  subtitle?: string;
  status: string;
  isActive: boolean;
  extraInfo?: React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
};

const AdminCard = ({
  title,
  subtitle,
  status,
  isActive,
  extraInfo,
  onAction,
  actionLabel,
}: Props) => {
  return (
    <div className={`admin-card ${!isActive ? "inactive" : ""}`}>
      <h3>{title}</h3>

      {subtitle && <p>{subtitle}</p>}

      {extraInfo}

      <p>Status: {status}</p>

      {isActive && onAction && (
        <button onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
};

export default AdminCard;
