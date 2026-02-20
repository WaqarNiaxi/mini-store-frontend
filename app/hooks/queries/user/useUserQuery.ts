"use client";

import { useQuery } from "@tanstack/react-query";
import {
  UserProfileType,
  fetchUserList,
  fetchUserProfile,
  userType,
} from "./../../../services/user.service";

export function useUserProfileQuery() {
  return useQuery<UserProfileType>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    staleTime: 1000 * 60 * 5,
  });
}


export function useUserListQuery(){
    return useQuery<userType[]>({
        queryKey:["userList"],
        queryFn:fetchUserList,
        staleTime:1000*60*5,
    })
}