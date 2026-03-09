const onlineUsers = new Set();

const addOnlineUser = (userId) => {
  onlineUsers.add(Number(userId));
};

const removeOnlineUser = (userId) => {
  onlineUsers.delete(Number(userId));
};

const isUserOnline = (userId) => onlineUsers.has(Number(userId));

const getOnlineUsers = () => Array.from(onlineUsers);

export { addOnlineUser, removeOnlineUser, isUserOnline, getOnlineUsers };

