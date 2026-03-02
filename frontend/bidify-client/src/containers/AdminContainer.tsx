import { useContext, useEffect, useState } from "react";
import { AuctionsContext } from "../context/AuctionContext";
import { AuthContext } from "../context/AuthContext";

import { deactivateAuction } from "../services/auctionService";
import { deactivateUser, getAllUsers } from "../services/userService";

import AdminAuctionList from "../components/Admin/AdimnAuctionList/AdminAuctionList";
import AdminUserList from "../components/Admin/AdminUserList/AdminUserList";
import CheckboxContainer from "../components/common/checkBox/CheckBoxContainer/CheckboxContainer";

import type { User } from "../types/user";

const AdminContainer = () => {
  const { auctions, fetchAuctions } = useContext(AuctionsContext);
  const { user } = useContext(AuthContext);

  const [view, setView] = useState<"users" | "auctions">("auctions");
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user?.role === "Admin") {
      fetchUsers();
    }
  }, [user]);

  if (user?.role !== "Admin") {
    return <p>Access denied</p>;
  }

  const handleDeactivateAuction = async (id: number) => {
    try {
      await deactivateAuction(id);
      fetchAuctions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeactivateUser = async (id: number) => {
    try {
      await deactivateUser(id);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <CheckboxContainer
          options={[
            {
              label: "Users",
              checked: view === "users",
              onChange: () => setView("users"),
            },
            {
              label: "Auctions",
              checked: view === "auctions",
              onChange: () => setView("auctions"),
            },
          ]}
        />

        {view === "auctions" && (
          <AdminAuctionList
            auctions={auctions}
            onDeactivate={handleDeactivateAuction}
          />
        )}

        {view === "users" && (
          <AdminUserList users={users} onDeactivate={handleDeactivateUser} />
        )}
      </section>
    </div>
  );
};

export default AdminContainer;
