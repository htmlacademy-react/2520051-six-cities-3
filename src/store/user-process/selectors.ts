import {State} from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../constant';
import { User } from '../../types/user';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
export const getUser = (state: State): User | null => state[NameSpace.User].user;
export const getAuthError = (state: State): string | null => state[NameSpace.User].error;
