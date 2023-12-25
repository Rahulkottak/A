import { Stack } from "react-bootstrap"
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient"
import avatar from '../../assets/avatar.svg'
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import { useFetchLatestMsg } from "../../hooks/useFetchLatestMsg";
import moment from 'moment';

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);

  const { latestMsg } = useFetchLatestMsg(chat);

  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotications = unreadNotifications?.filter(
    n => n.senderId == recipientUser?._id
  )

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);
  const truncate = (text) => {
    let shortText = text.substring(0, 20) ;

    if(text.length > 20) {
      shortText = shortText + '...';
    }
    return shortText;
  }


  return (
    <Stack 
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2
      justify-content-between"
      role="button"
      onClick={() => {
        if(thisUserNotications?.length !== 0) {
          markThisUserNotificationsAsRead(thisUserNotications, notifications)
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} height="35px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">{
            latestMsg?.text && (
              <span>{truncate(latestMsg?.text)}</span>
            )
          }</div>
        </div>
      </div>
      <div className="d-flex flex-column algin-items-end">
        <div className="date">{moment(latestMsg?.createdAt).calendar()}</div>
        <div className={ thisUserNotications?.length > 0 ? "this-user-notifications": ""}>
          {thisUserNotications?.length > 0 ? thisUserNotications?.length : "" }
        </div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  )
}

export default UserChat