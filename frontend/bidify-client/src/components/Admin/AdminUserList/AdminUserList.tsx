import type { User } from "../../../types/user";
import AdminCard from "../AdminAuctionCard/AdminCard";
import "../AdimnAuctionList/AdminList.css";

type Props = {
  users: User[];
  onDeactivate: (id: number) => void;
};

const AdminUserList = ({ users, onDeactivate }: Props) => {
  if (users.length === 0) {
    return <p>No users found</p>;
  }

  return (
    <div className="admin-list">
      {users.map((user) => (
        <AdminCard
          key={user.userId}
          title={user.username}
          subtitle={`Role: ${user.role}`}
          status={user.isActive ? "Active" : "Inactive"}
          isActive={user.isActive}
          onAction={() => onDeactivate(user.userId)}
          actionLabel="Deactivate"
        />
      ))}
    </div>
  );
};

export default AdminUserList;
