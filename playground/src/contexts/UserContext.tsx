import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  UserInterface, 
  PersonInterface, 
  LoginUserChurchInterface, 
  UserContextInterface,
  NameInterface,
  ContactInfoInterface
} from '@churchapps/helpers';

// Create default empty objects to match official interface expectations
const createDefaultUser = (): UserInterface => ({});

const createDefaultPerson = (): PersonInterface => ({
  name: {} as NameInterface,
  contactInfo: {} as ContactInfoInterface
});

const createDefaultUserChurch = (): LoginUserChurchInterface => ({
  person: createDefaultPerson(),
  church: { id: '', name: '' },
  apis: [],
  jwt: '',
  groups: []
});

// Create the context
const UserContext = createContext<UserContextInterface | null>(null);

// Provider component
export const UserContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInterface>(createDefaultUser());
  const [person, setPerson] = useState<PersonInterface>(createDefaultPerson());
  const [userChurch, setUserChurch] = useState<LoginUserChurchInterface>(createDefaultUserChurch());
  const [userChurches, setUserChurches] = useState<LoginUserChurchInterface[]>([]);

  const contextValue: UserContextInterface = {
    user,
    setUser,
    person,
    setPerson,
    userChurch,
    setUserChurch,
    userChurches,
    setUserChurches
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

// Utility function for logout since it's not part of the official interface
export const useUserContextLogout = () => {
  const context = useUserContext();
  
  return () => {
    context.setUser(createDefaultUser());
    context.setPerson(createDefaultPerson());
    context.setUserChurch(createDefaultUserChurch());
    context.setUserChurches([]);
  };
};