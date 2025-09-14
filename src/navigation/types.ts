export type AuthStackParamList = {
    Swiper: undefined;
    Login: undefined;
    Signup: undefined;
    Forgot: undefined;
    ChangePassword: {
        emailId: string
    };
};

export type AppStackParamList = {
    Home: undefined;
    Tabs: undefined;
    Drawer: undefined;
    EditProfile: undefined;
    SelectLeaveDate: undefined;
  ApplyLeave: {
    startDate: string;
    endDate: string;
    daysCount: number;
  };
}

export type BottomTabParamList = {
    Home: undefined;
    Profile: undefined;
    Settings: undefined;
    Logs: undefined;
  };

export type DrawerParamList = {
    MainTabs: undefined;
};