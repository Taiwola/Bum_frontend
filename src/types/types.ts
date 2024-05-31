export enum RoleEnum  {
    "AGENCY_OWNER" = 'AGENCY_OWNER',
    "AGENCY_ADMIN" = 'AGENCY_ADMIN',
    "SUBACCOUNT_USER" = 'SUBACCOUNT_USER',
    "SUBACCOUNT_GUEST" = 'SUBACCOUNT_GUEST'
}

export type UserType = {
    id: string;
    name: string;
    avatarUrl?: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    role: RoleEnum;
    password: string;
    agencyId?: string | null;
    agency: AgencyType;
    permissions: PermissionsType[];
    tickets: Ticket[];
    notifications: Notification[];
  };

  
export type AgencyType = {
    id: string;
    connectAccountId: string;
    customerId: string;
    name: string;
    agencyLogo: string;
    companyEmail: string;
    companyPhone: string;
    whiteLabel: boolean;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    goal: number;
    users: UserType[];
    createdAt: Date;
    updatedAt: Date;
    subAccounts: SubAccountType[];
    sidebarOptions: AgencySidebarOption[];
    invitations: Invitation[];
    notifications: Notification[];
    subscription: Subscription;
    addOns: AddOns[];
  };

//   import {
//     RoleEnum,
//     ActionType,
//     Icon,
//     InvitationStatus,
//     TriggerTypes,
//     Plan,
//   } from '../../enum/data.enum';
  
  
  // Type for Permissions
  export type PermissionsType = {
    id: string;
    email: string;
    user: UserType;
    subAccountId: string;
    subAccount: SubAccountType;
    access: boolean;
  }
  
 
  // Type for SubAccount
  export type SubAccountType  = {
    id: string;
    connectAccountId: string;
    name: string;
    subAccountLogo: string;
    createdAt: Date;
    updatedAt: Date;
    companyEmail: string;
    companyPhone: string;
    goal: number;
    address: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    agencyId: string;
    agency: AgencyType;
    sidebarOptions: SubAccountSidebarOption[];
    permissions: Permissions[];
    funnels: Funnel[];
    media: Media[];
    contacts: Contact[];
    triggers: Trigger[];
    automations: Automation[];
    pipelines: Pipeline[];
    tags: Tag[];
    notifications: Notification[];
    tickets: Ticket[];
  }
  
  // Type for Tag
  export type Tag = {
    id: string;
    name: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
    subAccountId: string;
    subAccount: SubAccountType;
    tickets: Ticket[];
  }
  
  // Type for Pipeline
  export type Pipeline = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    lanes: Lane[];
    subAccount: SubAccountType;
    subAccountId: string;
  }
  
  // Type for Lane
  export type Lane = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    pipeline: Pipeline;
    pipelineId: string;
    tickets: Ticket[];
    order: number;
  }
  
  // Type for Ticket
  export type Ticket = {
    id: string;
    title: string;
    description: string;
    isClosed: boolean;
    createdAt: Date;
    updatedAt: Date;
    subAccountId: string;
    laneId: string;
    customerId: string;
    assignedUserId: string;
    subAccount: SubAccountType;
    assignedUser: UserType;
    lane: Lane;
    tags: Tag[];
  }

  export enum TriggerTypes {
    CONTACT_FORM = 'CONTACT_FORM',
  }
  
  // Type for Trigger
  export type Trigger = {
    id: string;
    type: TriggerTypes;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    subAccount: SubAccountType;
    subAccountId: string;
    automations: Automation[];
  }
  
  // Type for Automation
  export type Automation = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    subAccount: SubAccountType;
    subAccountId: string;
    trigger: Trigger;
    triggerId: string;
    instances: AutomationInstance[];
    actions: Action[];
  }
  
  // Type for AutomationInstance
  export type AutomationInstance = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    automation: Automation;
    automationId: string;
  }
  
  export enum ActionType {
    CREATE_CONTACT = 'CREATE_CONTACT',
  }

  // Type for Action
  export type Action = {
    id: string;
    type: ActionType;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    automation: Automation;
    automationId: string;
  }
  
  // Type for Contact
  export type Contact = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
    subAccount: SubAccountType;
    subAccountId: string;
    media: Media[];
  }
  
  // Type for Media
  export type Media = {
    id: string;
    title: string;
    description: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
    subAccount: SubAccountType;
    subAccountId: string;
    contact: Contact;
    contactId: string;
  }
  
  // Type for Funnel
  export type Funnel = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    pages: FunnelPage[];
    subAccount: SubAccountType;
    subAccountId: string;
  }
  
  // Type for FunnelPage
  export type FunnelPage = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    funnel: Funnel;
    funnelId: string;
  }
  
  export enum Icon {
    "settings" = "settings",
    "chart" = "chart",
    "calendar" = "calendar",
    "check" = "check",
    "chip" = "chip",
    "compass" = "compass",
    "database" = "database",
    "flag" = "flag",
    "home" = "home",
    "info" = "info",
    "link" = "link",
    "lock" = "lock",
    "messages" = "message",
    "notification" = "notification",
    "payment" = "payment",
    "power" = "power",
    "receipt" = "receipt",
    "shield" = "shield",
    "star" = "star",
    "tune" = "tune",
    "videorecorder" = "videorecorder",
    "wallet" = "wallet",
    "warning" = "warning",
    "headphone" = "headphone",
    "send" = "send",
    "pipelines" = "pipelines",
    "person" = "person",
    "category" = "category",
    "contact" = "contact", 
    "clipboardIcon" = "clipboardIcon" 
  }

  // Type for AgencySidebarOption
  export type AgencySidebarOption = {
    id: string;
    name: string;
    icon: Icon;
    link: string;
    createdAt: Date;
    updatedAt: Date;
    agency: AgencyType;
    agencyId: string;
  }
  
  // Type for SubAccountSidebarOption
  export type SubAccountSidebarOption = {
    id: string;
    name: string;
    icon: Icon;
    createdAt: Date;
    updatedAt: Date;
    subAccount: SubAccountType;
    subAccountId: string;
  }
  
  export enum InvitationStatus {
    ACCEPTED = 'ACCEPTED',
    REVOKED = 'REVOKED',
    PENDING = 'PENDING',
  }

  // Type for Invitation
  export type Invitation = {
    id: string;
    email: string;
    status: InvitationStatus;
    createdAt: Date;
    role: RoleEnum;
    updatedAt: Date;
    agency: AgencyType;
    agencyId: string;
  }
  
  // Type for Notification
  export type Notification = {
    id: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
    user: UserType;
    userId: string;
    agency: AgencyType;
    agencyId: string;
    subAccount: SubAccountType;
    subAccountId?: string;
  }

  export enum Plan {
    price_1OYxkqFj9oKEERu1NbKUxXxN = 'price_1OYxkqFj9oKEERu1NbKUxXxN',
    price_1OYxkqFj9oKEERu1KfJGWxgN = 'price_1OYxkqFj9oKEERu1KfJGWxgN',
  }
  
  // Type for Subscription
  export type Subscription = {
    id: string;
    subscriptionDate: Date;
    plan: Plan;
    createdAt: Date;
    updatedAt: Date;
    agency: AgencyType;
    agencyId: string;
  }
  
  // Type for AddOns
  export type AddOns =  {
    id: string;
    name: string;
    price: string;
    createdAt: Date;
    updatedAt: Date;
    agency: AgencyType;
    agencyId: string;
  }
  