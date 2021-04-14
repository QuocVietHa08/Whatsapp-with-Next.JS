import styled from 'styled-components';

import { Avatar, Button, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';

import * as EmailValidator from 'email-validator';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';
import getRecipientEmail from '../utils/getRecipientEmail';

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection('chats')
    .where('users', 'array-contains', user.email);

  const [chatsSnapShot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt('Please enter the email that you want to chat with');
    if (!input) return null;
    console.log(chatsSnapShot?.docs.length);
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
      //we will add the chat into chat section if the email is valid and It doesn't exist yet
    ) {
      db.collection('chats').add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapShot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => auth.signOut()} src={user.photoURL} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <MoreVertIcon />
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder='Search in the chats' />
      </Search>
      <SideBarButton onClick={createChat}>Start a new chat</SideBarButton>
      {chatsSnapShot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  min-height: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;
const SideBarButton = styled(Button)`
  width: 100%;
`;
const SearchButton = styled(Button)``;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
